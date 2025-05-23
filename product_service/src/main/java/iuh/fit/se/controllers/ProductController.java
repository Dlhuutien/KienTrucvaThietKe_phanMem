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

// @CrossOrigin(origins = { "http://localhost:3000", "http://localhost:5173" })
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
			boolean canDelete = productService.canDelete(id);

			if (!canDelete) {
				response.put("status", HttpStatus.BAD_REQUEST.value());
				response.put("message", "Không thể xóa sản phẩm này vì nó đang được sử dụng");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
			}

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
			response.put("message", "Error occurred while deleting the product: " + e.getMessage());
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
			@RequestParam(required = false) BigDecimal salePrice) {
		productService.updatePrice(id, purchasePrice, salePrice);
		return ResponseEntity.ok(Map.of("message", "Cập nhật giá thành công"));
	}

	@GetMapping("/products/{id}/can-delete")
	public ResponseEntity<Map<String, Object>> canDeleteProduct(@PathVariable int id) {
		Map<String, Object> response = new LinkedHashMap<>();
		try {
			boolean canDelete = productService.canDelete(id);
			response.put("status", HttpStatus.OK.value());
			response.put("canDelete", canDelete);
			if (!canDelete) {
				response.put("message", "Không thể xóa sản phẩm này vì nó đang được sử dụng");
			}
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (Exception e) {
			response.put("status", HttpStatus.NOT_FOUND.value());
			response.put("message", e.getMessage());
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}
	
	// http://localhost:8000/api/products/page?pageNo=1&size=2&sortBy=name&sortDirection=asc
    @GetMapping("/products/page")
    public ResponseEntity<Map<String, Object>> getList(
            @RequestParam(defaultValue = "0", required = false) int pageNo,
            @RequestParam(defaultValue = "20", required = false) int size,
            @RequestParam(defaultValue = "id", required = false) String sortBy,
            @RequestParam(defaultValue = "ASC", required = false) String sortDirection) {
        Page<ProductDTO> products = productService.findAllWithPaging(pageNo, size, sortBy, sortDirection);
        Map<String, Object> response = new LinkedHashMap<String, Object>();
        response.put("data", products);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    @GetMapping("products/category")
    public ResponseEntity<Map<String,Object>> searchProductByCategory(
            @RequestParam(value = "name", required = true) String category) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", HttpStatus.OK.value());
        response.put("data", productService.findByCategory(category));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/products/phone/filter")
    public ResponseEntity<Map<String, Object>> searchPhoneWithFilter(
            @RequestParam(required = false) String ramList,
            @RequestParam(required = false) String romList,
            @RequestParam(required = false) String chipList,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice) {
        List<String> ramListParam = (ramList != null) ? Arrays.asList(ramList.split(",")) : null;
        List<String> romListParam = (romList != null) ? Arrays.asList(romList.split(",")) : null;
        List<String> chipListParam = (chipList != null) ? Arrays.asList(chipList.split(",")) : null;
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", HttpStatus.OK.value());
        response.put("data", productService.findPhoneDTOWithFilter2(ramListParam, romListParam, chipListParam, minPrice, maxPrice));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/products/earphone/filter")
    public ResponseEntity<Map<String, Object>> searchEarPhoneWithFilter(
            @RequestParam(required = false) String connectTypeList,
            @RequestParam(required = false) String brandList,
            @RequestParam(required = false) String other,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice
    ) {
        List<String> connectTypeParam = (connectTypeList != null) ? Arrays.asList(connectTypeList.split(",")) : null;
        List<String> brandListParam = (brandList != null) ? Arrays.asList(brandList.split(",")) : null;
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", HttpStatus.OK.value());
        response.put("data", productService.findEarphoneDTOWithFilter2(connectTypeParam,
                brandListParam, other, minPrice, maxPrice));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/products/cable/filter")
    public ResponseEntity<Map<String, Object>> searchCableWithFilter(
            @RequestParam(required = false) String cableTypeList,
            @RequestParam(required = false) String lengthList,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice
    ) {
        List<String> cableTypeListParam = (cableTypeList != null) ? Arrays.asList(cableTypeList.split(",")) : null;
        List<String> lengthListParam = (lengthList != null) ? Arrays.asList(lengthList.split(",")) : null;
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", HttpStatus.OK.value());
        response.put("data", productService.findChargingCableDTOWithFilter2(cableTypeListParam,
                lengthListParam, minPrice, maxPrice));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/products/powerBank/filter")
    public ResponseEntity<Map<String, Object>> searchPowerBankWithFilter(
            @RequestParam(required = false) String inputList,
            @RequestParam(required = false) String outputList,
            @RequestParam(required = false) String capacityList,
            @RequestParam(required = false) String batteryGreaterList,
            @RequestParam(required = false) String batteryLessList,
            @RequestParam(required = false) Integer capacity,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice
    ) {
        int number = (capacity != null) ? capacity : 0;
        List<String> inputListParam = (inputList != null) ? Arrays.asList(inputList.split(",")) : null;
        List<String> outputListParam = (outputList != null) ? Arrays.asList(outputList.split(",")) : null;
        List<Integer> capacityListParam = (capacityList != null) ?
                Arrays.stream(capacityList.split(","))
                        .map(Integer::parseInt)
                        .toList() : null;
        List<Integer> batteryGreaterListParam = (batteryGreaterList != null) ?
                Arrays.stream(batteryGreaterList.split(","))
                        .map(Integer::parseInt)
                        .toList() : null;
        List<Integer> batteryLessListParam = (batteryLessList != null) ?
                Arrays.stream(batteryLessList.split(","))
                        .map(Integer::parseInt)
                        .toList() : null;
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", HttpStatus.OK.value());
        response.put("data", productService.findPowerBankDTOWithFilter2(inputListParam,
                outputListParam, capacityListParam, number, batteryGreaterListParam,
                batteryLessListParam, minPrice, maxPrice));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
 



}
