package iuh.fit.se.controllers;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import iuh.fit.se.models.dtos.CartDTO;
import iuh.fit.se.services.CartService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/cart")
public class CartController {

	@Autowired
	CartService cartService;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getProducts(@RequestParam(required = false) String searchTerm) {
		Map<String, Object> response = new LinkedHashMap<>();
		response.put("status", HttpStatus.OK.value());
		List<CartDTO> cartDTOs = cartService.findAll();
		response.put("data", cartDTOs);
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@GetMapping("/{cartId}")
	public ResponseEntity<Map<String, Object>> getCartById(@PathVariable int cartId) {
		Map<String, Object> response = new LinkedHashMap<>();
		try {
			CartDTO cartDTO = cartService.findById(cartId);
			response.put("status", HttpStatus.OK.value());
			response.put("data", cartDTO);
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (RuntimeException e) {
			response.put("status", HttpStatus.NOT_FOUND.value());
			response.put("message", e.getMessage());
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<Map<String, Object>> getCartByUserId(@PathVariable int userId) {
		Map<String, Object> response = new LinkedHashMap<>();
		try {
			CartDTO cartDTO = cartService.findPendingCartByUserId(userId);
			response.put("status", HttpStatus.OK.value());
			response.put("data", cartDTO);
			return ResponseEntity.ok(response);
		} catch (RuntimeException e) {
			response.put("status", HttpStatus.NOT_FOUND.value());
			response.put("message", e.getMessage());
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	@DeleteMapping("/cart-detail/{id}")
	public ResponseEntity<Map<String, Object>> deleteCartDetail(@PathVariable int id) {
		Map<String, Object> response = new LinkedHashMap<>();
		boolean deleted = cartService.deleteCartDetailById(id);

		if (deleted) {
			response.put("status", HttpStatus.OK.value());
			response.put("message", "CartDetail deleted successfully.");
			return ResponseEntity.ok(response);
		} else {
			response.put("status", HttpStatus.NOT_FOUND.value());
			response.put("message", "CartDetail not found.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	@PostMapping
	public ResponseEntity<Map<String, Object>> saveCart(@Valid @RequestBody CartDTO cartDTO,
			BindingResult bindingResult) {

		System.out.println("CartDTO nhận được: " + cartDTO);
		Map<String, Object> response = new LinkedHashMap<>();

		if (bindingResult.hasErrors()) {
			Map<String, Object> errors = new LinkedHashMap<>();
			bindingResult.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
			response.put("status", HttpStatus.BAD_REQUEST.value());
			response.put("errors", errors);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		} else {
			CartDTO savedCart = cartService.save(cartDTO);
			response.put("status", HttpStatus.CREATED.value());
			response.put("data", savedCart);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		}
	}
	
	@PostMapping("/cart-detail/{id}/update-quantity")
	public ResponseEntity<Map<String, Object>> updateCartDetailQuantity(
	        @PathVariable int id,
	        @RequestParam int quantity) {

	    Map<String, Object> response = new LinkedHashMap<>();
	    boolean updated = cartService.updateCartDetailQuantity(id, quantity);

	    if (updated) {
	        response.put("status", HttpStatus.OK.value());
	        response.put("message", "Cập nhật số lượng thành công.");
	        return ResponseEntity.ok(response);
	    } else {
	        response.put("status", HttpStatus.NOT_FOUND.value());
	        response.put("message", "Không tìm thấy CartDetail.");
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	    }
	}
	@PutMapping("/{cartId}/update-state")
	public ResponseEntity<Map<String, Object>> updateCartState(@PathVariable int cartId,
			@RequestBody Map<String, String> request) {
		Map<String, Object> response = new LinkedHashMap<>();
		try {
			String newState = request.get("state");
			if (newState == null) {
				throw new RuntimeException("Trạng thái không được cung cấp");
			}
			cartService.updateCartState(cartId, newState);
			response.put("status", HttpStatus.OK.value());
			response.put("message", "Cập nhật trạng thái giỏ hàng thành công");
			return ResponseEntity.ok(response);
		} catch (RuntimeException e) {
			response.put("status", HttpStatus.BAD_REQUEST.value());
			response.put("message", e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}
}
