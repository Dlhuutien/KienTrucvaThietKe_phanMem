package iuh.fit.se.controllers;


import iuh.fit.se.models.dtos.PurchaseDetailDTO;
import iuh.fit.se.models.entities.PurchaseDetail;
import iuh.fit.se.services.PurchaseDetailService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/purchaseDetail")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class PurchaseDetailController {
    @Autowired
    private PurchaseDetailService purchaseDetailService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getPurchaseDetails(@RequestParam(required = false) String searchTerm) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", HttpStatus.OK.value());
        if (searchTerm == null || searchTerm.isEmpty()) {
            response.put("data", purchaseDetailService.findAll());
        } else{
            response.put("data", purchaseDetailService.search(searchTerm));
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> savePurchaseDetail(@Valid @RequestBody PurchaseDetailDTO purchaseDetailDTO, BindingResult bindingResult){
        Map<String, Object> response = new LinkedHashMap<>();
        System.out.println("ProductDTO nhận được: " + purchaseDetailDTO);
        if (bindingResult.hasErrors()) {
            Map<String, Object> errors = new LinkedHashMap<>();
            bindingResult.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
            response.put("status", HttpStatus.BAD_REQUEST.value());
            response.put("errors", errors);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
        response.put("status", HttpStatus.CREATED.value());
        response.put("data", purchaseDetailService.save(purchaseDetailDTO));
        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updatePurchaseDetail(@PathVariable int id, @Valid @RequestBody PurchaseDetailDTO purchaseDetailDTO, BindingResult bindingResult){
        Map<String, Object> response = new LinkedHashMap<>();
        System.out.println("ProductDTO nhận được: " + purchaseDetailDTO);
        if (bindingResult.hasErrors()) {
            Map<String, Object> errors = new LinkedHashMap<>();
            bindingResult.getFieldErrors().forEach(result -> errors.put(result.getField(), result.getDefaultMessage()));
            response.put("status", HttpStatus.BAD_REQUEST.value());
            response.put("errors", errors);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        response.put("status", HttpStatus.OK.value());
        response.put("data", purchaseDetailService.update(id, purchaseDetailDTO));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deletePurchaseDetail(@PathVariable int id) {
        Map<String, Object> response = new LinkedHashMap<>();

        try {
            boolean isDeleted = purchaseDetailService.delete(id);
            if (isDeleted) {
                response.put("status", HttpStatus.OK.value());
                response.put("message", "Purchase deleted successfully");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                response.put("status", HttpStatus.NOT_FOUND.value());
                response.put("message", "Purchase not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.put("message", "Error occurred while deleting the purchase");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
