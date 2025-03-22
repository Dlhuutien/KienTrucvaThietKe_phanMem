package iuh.fit.se.controllers;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.List;

import iuh.fit.se.models.dtos.ProviderDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import iuh.fit.se.models.entities.Provider;
import iuh.fit.se.services.ProviderService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/providers")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ProviderController {

    @Autowired
    private ProviderService providerService;

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getProviderById(@PathVariable int id) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", HttpStatus.OK.value());
        response.put("data", providerService.findById(id));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    //http://localhost:8081/providers
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
    
   @PostMapping
   public ResponseEntity<Map<String, Object>> saveProvider(@Valid @RequestBody ProviderDTO provider, BindingResult bindingResult) {
       Map<String, Object> response = new LinkedHashMap<>();

       if (bindingResult.hasErrors()) {
           Map<String, Object> errors = new LinkedHashMap<>();
           bindingResult.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
           response.put("status", HttpStatus.BAD_REQUEST.value());
           response.put("errors", errors);
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
       }

       response.put("status", HttpStatus.CREATED.value());
       response.put("data", providerService.save(provider));
       return ResponseEntity.status(HttpStatus.CREATED).body(response);
   }
}
