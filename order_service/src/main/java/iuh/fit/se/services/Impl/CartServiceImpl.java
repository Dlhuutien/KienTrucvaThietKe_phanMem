package iuh.fit.se.services.Impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import iuh.fit.se.models.dtos.CartDTO;
import iuh.fit.se.models.dtos.CartDetailDTO;
import iuh.fit.se.models.entities.Cart;
import iuh.fit.se.models.entities.CartDetail;
import iuh.fit.se.models.enums.State;
import iuh.fit.se.models.repositories.CartDetailRepository;
import iuh.fit.se.models.repositories.CartRepository;
import iuh.fit.se.services.CartService;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	CartRepository cartRepository;

	@Autowired
	CartDetailRepository cartDetailRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private RestTemplate restTemplate;

	@Value("${api_gateway.url}")
	private String apiGatewayUrl;

	private Cart convertToCartEntity(CartDTO cartDTO) {
		return modelMapper.map(cartDTO, Cart.class);
	}

	private CartDetail convertToCartDetailEntity(CartDetailDTO cartDetailDTO) {
		return modelMapper.map(cartDetailDTO, CartDetail.class);
	}

	private CartDTO convertToCartDTO(Cart cart) {
		return modelMapper.map(cart, CartDTO.class);
	}

	private CartDetailDTO convertToCartDetailDTO(CartDetail cartDetail) {
		return modelMapper.map(cartDetail, CartDetailDTO.class);
	}

	@Transactional(readOnly = true)
	@Override
	public List<CartDTO> findAll() {
		return cartRepository.findAll().stream().map(this::convertToCartDTO).collect(Collectors.toList());
	}
	
	@Transactional
	@Override
	public CartDTO save(CartDTO cartDTO) {
	    //Kiểm tra id User
	    ResponseEntity<Map<String, Object>> userResponse = restTemplate.exchange(
	            apiGatewayUrl + "/userProfiles/" + cartDTO.getUserId(),
	            HttpMethod.GET,
	            null,
	            new ParameterizedTypeReference<Map<String, Object>>() {}
	    );

	    if (!userResponse.getStatusCode().is2xxSuccessful() || userResponse.getBody() == null) {
	        throw new RuntimeException("Không thể kết nối tới user service hoặc dữ liệu rỗng");
	    }

	    Map<String, Object> userMap = userResponse.getBody();
	    Map<String, Object> userData = (Map<String, Object>) userMap.get("data");
	    if (userData == null) {
	        throw new RuntimeException("Không tìm thấy người dùng với ID: " + cartDTO.getUserId());
	    }

	    //Kiểm tra user đã có cart trạng thái PENDING
	    Cart cart = cartRepository.findByUserIdAndState(cartDTO.getUserId(), State.PENDING);

	    if (cart == null) {
	        // Nếu chưa, tạo cart
	        cart = convertToCartEntity(cartDTO);
	        cart.setCartDetails(new ArrayList<>());
	    }

	    //Xử lý cartDetails
	    List<CartDetail> newCartDetails = new ArrayList<>();
	    for (CartDetailDTO detailDTO : cartDTO.getCartDetails()) {
	        // Kiểm tra sản phẩm
	        ResponseEntity<Map<String, Object>> productResponse = restTemplate.exchange(
	                apiGatewayUrl + "/api/products/" + detailDTO.getProductId(),
	                HttpMethod.GET,
	                null,
	                new ParameterizedTypeReference<Map<String, Object>>() {}
	        );

	        if (!productResponse.getStatusCode().is2xxSuccessful() || productResponse.getBody() == null) {
	            throw new RuntimeException("Không thể kết nối tới product service hoặc dữ liệu rỗng");
	        }

	        Map<String, Object> productMap = productResponse.getBody();
	        Map<String, Object> productData = (Map<String, Object>) productMap.get("data");
	        if (productData == null) {
	            throw new RuntimeException("Không tìm thấy sản phẩm với ID: " + detailDTO.getProductId());
	        }

	        CartDetail detail = convertToCartDetailEntity(detailDTO);
	        detail.setCart(cart);

	        if (productData.get("salePrice") != null) {
	            BigDecimal salePrice = new BigDecimal(productData.get("salePrice").toString());
	            detail.setPriceAtTransaction(salePrice);
	        }

	        newCartDetails.add(detail);
	    }

	    //Gộp cartDetails mới vào cart hiện tại
	    if (cart.getCartDetails() == null) {
	        cart.setCartDetails(new ArrayList<>());
	    }
	    cart.getCartDetails().addAll(newCartDetails);

	    //Tính lại tổng tiền
	    BigDecimal total = cart.getCartDetails().stream()
	            .map(d -> d.getPriceAtTransaction().multiply(BigDecimal.valueOf(d.getQuantity())))
	            .reduce(BigDecimal.ZERO, BigDecimal::add);
	    cart.setTotalDue(total);

	    //Lưu cart (có cascade sẽ lưu cả cartDetails mới)
	    Cart savedCart = cartRepository.save(cart);

	    //Trả về DTO
	    CartDTO resultDTO = convertToCartDTO(savedCart);
	    List<CartDetailDTO> detailDTOs = savedCart.getCartDetails().stream()
	            .map(this::convertToCartDetailDTO)
	            .collect(Collectors.toList());
	    resultDTO.setCartDetails(detailDTOs);

	    return resultDTO;
	}

//	@Override
//	@Transactional
//	public boolean deleteCartDetailById(int id) {
//		if (cartDetailRepository.existsById(id)) {
//			cartDetailRepository.deleteCartDetailByIdDirect(id);
//			return true;
//		}
//		return false;
//	}
	@Override
	@Transactional
	public boolean deleteCartDetailById(int id) {
	    Optional<CartDetail> optionalDetail = cartDetailRepository.findById(id);
	    if (optionalDetail.isPresent()) {
	        CartDetail cartDetail = optionalDetail.get();
	        Cart cart = cartDetail.getCart();

	        // Xoá khỏi cart.getCartDetails() trước
	        cart.getCartDetails().remove(cartDetail);

	        // Xoá khỏi DB
	        cartDetailRepository.delete(cartDetail);

	        // Tính lại tổng tiền
	        BigDecimal newTotal = cart.getCartDetails().stream()
	                .map(cd -> cd.getPriceAtTransaction().multiply(BigDecimal.valueOf(cd.getQuantity())))
	                .reduce(BigDecimal.ZERO, BigDecimal::add);
	        cart.setTotalDue(newTotal);

	        // Cập nhật cart
	        cartRepository.save(cart);

	        return true;
	    }
	    return false;
	}

//	@Override
//	@Transactional
//	public boolean updateCartDetailQuantity(int cartDetailId, int newQuantity) {
//	    Optional<CartDetail> optionalDetail = cartDetailRepository.findById(cartDetailId);
//
//	    if (optionalDetail.isEmpty()) return false;
//
//	    CartDetail existingDetail = optionalDetail.get();
//	    Cart cart = existingDetail.getCart();
//
//	    // Xóa cartDetail cũ
//	    cart.getCartDetails().remove(existingDetail);
//	    cartDetailRepository.delete(existingDetail);
//
//	    // Nếu quantity mới > 0, thêm mới lại cartDetail
//	    if (newQuantity > 0) {
//	        CartDetail newDetail = CartDetail.builder()
//	                .productId(existingDetail.getProductId())
//	                .priceAtTransaction(existingDetail.getPriceAtTransaction())
//	                .quantity(newQuantity)
//	                .cart(cart)
//	                .build();
//
//	        cart.getCartDetails().add(newDetail); 
//	        // thêm lại vào cart
//	    }
//
//	    // Cập nhật lại totalDue
//	    BigDecimal newTotal = cart.getCartDetails().stream()
//	            .map(d -> d.getPriceAtTransaction().multiply(BigDecimal.valueOf(d.getQuantity())))
//	            .reduce(BigDecimal.ZERO, BigDecimal::add);
//
//	    cart.setTotalDue(newTotal);
//
//	    // Lưu cart
//	    cartRepository.save(cart);
//
//	    return true;
//	}
	@Override
	@Transactional
	public boolean updateCartDetailQuantity(int cartDetailId, int newQuantity) {
	    Optional<CartDetail> optionalDetail = cartDetailRepository.findById(cartDetailId);

	    if (optionalDetail.isEmpty()) return false;

	    CartDetail detail = optionalDetail.get();
	    Cart cart = detail.getCart();

	    if (newQuantity <= 0) {
	        //Nếu quantity <= 0 thì xóa cart detail
	        cart.getCartDetails().remove(detail);
	        cartDetailRepository.delete(detail);
	    } else {
	        // Nếu quantity > 0 thì chỉ cập nhật số lượng
	        detail.setQuantity(newQuantity);
	    }

	    // Tính lại tổng tiền
	    BigDecimal newTotal = cart.getCartDetails().stream()
	            .map(d -> d.getPriceAtTransaction().multiply(BigDecimal.valueOf(d.getQuantity())))
	            .reduce(BigDecimal.ZERO, BigDecimal::add);

	    cart.setTotalDue(newTotal);

	    // Lưu cart
	    cartRepository.save(cart);

	    return true;
	}




}
