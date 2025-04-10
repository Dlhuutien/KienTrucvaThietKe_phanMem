package iuh.fit.se.controllers;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import iuh.fit.se.models.dtos.UserProfileDTO;
import iuh.fit.se.services.UserProfileService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/userProfiles")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:5173" })
public class UserProfileController {

	@Autowired
	UserProfileService userProfileService;

	@GetMapping
	public ResponseEntity<Map<String, Object>> getAllUsers() {
		Map<String, Object> response = new LinkedHashMap<>();
		response.put("status", HttpStatus.OK.value());
		List<UserProfileDTO> userProfileDTOs = userProfileService.findAll();
		response.put("data", userProfileDTOs);
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

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

}
