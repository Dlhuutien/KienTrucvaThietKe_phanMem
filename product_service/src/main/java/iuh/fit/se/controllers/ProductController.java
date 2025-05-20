package iuh.fit.se.controllers;

import iuh.fit.se.exceptions.ItemNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import iuh.fit.se.models.dtos.ProductDTO;
import iuh.fit.se.services.ProductService;
import jakarta.validation.Valid;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RepositoryRestController
@RestController
public class ProductController {
	@Autowired
	private ProductService productService;

	// http://localhost:5000/api/products
	@GetMapping("/products")
	public ResponseEntity<Map<String, Object>> getProducts(@RequestParam(required = false) String searchTerm) {
		Map<String, Object> response = new LinkedHashMap<String, Object>();
		response.put("status", HttpStatus.OK.value());
		if (searchTerm == null || searchTerm.isEmpty()) {
			response.put("data", productService.findAll());
		} else {
			response.put("data", productService.search(searchTerm));
		}
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@GetMapping("/search")
	public ResponseEntity<Map<String, Object>> searchProduct(
			@RequestParam(value = "searchTerm", required = true) String searchTerm) {
		Map<String, Object> response = new LinkedHashMap<String, Object>();
		response.put("status", HttpStatus.OK.value());
		response.put("data", productService.search(searchTerm));
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@PostMapping("/products")
	public ResponseEntity<Map<String, Object>> addProduct(@Valid @RequestBody ProductDTO productDTO,
			BindingResult bindingResult) {

		Map<String, Object> response = new LinkedHashMap<>();
		System.out.println("ProductDTO nhận được: " + productDTO);

		if (bindingResult.hasErrors()) {
			Map<String, Object> errors = new LinkedHashMap<>();
			bindingResult.getFieldErrors().forEach(error -> {
				errors.put(error.getField(), error.getDefaultMessage());
			});
			System.out.println("Binding errors: " + errors);
			response.put("status", HttpStatus.BAD_REQUEST.value());
			response.put("errors", errors);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		} else {
			response.put("status", HttpStatus.CREATED.value());
			response.put("data", productService.saveProductDTO(productDTO));
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		}
	}

	@GetMapping("/products/{id}")
	public ResponseEntity<Map<String, Object>> getProductById(@PathVariable int id) {
		Map<String, Object> response = new LinkedHashMap<>();
		try {
			ProductDTO productDTO = productService.findProductDTOById(id);
			response.put("status", HttpStatus.OK.value());
			response.put("data", productDTO);
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (ItemNotFoundException e) {
			response.put("status", HttpStatus.NOT_FOUND.value());
			response.put("message", e.getMessage());
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// update
	@PutMapping("/products/{id}")
	public ResponseEntity<Map<String, Object>> updateProduct(@PathVariable int id,
			@Valid @RequestBody ProductDTO productDTO, BindingResult bindingResult) {
		Map<String, Object> response = new LinkedHashMap<>();
		if (bindingResult.hasErrors()) {
			Map<String, Object> errors = new LinkedHashMap<>();
			bindingResult.getFieldErrors().forEach(result -> errors.put(result.getField(), result.getDefaultMessage()));
			response.put("status", HttpStatus.BAD_REQUEST.value());
			response.put("errors", errors);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
		response.put("status", HttpStatus.OK.value());
		response.put("data", productService.updateProductDTO(id, productDTO));
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@DeleteMapping("/products/{id}")
	public ResponseEntity<Map<String, Object>> deleteProduct(@PathVariable int id) {
		Map<String, Object> response = new LinkedHashMap<>();

		try {
			boolean isDeleted = productService.delete(id);
			if (isDeleted) {
				response.put("status", HttpStatus.OK.value());
				response.put("message", "Product deleted successfully");
				return ResponseEntity.status(HttpStatus.OK).body(response);
			} else {
				response.put("status", HttpStatus.NOT_FOUND.value());
				response.put("message", "Product not found");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
			}
		} catch (Exception e) {
			response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
			response.put("message", "Error occurred while deleting the product");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@GetMapping("/products/search/findByName")
	public ResponseEntity<List<ProductDTO>> findProductByName(@RequestParam String name) {
		List<ProductDTO> products = productService.findProductsByName(name);
		if (products.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(products);
	}

	@GetMapping("/products/names")
	public ResponseEntity<List<String>> getAllProductNames() {
		List<String> productNames = productService.getAllProductNames();
		return ResponseEntity.ok(productNames);
	}
	
	@PutMapping("/api/products/{id}/price")
	public ResponseEntity<?> updateProductPrice(
		@PathVariable int id,
		@RequestParam(required = false) BigDecimal purchasePrice,
		@RequestParam(required = false) BigDecimal salePrice
	) {
		productService.updatePrice(id, purchasePrice, salePrice);
		return ResponseEntity.ok(Map.of("message", "Cập nhật giá thành công"));
	}

}
