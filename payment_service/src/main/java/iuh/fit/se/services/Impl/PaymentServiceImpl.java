package iuh.fit.se.services.Impl;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import iuh.fit.se.models.entities.Payment;
import iuh.fit.se.models.enums.PaymentStatus;
import iuh.fit.se.models.repositories.PaymentRepository;
import iuh.fit.se.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${api_gateway.url}")
    private String apiGatewayUrl;

    @Override
    public String createCheckoutSession(int userId) {
        try {
            System.out.println("Tạo checkout session cho userId: " + userId);

            // Lấy giỏ hàng PENDING của user qua API Gateway
            ResponseEntity<Map<String, Object>> cartResponse = restTemplate.exchange(
                    apiGatewayUrl + "/cart/user/" + userId,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {
                    });

            if (!cartResponse.getStatusCode().is2xxSuccessful() || cartResponse.getBody() == null) {
                throw new RuntimeException("Không tìm thấy giỏ hàng cho userId: " + userId);
            }

            Map<String, Object> responseBody = cartResponse.getBody();
            Map<String, Object> cart = (Map<String, Object>) responseBody.get("data");

            if (cart == null) {
                throw new RuntimeException("User chưa có giỏ hàng PENDING");
            }

            int cartId = ((Number) cart.get("id")).intValue();
            BigDecimal totalAmount = new BigDecimal(cart.get("totalDue").toString());

            System.out.println("Tìm thấy giỏ hàng ID: " + cartId + " với tổng tiền: " + totalAmount);

            // Tạo phiên Stripe session
            Stripe.apiKey = stripeSecretKey;
            long amountInCents = totalAmount.longValue();

            SessionCreateParams params = SessionCreateParams.builder()
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("vnd")
                                                    .setUnitAmount(amountInCents)
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName("Thanh toán giỏ hàng #" + cartId)
                                                                    .build())
                                                    .build())
                                    .setQuantity(1L)
                                    .build())
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("https://temgfrontend-git-deloy-dlhuutiens-projects.vercel.app/payment/success?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl("https://temgfrontend-git-deloy-dlhuutiens-projects.vercel.app/payment/cancel")
                    .putMetadata("cart_id", String.valueOf(cartId))
                    .build();

            Session session = Session.create(params);
            System.out.println("Đã tạo Stripe session với ID: " + session.getId());

            // Tạo bản ghi payment mới với trạng thái PENDING
            Payment payment = Payment.builder()
                    .userId(userId)
                    .amount(totalAmount)
                    .status(PaymentStatus.PENDING)
                    .sessionId(session.getId())
                    .createdTime(LocalDateTime.now())
                    .build();

            Payment savedPayment = paymentRepository.save(payment);
            System.out.println(
                    "Đã lưu payment với ID: " + savedPayment.getId() + ", status: " + savedPayment.getStatus());

            return session.getUrl();
        } catch (Exception e) {
            System.err.println("Lỗi khi tạo checkout session: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error creating checkout session: " + e.getMessage(), e);
        }
    }

    @Override
    public void updatePaymentStatus(String sessionId, PaymentStatus status) {
        System.out.println("Bắt đầu cập nhật trạng thái thanh toán cho session: " + sessionId + " thành " + status);

        Payment payment = paymentRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new RuntimeException("Payment session not found: " + sessionId));

        System.out.println(
                "Tìm thấy payment với ID: " + payment.getId() + ", trạng thái hiện tại: " + payment.getStatus());

        // Cập nhật trạng thái payment
        payment.setStatus(status);

        if (status == PaymentStatus.COMPLETED) {
            payment.setCompletedTime(LocalDateTime.now());
            System.out.println("Đặt thời gian hoàn thành: " + payment.getCompletedTime());

            try {
                // Lấy cartId từ Stripe session
                Stripe.apiKey = stripeSecretKey;
                Session session = Session.retrieve(sessionId);
                String cartId = session.getMetadata().get("cart_id");

                if (cartId == null || cartId.isEmpty()) {
                    throw new RuntimeException("Không tìm thấy Cart ID trong metadata của session");
                }

                System.out.println("Cập nhật trạng thái giỏ hàng: " + cartId);

                // Cập nhật trạng thái giỏ hàng thành COMPLETED
                String updateCartUrl = apiGatewayUrl + "/cart/" + cartId + "/update-state";
                Map<String, String> cartRequest = new HashMap<>();
                cartRequest.put("state", "COMPLETED");

                try {
                    System.out.println("Gọi API cập nhật giỏ hàng: " + updateCartUrl);
                    restTemplate.put(updateCartUrl, cartRequest);
                    System.out.println("Đã cập nhật thành công giỏ hàng " + cartId + " sang trạng thái COMPLETED");
                } catch (Exception restEx) {
                    System.err.println("Lỗi khi gọi API cập nhật giỏ hàng: " + restEx.getMessage());
                    restEx.printStackTrace();
                    throw restEx;
                }
            } catch (Exception e) {
                System.err.println("Lỗi khi cập nhật trạng thái giỏ hàng: " + e.getMessage());
                e.printStackTrace();
                throw new RuntimeException(
                        "Thanh toán thành công nhưng không cập nhật được trạng thái giỏ hàng: " + e.getMessage(), e);
            }
        }

        // Lưu payment với trạng thái mới
        Payment savedPayment = paymentRepository.save(payment);
        System.out.println("Đã lưu payment với trạng thái mới: " + savedPayment.getStatus());
    }

    @Override
    public Payment getPaymentBySessionId(String sessionId) {
        System.out.println("Tìm kiếm payment với sessionId: " + sessionId);
        Payment payment = paymentRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new RuntimeException("Payment not found with sessionId: " + sessionId));
        System.out.println("Đã tìm thấy payment với ID: " + payment.getId() + ", status: " + payment.getStatus());
        return payment;
    }
}