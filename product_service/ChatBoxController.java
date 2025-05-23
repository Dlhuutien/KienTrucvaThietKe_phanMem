package iuh.fit.se.controllers;

import iuh.fit.se.models.services.ChatboxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/chatbox")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ChatBoxController {

    @Autowired
    private ChatboxService chatboxService;

    /**
     * Endpoint xử lý truy vấn của người dùng.
     *
     * @param userQuery Truy vấn của người dùng.
     * @return Kết quả xử lý truy vấn.
     */
    @PostMapping("/process-query")
    public ResponseEntity<Map<String, Object>> processQuery(@RequestParam String userQuery) {
        Map<String, Object> response = new HashMap<>();
        try {
            // Process the user query and get the response
            String result = chatboxService.processUserQuery(userQuery);

            // Success response
            response.put("data", result);
            response.put("status", "success");
            response.put("error", null);
            return new ResponseEntity<>(response, HttpStatus.OK);  // 200 OK
        } catch (IllegalArgumentException e) {
            // Error response
            response.put("data", null);
            response.put("status", "error");
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);  // 400 Bad Request
        }
    }
}
