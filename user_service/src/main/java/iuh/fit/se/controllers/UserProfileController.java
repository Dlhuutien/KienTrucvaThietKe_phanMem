package iuh.fit.se.controllers;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;

import iuh.fit.se.exceptions.ItemNotFoundException;
import iuh.fit.se.models.dtos.UserProfileDTO;
import org.springframework.web.bind.annotation.*;

import iuh.fit.se.exceptions.ItemNotFoundException;
import iuh.fit.se.models.dtos.UserProfileDTO;
import iuh.fit.se.models.enums.UserState;

import iuh.fit.se.services.UserProfileService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/userProfiles")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:5173" })
public class UserProfileController {

	@Autowired
	UserProfileService userProfileService;

	private UserProfileService userProfileService;

	// 1. GET all users
	@GetMapping
	public ResponseEntity<Map<String, Object>> getAllUsers() {
		Map<String, Object> response = new LinkedHashMap<>();
		response.put("status", HttpStatus.OK.value());
		List<UserProfileDTO> userProfileDTOs = userProfileService.findAll();
		response.put("data", userProfileDTOs);
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	// 2. POST create new user
	@PostMapping
	public ResponseEntity<Map<String, Object>> saveUser(@Valid @RequestBody UserProfileDTO userProfileDTO,
			BindingResult bindingResult) {
		Map<String, Object> response = new LinkedHashMap<>();

		if (bindingResult.hasErrors()) {
			Map<String, Object> errors = new LinkedHashMap<>();
			bindingResult.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
			response.put("status", HttpStatus.BAD_REQUEST.value());
			response.put("errors", errors);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}

		response.put("status", HttpStatus.CREATED.value());
		response.put("data", userProfileService.save(userProfileDTO));
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	@GetMapping("/{id}")
	public ResponseEntity<Map<String, Object>> getProductById(@PathVariable int id) {

	// 3. GET user by id
	@GetMapping("/{id}")
	public ResponseEntity<Map<String, Object>> getUserById(@PathVariable int id) {
		Map<String, Object> response = new LinkedHashMap<>();
		try {
			UserProfileDTO userProfileDTO = userProfileService.findById(id);
			response.put("status", HttpStatus.OK.value());
			response.put("data", userProfileDTO);
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (ItemNotFoundException e) {
			response.put("status", HttpStatus.NOT_FOUND.value());
			response.put("message", e.getMessage());
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Map<String, Object>> updateUser(@PathVariable int id, @Valid @RequestBody UserProfileDTO userProfileDTO, BindingResult bindingResult) {
		Map<String, Object> response = new LinkedHashMap<>();

		if (bindingResult.hasErrors()) {
			Map<String, Object> errors = new LinkedHashMap<>();
			bindingResult.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
			response.put("status", HttpStatus.BAD_REQUEST.value());
			response.put("errors", errors);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}

		response.put("status", HttpStatus.OK.value());
		response.put("data", userProfileService.update(id, userProfileDTO));
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable int id) {
		Map<String, Object> response = new LinkedHashMap<>();
		try {
			userProfileService.delete(id);
			response.put("status", HttpStatus.OK.value());
			response.put("message", "User deleted successfully.");
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (ItemNotFoundException e) {
			response.put("status", HttpStatus.NOT_FOUND.value());
			response.put("message", e.getMessage());
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

	// 4. GET users by UserState (optional feature)
	@GetMapping("/filter/{state}")
	public ResponseEntity<Map<String, Object>> getUsersByState(@PathVariable String state) {
		Map<String, Object> response = new LinkedHashMap<>();
		try {
			// Tạo đối tượng UserState từ tham số 'state'
			UserState userState = UserState.valueOf(state.toUpperCase());
			// Lấy danh sách người dùng theo trạng thái
			List<UserProfileDTO> users = userProfileService.findByState(userState);
			response.put("status", HttpStatus.OK.value());
			response.put("data", users);
			return ResponseEntity.ok(response);
		} catch (IllegalArgumentException e) {
			response.put("status", HttpStatus.BAD_REQUEST.value());
			response.put("message", "Invalid state: " + state); // Thông báo nếu trạng thái không hợp lệ
			return ResponseEntity.badRequest().body(response);
		}
	}

	// 5. POST update user state
	@PostMapping("/{id}/state")
	public ResponseEntity<Map<String, Object>> updateUserState(@PathVariable int id,
			@RequestBody Map<String, String> requestBody) {
		Map<String, Object> response = new LinkedHashMap<>();
		try {
			// Lấy giá trị trạng thái từ requestBody
			UserState newState = UserState.valueOf(requestBody.get("userState").toUpperCase());
			// Cập nhật trạng thái người dùng
			UserProfileDTO updatedUserProfile = userProfileService.updateUserState(id, newState);
			response.put("status", HttpStatus.OK.value());
			response.put("data", updatedUserProfile);
			return ResponseEntity.ok(response);
		} catch (IllegalArgumentException e) {
			response.put("status", HttpStatus.BAD_REQUEST.value());
			response.put("message", "Invalid state provided");
			return ResponseEntity.badRequest().body(response);
		}
	}
}
