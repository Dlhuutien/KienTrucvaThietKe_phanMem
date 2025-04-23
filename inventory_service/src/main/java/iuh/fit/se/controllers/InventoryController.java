package iuh.fit.se.controllers;

import iuh.fit.se.models.dtos.InventoryDTO;
import iuh.fit.se.services.InventoryService;
import jakarta.validation.Valid;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inventory")
public class InventoryController {
	@Autowired
	private InventoryService inventoryService;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAll() {
		Map<String, Object> response = new LinkedHashMap<>();
		response.put("status", HttpStatus.OK.value());
		response.put("data", inventoryService.findAll());
		return ResponseEntity.ok(response);
	}

	@PostMapping
	public ResponseEntity<Map<String, Object>> save(@Valid @RequestBody InventoryDTO dto, BindingResult result) {
		Map<String, Object> response = new LinkedHashMap<>();
		if (result.hasErrors()) {
			Map<String, Object> errors = new LinkedHashMap<>();
			result.getFieldErrors().forEach(e -> errors.put(e.getField(), e.getDefaultMessage()));
			response.put("status", HttpStatus.BAD_REQUEST.value());
			response.put("errors", errors);
			return ResponseEntity.badRequest().body(response);
		}
		response.put("status", HttpStatus.CREATED.value());
		response.put("data", inventoryService.save(dto));
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Map<String, Object>> update(@PathVariable int id, @Valid @RequestBody InventoryDTO dto,
			BindingResult result) {
		Map<String, Object> response = new LinkedHashMap<>();
		if (result.hasErrors()) {
			Map<String, Object> errors = new LinkedHashMap<>();
			result.getFieldErrors().forEach(e -> errors.put(e.getField(), e.getDefaultMessage()));
			response.put("status", HttpStatus.BAD_REQUEST.value());
			response.put("errors", errors);
			return ResponseEntity.badRequest().body(response);
		}
		response.put("status", HttpStatus.OK.value());
		response.put("data", inventoryService.update(id, dto));
		return ResponseEntity.ok(response);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int id) {
		Map<String, Object> response = new LinkedHashMap<>();
		if (inventoryService.delete(id)) {
			response.put("status", HttpStatus.OK.value());
			response.put("message", "Deleted successfully");
			return ResponseEntity.ok(response);
		}
		response.put("status", HttpStatus.NOT_FOUND.value());
		response.put("message", "Not found");
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Map<String, Object>> getOne(@PathVariable int id) {
		Map<String, Object> response = new LinkedHashMap<>();
		response.put("status", HttpStatus.OK.value());
		response.put("data", inventoryService.findById(id));
		return ResponseEntity.ok(response);
	}
}