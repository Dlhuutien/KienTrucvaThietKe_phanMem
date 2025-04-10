package iuh.fit.se.services.Impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
	
//	@Transactional
//	@Override
//	public CartDTO save(CartDTO cartDTO) {
//	    // Kiểm tra sự tồn tại của User
//	    ResponseEntity<Map<String, Object>> userResponse = restTemplate.exchange(
//	            apiGatewayUrl + "/userProfiles/" + cartDTO.getUserId(),
//	            HttpMethod.GET,
//	            null,
//	            new ParameterizedTypeReference<Map<String, Object>>() {}
//	    );
//
//	    if (!userResponse.getStatusCode().is2xxSuccessful() || userResponse.getBody() == null) {
//	        throw new RuntimeException("Không thể kết nối tới user service hoặc dữ liệu rỗng");
//	    }
//
//	    Map<String, Object> userMap = userResponse.getBody();
//	    Map<String, Object> userData = (Map<String, Object>) userMap.get("data");
//	    if (userData == null) {
//	        throw new RuntimeException("Không tìm thấy người dùng với ID: " + cartDTO.getUserId());
//	    }
//
//	    // Kiểm tra xem user đã có cart ở trạng thái PENDING chưa
//	    Cart existingCart = cartRepository.findByUserIdAndState(cartDTO.getUserId(), State.PENDING);
//	    if (existingCart != null) {
//	        throw new RuntimeException("Người dùng đã có cart ở trạng thái PENDING.");
//	    }
//
//	    // Tạo cart mới
//	    Cart cart = convertToCartEntity(cartDTO);
//
//	    // Xử lý cartDetails
//	    List<CartDetail> cartDetails = new ArrayList<>();
//	    for (CartDetailDTO detailDTO : cartDTO.getCartDetails()) {
//	        // Kiểm tra sản phẩm
//	        ResponseEntity<Map<String, Object>> productResponse = restTemplate.exchange(
//	                apiGatewayUrl + "/api/products/" + detailDTO.getProductId(),
//	                HttpMethod.GET,
//	                null,
//	                new ParameterizedTypeReference<Map<String, Object>>() {}
//	        );
//
//	        if (!productResponse.getStatusCode().is2xxSuccessful() || productResponse.getBody() == null) {
//	            throw new RuntimeException("Không thể kết nối tới product service hoặc dữ liệu rỗng");
//	        }
//
//	        Map<String, Object> productMap = productResponse.getBody();
//	        Map<String, Object> productData = (Map<String, Object>) productMap.get("data");
//	        if (productData == null) {
//	            throw new RuntimeException("Không tìm thấy sản phẩm với ID: " + detailDTO.getProductId());
//	        }
//
//	        // Tạo CartDetail entity
//	        CartDetail detail = convertToCartDetailEntity(detailDTO);
//	        detail.setCart(cart);
//
//	        if (productData.get("salePrice") != null) {
//	            BigDecimal salePrice = new BigDecimal(productData.get("salePrice").toString());
//	            detail.setPriceAtTransaction(salePrice);
//	        }
//
//	        cartDetails.add(detail);
//	    }
//
//	    cart.setCartDetails(cartDetails);
//
//	    // Tính tổng tiền
//	    BigDecimal total = cartDetails.stream()
//	            .map(d -> d.getPriceAtTransaction().multiply(BigDecimal.valueOf(d.getQuantity())))
//	            .reduce(BigDecimal.ZERO, BigDecimal::add);
//	    cart.setTotalDue(total);
//
//	    // Lưu cart
//	    Cart savedCart = cartRepository.save(cart);
//
//	    // Trả về DTO
//	    CartDTO resultDTO = convertToCartDTO(savedCart);
//	    List<CartDetailDTO> detailDTOs = savedCart.getCartDetails().stream()
//	            .map(this::convertToCartDetailDTO)
//	            .collect(Collectors.toList());
//	    resultDTO.setCartDetails(detailDTOs);
//
//	    return resultDTO;
//	}
	
//	@Transactional(rollbackFor = Exception.class)
//	@Override
//	public CartDTO save(CartDTO cartDTO) {
//	    // Kiểm tra sự tồn tại của User
//	    ResponseEntity<Map<String, Object>> userResponse = restTemplate.exchange(
//	            apiGatewayUrl + "/userProfiles/" + cartDTO.getUserId(),
//	            HttpMethod.GET,
//	            null,
//	            new ParameterizedTypeReference<Map<String, Object>>() {}
//	    );
//
//	    if (!userResponse.getStatusCode().is2xxSuccessful() || userResponse.getBody() == null) {
//	        throw new RuntimeException("Không thể kết nối tới user service hoặc dữ liệu rỗng");
//	    }
//
//	    Map<String, Object> userMap = userResponse.getBody();
//	    Map<String, Object> userData = (Map<String, Object>) userMap.get("data");
//	    if (userData == null) {
//	        throw new RuntimeException("Không tìm thấy người dùng với ID: " + cartDTO.getUserId());
//	    }
//
//	    Cart cart = cartRepository.findByUserIdAndState(cartDTO.getUserId(), State.PENDING);
//
////	    boolean isNewCart = false;
////	    if (cart == null) {
////	        // Chưa có thì tạo mới
////	        cart = convertToCartEntity(cartDTO);
////	        isNewCart = true;
////	    } else {
////	        // Đã có cart PENDING → xóa cartDetails cũ
////	        cart.getCartDetails().clear(); // xóa danh sách cũ
////	    }
//	    if (cart == null) {
//	        cart = convertToCartEntity(cartDTO);
//	        cart.setState(State.PENDING); // set nếu cần
//	        cart = cartRepository.save(cart); // Save cart trước khi thêm cartDetails
//	    }
//	    System.out.println("Đã lưu Cart: " + cart);
//
////	    // Xử lý cartDetails
//	    List<CartDetail> cartDetails = new ArrayList<>();
//	    for (CartDetailDTO detailDTO : cartDTO.getCartDetails()) {
//	        // Kiểm tra sản phẩm
//	        ResponseEntity<Map<String, Object>> productResponse = restTemplate.exchange(
//	                apiGatewayUrl + "/api/products/" + detailDTO.getProductId(),
//	                HttpMethod.GET,
//	                null,
//	                new ParameterizedTypeReference<Map<String, Object>>() {}
//	        );
//
//	        if (!productResponse.getStatusCode().is2xxSuccessful() || productResponse.getBody() == null) {
//	            throw new RuntimeException("Không thể kết nối tới product service hoặc dữ liệu rỗng");
//	        }
//
//	        Map<String, Object> productMap = productResponse.getBody();
//	        Map<String, Object> productData = (Map<String, Object>) productMap.get("data");
//	        if (productData == null) {
//	            throw new RuntimeException("Không tìm thấy sản phẩm với ID: " + detailDTO.getProductId());
//	        }
//
//	        // Tạo CartDetail entity
//	        CartDetail detail = convertToCartDetailEntity(detailDTO);
//	        detail.setCart(cart);
//	        
//
//	        if (productData.get("salePrice") != null) {
//	            BigDecimal salePrice = new BigDecimal(productData.get("salePrice").toString());
//	            detail.setPriceAtTransaction(salePrice);
//	        }
//
//	        cartDetails.add(detail);
//	    }
//
//	    cart.setCartDetails(cartDetails);
//
//	    // Tính tổng tiền
//	    BigDecimal total = cartDetails.stream()
//	            .map(d -> d.getPriceAtTransaction().multiply(BigDecimal.valueOf(d.getQuantity())))
//	            .reduce(BigDecimal.ZERO, BigDecimal::add);
//	    cart.setTotalDue(total);
//
//	    // Lưu cart
//	    Cart savedCart = cartRepository.save(cart);
//	    
//	    // Trả về DTO
//	    CartDTO resultDTO = convertToCartDTO(savedCart);
//	    List<CartDetailDTO> detailDTOs = savedCart.getCartDetails().stream()
//	            .map(this::convertToCartDetailDTO)
//	            .collect(Collectors.toList());
//	    resultDTO.setCartDetails(detailDTOs);
//
//	    return resultDTO;
//	}
	@Transactional(rollbackFor = Exception.class)
	@Override
	public CartDTO save(CartDTO cartDTO) {
	    // Kiểm tra sự tồn tại của User
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

	    // Tìm cart theo userId và state PENDING
	    Cart cart = cartRepository.findByUserIdAndState(cartDTO.getUserId(), State.PENDING);
	    if (cart == null) {
	        cart = convertToCartEntity(cartDTO);
	        cart.setState(State.PENDING); // nếu cần
	    } else {
	        // Nếu đã có cart PENDING → clear cartDetails cũ
	        cart.getCartDetails().clear();
	    }

	    // Chuẩn bị danh sách cartDetails
	    List<CartDetail> cartDetails = new ArrayList<>();
	    for (CartDetailDTO detailDTO : cartDTO.getCartDetails()) {
	        // Kiểm tra sản phẩm từ product service
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

	        cartDetails.add(detail);
	    }

	    cart.setCartDetails(cartDetails); // gán cartDetails sau khi đã tạo đầy đủ và gán cart
	    // Tính tổng tiền
	    BigDecimal total = cartDetails.stream()
	            .map(d -> d.getPriceAtTransaction().multiply(BigDecimal.valueOf(d.getQuantity())))
	            .reduce(BigDecimal.ZERO, BigDecimal::add);
	    cart.setTotalDue(total);

	    // ✅ Chỉ save cart một lần duy nhất sau khi gán đầy đủ cartDetails
	    Cart savedCart = cartRepository.save(cart);

	    // Trả về DTO
	    CartDTO resultDTO = convertToCartDTO(savedCart);
	    List<CartDetailDTO> detailDTOs = savedCart.getCartDetails().stream()
	            .map(this::convertToCartDetailDTO)
	            .collect(Collectors.toList());
	    resultDTO.setCartDetails(detailDTOs);

	    return resultDTO;
	}




	@Override
	@Transactional
	public boolean deleteCartDetailById(int id) {
		if (cartDetailRepository.existsById(id)) {
			cartDetailRepository.deleteCartDetailByIdDirect(id);
			return true;
		}
		return false;
	}

}
