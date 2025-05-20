package iuh.fit.se.controllers;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import iuh.fit.se.models.dtos.ProviderDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import iuh.fit.se.services.ProviderService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/providers")
public class ProviderController {

    @Autowired
    private ProviderService providerService;

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getProviderById(@PathVariable int id) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            ProviderDTO providerDTO = providerService.findById(id);
            response.put("status", HttpStatus.OK.value());
            response.put("data", providerDTO);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("status", HttpStatus.NOT_FOUND.value());
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    // http://localhost:8081/providers
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllProviders(@RequestParam(required = false) String searchTerm) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", HttpStatus.OK.value());

        if (searchTerm == null || searchTerm.isEmpty()) {
            response.put("data", providerService.findAll());
        } else {
            response.put("data", providerService.search(searchTerm));
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/check-email")
    public ResponseEntity<Map<String, Object>> checkEmailUnique(
            @RequestParam String email,
            @RequestParam(required = false) Integer providerId) {

        boolean isEmailUnique;
        if (providerId != null) {
            isEmailUnique = providerService.isEmailUniqueForUpdate(email, providerId);
        } else {
            isEmailUnique = providerService.isEmailUnique(email);
        }

        Map<String, Object> response = new LinkedHashMap<>();
        if (isEmailUnique) {
            response.put("status", HttpStatus.OK.value());
            response.put("message", "Email is unique.");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            response.put("status", HttpStatus.BAD_REQUEST.value());
            response.put("message", "Email already exists.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> saveProvider(@Valid @RequestBody ProviderDTO providerDTO,
            BindingResult bindingResult) {
        Map<String, Object> response = new LinkedHashMap<>();

        if (bindingResult.hasErrors()) {
            Map<String, Object> errors = new LinkedHashMap<>();
            bindingResult.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
            response.put("status", HttpStatus.BAD_REQUEST.value());
            response.put("errors", errors);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if (!providerService.isEmailUnique(providerDTO.getEmail())) {
            response.put("status", HttpStatus.BAD_REQUEST.value());
            response.put("message", "Email đã tồn tại.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        response.put("status", HttpStatus.CREATED.value());
        response.put("data", providerService.save(providerDTO));
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateProvider(@PathVariable int id,
            @Valid @RequestBody ProviderDTO providerDTO,
            BindingResult bindingResult) {
        Map<String, Object> response = new LinkedHashMap<>();

        if (bindingResult.hasErrors()) {
            Map<String, Object> errors = new LinkedHashMap<>();
            bindingResult.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
            response.put("status", HttpStatus.BAD_REQUEST.value());
            response.put("errors", errors);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        if (!providerService.isEmailUniqueForUpdate(providerDTO.getEmail(), id)) {
            response.put("status", HttpStatus.BAD_REQUEST.value());
            response.put("message", "Email đã tồn tại.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        response.put("status", HttpStatus.OK.value());
        response.put("data", providerService.update(id, providerDTO));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteProvider(@PathVariable int id) {
        Map<String, Object> response = new LinkedHashMap<>();
        providerService.delete(id);
        response.put("status", HttpStatus.OK.value());
        response.put("message", "Provider deleted successfully.");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/search/findByName")
    public ResponseEntity<List<ProviderDTO>> findProviderByName(@RequestParam String name) {
        List<ProviderDTO> providers = providerService.findProvidersByName(name);
        if (providers.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(providers);
    }

    @GetMapping("/names")
    public ResponseEntity<List<String>> getAllProviderNames() {
        List<String> providerNames = providerService.getAllProviderNames();
        return ResponseEntity.ok(providerNames);
    }
}
