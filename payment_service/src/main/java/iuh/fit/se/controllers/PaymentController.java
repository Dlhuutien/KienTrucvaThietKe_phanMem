package iuh.fit.se.controllers;

import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;

import iuh.fit.se.models.dtos.PaymentDTO;
import iuh.fit.se.models.enums.PaymentStatus;
import iuh.fit.se.services.PaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

import iuh.fit.se.models.entities.Payment;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    @PostMapping("/process")
    public ResponseEntity<Map<String, Object>> processPayment(@RequestBody PaymentDTO paymentDTO) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            String checkoutUrl = paymentService.createCheckoutSession(paymentDTO.getUserId()); // Bỏ amount
            response.put("status", HttpStatus.OK.value());
            response.put("data", Map.of("checkoutUrl", checkoutUrl));
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("status", HttpStatus.BAD_REQUEST.value());
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        try {
            Event event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
            if ("checkout.session.completed".equals(event.getType())) {
                Session session = (Session) event.getDataObjectDeserializer().getObject()
                        .orElseThrow(() -> new RuntimeException("Invalid session data"));
                paymentService.updatePaymentStatus(session.getId(), PaymentStatus.COMPLETED);
                return ResponseEntity.ok("Webhook handled successfully");
            }
            return ResponseEntity.ok("Event type not handled");
        } catch (SignatureVerificationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Webhook error: " + e.getMessage());
        }
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getPaymentStatus(@RequestParam String sessionId) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            Payment payment = paymentService.getPaymentBySessionId(sessionId);
            response.put("status", HttpStatus.OK.value());
            response.put("data", Map.of(
                    "status", payment.getStatus().getValue(),
                    "amount", payment.getAmount(),
                    "completedTime", payment.getCompletedTime()
            ));
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("status", HttpStatus.NOT_FOUND.value());
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PostMapping("/complete")
    public ResponseEntity<String> completePayment(@RequestParam String sessionId, @RequestParam PaymentStatus status) {
        try {
            paymentService.updatePaymentStatus(sessionId, status);
            return ResponseEntity.ok("Payment status updated to " + status);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}