package iuh.fit.se.controllers;

import iuh.fit.se.models.dtos.ProviderDTO;
import iuh.fit.se.models.dtos.CustomerDTO;
import iuh.fit.se.models.entities.LoginRequest;
import iuh.fit.se.models.entities.Customer;
import iuh.fit.se.models.services.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/Customers")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class CustomerController {
    @Autowired
    private CustomerService CustomerService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllCustomers() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", HttpStatus.OK.value());
        List<CustomerDTO> Customers = CustomerService.findAll();
        response.put("data", Customers);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/{id}/state")
    public ResponseEntity<Map<String, Object>> updateCustomerState(@PathVariable int id) {
        Map<String, Object> response = new LinkedHashMap<>();
        CustomerDTO CustomerDTO = CustomerService.findById(id);
        CustomerDTO updateCustomer = CustomerService.updateState(CustomerDTO);

        response.put("status", HttpStatus.OK.value());
        response.put("data", updateCustomer);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateCustomer(@PathVariable int id, @Valid @RequestBody CustomerDTO CustomerDTO, BindingResult bindingResult) {
        Map<String, Object> response = new LinkedHashMap<>();

        if (bindingResult.hasErrors()) {
            Map<String, Object> errors = new LinkedHashMap<>();
            bindingResult.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
            response.put("status", HttpStatus.BAD_REQUEST.value());
            response.put("errors", errors);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        response.put("status", HttpStatus.OK.value());
        response.put("data", CustomerService.updateCustomer(id, CustomerDTO));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteCustomer(@PathVariable int id) {
        Map<String, Object> response = new LinkedHashMap<>();
        CustomerService.delete(id);
        response.put("status", HttpStatus.OK.value());
        response.put("message", "Customer deleted successfully");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> saveCustomer(@Valid @RequestBody CustomerDTO CustomerDTO, BindingResult bindingResult) {
        Map<String, Object> response = new LinkedHashMap<>();

        if (bindingResult.hasErrors()) {
            Map<String, Object> errors = new LinkedHashMap<>();
            bindingResult.getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
            response.put("status", HttpStatus.BAD_REQUEST.value());
            response.put("errors", errors);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        response.put("status", HttpStatus.CREATED.value());
        response.put("data", CustomerService.save(CustomerDTO));
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> registerCustomer(@RequestBody Customer Customer) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", HttpStatus.OK);
        response.put("data", CustomerService.save(Customer));
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            // Validate the input request
            if (request == null || request.getCustomerName() == null || request.getPassword() == null) {
                response.put("error", "Invalid login request");
                return ResponseEntity.badRequest().body(response);
            }

            // Attempt login
            if (CustomerService.login(request)) {
                response.put("Customer", request.getCustomerName());
                response.put("status", HttpStatus.OK.value());
                return ResponseEntity.ok(response);
            } else {
                response.put("error", "Invalid Customername or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } catch (Exception e) {
            response.put("error", "Internal server error");
            response.put("details", e.getMessage());
            e.printStackTrace(); // Log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
