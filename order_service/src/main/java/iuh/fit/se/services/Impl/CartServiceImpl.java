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
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
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

	// @Transactional
	// @Override
	// public CartDTO save(CartDTO cartDTO) {
	// //Kiểm tra id User
	// ResponseEntity<Map<String, Object>> userResponse = restTemplate.exchange(
	// apiGatewayUrl + "/userProfiles/" + cartDTO.getUserId(),
	// HttpMethod.GET,
	// null,
	// new ParameterizedTypeReference<Map<String, Object>>() {}
	// );
	//
	// if (!userResponse.getStatusCode().is2xxSuccessful() || userResponse.getBody()
	// == null) {
	// throw new RuntimeException("Không thể kết nối tới user service hoặc dữ liệu
	// rỗng");
	// }
	//
	// Map<String, Object> userMap = userResponse.getBody();
	// Map<String, Object> userData = (Map<String, Object>) userMap.get("data");
	// if (userData == null) {
	// throw new RuntimeException("Không tìm thấy người dùng với ID: " +
	// cartDTO.getUserId());
	// }
	//
	// //Kiểm tra user đã có cart trạng thái PENDING
	// Cart cart = cartRepository.findByUserIdAndState(cartDTO.getUserId(),
	// State.PENDING);
	//
	// if (cart == null) {
	// // Nếu chưa, tạo cart
	// cart = convertToCartEntity(cartDTO);
	// cart.setCartDetails(new ArrayList<>());
	// }
	//
	// //Xử lý cartDetails
	// List<CartDetail> newCartDetails = new ArrayList<>();
	// for (CartDetailDTO detailDTO : cartDTO.getCartDetails()) {
	// // Kiểm tra sản phẩm
	// ResponseEntity<Map<String, Object>> productResponse = restTemplate.exchange(
	// apiGatewayUrl + "/api/products/" + detailDTO.getProductId(),
	// HttpMethod.GET,
	// null,
	// new ParameterizedTypeReference<Map<String, Object>>() {}
	// );
	//
	// if (!productResponse.getStatusCode().is2xxSuccessful() ||
	// productResponse.getBody() == null) {
	// throw new RuntimeException("Không thể kết nối tới product service hoặc dữ
	// liệu rỗng");
	// }
	//
	// Map<String, Object> productMap = productResponse.getBody();
	// Map<String, Object> productData = (Map<String, Object>)
	// productMap.get("data");
	// if (productData == null) {
	// throw new RuntimeException("Không tìm thấy sản phẩm với ID: " +
	// detailDTO.getProductId());
	// }
	//
	// CartDetail detail = convertToCartDetailEntity(detailDTO);
	// detail.setCart(cart);
	//
	// if (productData.get("salePrice") != null) {
	// BigDecimal salePrice = new
	// BigDecimal(productData.get("salePrice").toString());
	// detail.setPriceAtTransaction(salePrice);
	// }
	//
	// newCartDetails.add(detail);
	// }
	//
	// //Gộp cartDetails mới vào cart hiện tại
	// if (cart.getCartDetails() == null) {
	// cart.setCartDetails(new ArrayList<>());
	// }
	// cart.getCartDetails().addAll(newCartDetails);
	//
	// //Tính lại tổng tiền
	// BigDecimal total = cart.getCartDetails().stream()
	// .map(d ->
	// d.getPriceAtTransaction().multiply(BigDecimal.valueOf(d.getQuantity())))
	// .reduce(BigDecimal.ZERO, BigDecimal::add);
	// cart.setTotalDue(total);
	//
	// //Lưu cart (có cascade sẽ lưu cả cartDetails mới)
	// Cart savedCart = cartRepository.save(cart);
	//
	// //Trả về DTO
	// CartDTO resultDTO = convertToCartDTO(savedCart);
	// List<CartDetailDTO> detailDTOs = savedCart.getCartDetails().stream()
	// .map(this::convertToCartDetailDTO)
	// .collect(Collectors.toList());
	// resultDTO.setCartDetails(detailDTOs);
	//
	// return resultDTO;
	// }
	@Transactional
	@Override
	@CacheEvict(value = "cartByUserId", key = "#cartDTO.userId")
	public CartDTO save(CartDTO cartDTO) {
		// Kiểm tra user tồn tại qua API Gateway
		ResponseEntity<Map<String, Object>> userResponse = restTemplate.exchange(
				apiGatewayUrl + "/userProfiles/" + cartDTO.getUserId(),
				HttpMethod.GET,
				null,
				new ParameterizedTypeReference<Map<String, Object>>() {
				});

		if (!userResponse.getStatusCode().is2xxSuccessful() || userResponse.getBody() == null) {
			throw new RuntimeException("Không thể kết nối tới user service hoặc dữ liệu rỗng");
		}

		Map<String, Object> userMap = userResponse.getBody();
		Map<String, Object> userData = (Map<String, Object>) userMap.get("data");
		if (userData == null) {
			throw new RuntimeException("Không tìm thấy người dùng với ID: " + cartDTO.getUserId());
		}

		// Kiểm tra xem user đã có Cart trạng thái PENDING chưa
		Cart cart = cartRepository.findByUserIdAndState(cartDTO.getUserId(), State.PENDING);

		if (cart == null) {
			cart = convertToCartEntity(cartDTO);
			cart.setCartDetails(new ArrayList<>());
		}

		if (cart.getCartDetails() == null) {
			cart.setCartDetails(new ArrayList<>());
		}

		// Xử lý từng CartDetail gửi lên
		for (CartDetailDTO detailDTO : cartDTO.getCartDetails()) {
			int productId = detailDTO.getProductId();
			int quantityToAdd = detailDTO.getQuantity();

			// Gọi API product-service để lấy thông tin sản phẩm
			ResponseEntity<Map<String, Object>> productResponse = restTemplate.exchange(
					apiGatewayUrl + "/api/products/" + productId,
					HttpMethod.GET,
					null,
					new ParameterizedTypeReference<Map<String, Object>>() {
					});

			if (!productResponse.getStatusCode().is2xxSuccessful() || productResponse.getBody() == null) {
				throw new RuntimeException("Không thể kết nối tới product service hoặc dữ liệu rỗng");
			}

			Map<String, Object> productMap = productResponse.getBody();
			Map<String, Object> productData = (Map<String, Object>) productMap.get("data");

			if (productData == null) {
				throw new RuntimeException("Không tìm thấy sản phẩm với ID: " + productId);
			}

			// Kiểm tra xem sản phẩm đã có trong Cart chưa
			CartDetail existingDetail = cart.getCartDetails().stream()
					.filter(cd -> cd.getProductId() == productId)
					.findFirst()
					.orElse(null);

			if (existingDetail != null) {
				// Nếu đã tồn tại thì cộng thêm số lượng
				existingDetail.setQuantity(existingDetail.getQuantity() + quantityToAdd);
			} else {
				// Nếu chưa có, tạo mới CartDetail
				CartDetail newDetail = CartDetail.builder()
						.productId(productId)
						.quantity(quantityToAdd)
						.priceAtTransaction(new BigDecimal(productData.get("salePrice").toString()))
						.cart(cart)
						.build();

				cart.getCartDetails().add(newDetail);
			}
		}

		// Tính lại tổng tiền
		BigDecimal total = cart.getCartDetails().stream()
				.map(d -> d.getPriceAtTransaction().multiply(BigDecimal.valueOf(d.getQuantity())))
				.reduce(BigDecimal.ZERO, BigDecimal::add);

		cart.setTotalDue(total);

		// Lưu Cart (cascade sẽ tự lưu CartDetail)
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

	@Override
	@Transactional
	public boolean updateCartDetailQuantity(int cartDetailId, int newQuantity) {
		Optional<CartDetail> optionalDetail = cartDetailRepository.findById(cartDetailId);

		if (optionalDetail.isEmpty())
			return false;

		CartDetail detail = optionalDetail.get();
		Cart cart = detail.getCart();

		if (newQuantity <= 0) {
			// Nếu quantity <= 0 thì xóa cart detail
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

	@Transactional(readOnly = true)
	@Override
	public CartDTO findById(int cartId) {
		Optional<Cart> cartOptional = cartRepository.findById(cartId);
		if (cartOptional.isEmpty()) {
			throw new RuntimeException("Không tìm thấy giỏ hàng với ID: " + cartId);
		}
		return convertToCartDTO(cartOptional.get());
	}

	@Transactional
	@Override
	public void updateCartState(int cartId, String newState) {
		Optional<Cart> cartOptional = cartRepository.findById(cartId);
		if (cartOptional.isEmpty()) {
			throw new RuntimeException("Không tìm thấy giỏ hàng với ID: " + cartId);
		}

		Cart cart = cartOptional.get();
		try {
			cart.setState(State.valueOf(newState));
		} catch (IllegalArgumentException e) {
			throw new RuntimeException("Trạng thái không hợp lệ: " + newState);
		}

		cartRepository.save(cart);
	}

	@Cacheable(value = "cartByUserId", key = "#userId")
	@Override
	@Transactional(readOnly = true)
	public CartDTO findPendingCartByUserId(int userId) {
		Cart cart = cartRepository.findByUserIdAndState(userId, State.PENDING);
		if (cart == null) {
			throw new RuntimeException("Không tìm thấy giỏ hàng PENDING cho userId: " + userId);
		}
		return convertToCartDTO(cart);
	}

}
