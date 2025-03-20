package iuh.fit.se.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:5173" })
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

}
