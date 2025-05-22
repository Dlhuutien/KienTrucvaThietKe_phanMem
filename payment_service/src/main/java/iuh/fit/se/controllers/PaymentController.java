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
            String checkoutUrl = paymentService.createCheckoutSession(paymentDTO.getUserId());
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
    public ResponseEntity<String> handleWebhook(@RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {
        try {
            System.out.println("Nhận được Stripe webhook event");
            Event event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
            System.out.println("Loại sự kiện: " + event.getType());

            if ("checkout.session.completed".equals(event.getType())) {
                Session session = (Session) event.getDataObjectDeserializer().getObject()
                        .orElseThrow(() -> new RuntimeException("Invalid session data"));
                System.out.println("Xử lý sự kiện thanh toán hoàn tất cho session ID: " + session.getId());
                paymentService.updatePaymentStatus(session.getId(), PaymentStatus.COMPLETED);
                return ResponseEntity.ok("Webhook handled successfully");
            }
            return ResponseEntity.ok("Event type not handled: " + event.getType());
        } catch (SignatureVerificationException e) {
            System.err.println("Lỗi xác thực webhook: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
        } catch (Exception e) {
            System.err.println("Lỗi xử lý webhook: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Webhook error: " + e.getMessage());
        }
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getPaymentStatus(@RequestParam String sessionId) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            Payment payment = paymentService.getPaymentBySessionId(sessionId);

            System.out.println("Đã tìm thấy payment với ID: " + payment.getId() +
                    ", status: " + payment.getStatus() +
                    ", sessionId: " + payment.getSessionId());

            response.put("status", HttpStatus.OK.value());
            response.put("data", Map.of(
                    "status", payment.getStatus().getValue(),
                    "amount", payment.getAmount(),
                    "completedTime", payment.getCompletedTime()));
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            System.err.println("Lỗi khi tìm payment với sessionId " + sessionId + ": " + e.getMessage());
            e.printStackTrace();

            response.put("status", HttpStatus.NOT_FOUND.value());
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PostMapping("/complete")
    public ResponseEntity<Map<String, Object>> completePayment(@RequestParam String sessionId,
            @RequestParam PaymentStatus status) {
        Map<String, Object> response = new LinkedHashMap<>();
        try {
            System.out.println("Nhận yêu cầu cập nhật trạng thái thanh toán: " + sessionId + " thành " + status);

            // Đảm bảo trạng thái hợp lệ
            if (status != PaymentStatus.COMPLETED &&
                    status != PaymentStatus.PENDING &&
                    status != PaymentStatus.FAILED &&
                    status != PaymentStatus.CANCELLED) {
                throw new IllegalArgumentException("Trạng thái không hợp lệ: " + status);
            }

            paymentService.updatePaymentStatus(sessionId, status);

            // Trả về thông tin payment đã cập nhật
            Payment updatedPayment = paymentService.getPaymentBySessionId(sessionId);

            response.put("status", HttpStatus.OK.value());
            response.put("message", "Payment status updated to " + status);
            response.put("data", Map.of(
                    "status", updatedPayment.getStatus().getValue(),
                    "amount", updatedPayment.getAmount(),
                    "completedTime", updatedPayment.getCompletedTime()));

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            System.err.println("Lỗi khi cập nhật trạng thái thanh toán: " + e.getMessage());
            e.printStackTrace();

            response.put("status", HttpStatus.BAD_REQUEST.value());
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}