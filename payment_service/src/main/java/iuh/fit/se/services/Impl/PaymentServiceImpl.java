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

            Payment payment = Payment.builder()
                    .userId(userId)
                    .amount(totalAmount)
                    .status(PaymentStatus.PENDING)
                    .sessionId(session.getId())
                    .createdTime(LocalDateTime.now())
                    .build();
            paymentRepository.save(payment);

            return session.getUrl();
        } catch (Exception e) {
            throw new RuntimeException("Error creating checkout session: " + e.getMessage(), e);
        }
    }

//    @Override
//    public void updatePaymentStatus(String sessionId, PaymentStatus status) {
//        Payment payment = paymentRepository.findBySessionId(sessionId)
//                .orElseThrow(() -> new RuntimeException("Payment session not found"));
//
//        payment.setStatus(status);
//        if (status == PaymentStatus.COMPLETED) {
//        	payment.setCompletedTime(LocalDateTime.now());
//
//            // Lấy cartId từ Stripe session metadata
//            try {
//                Stripe.apiKey = stripeSecretKey;
//                Session session = Session.retrieve(sessionId);
//                String cartId = session.getMetadata().get("cart_id");
//
//                // Cập nhật trạng thái giỏ hàng thông qua API Gateway
//                String url = apiGatewayUrl + "/cart/" + cartId + "/update-state";
//                Map<String, String> request = new HashMap<>();
//                request.put("state", "COMPLETED");
//
//                restTemplate.put(url, request);
//            } catch (Exception e) {
//                throw new RuntimeException("Thanh toán xong nhưng không cập nhật được giỏ hàng: " + e.getMessage(), e);
//            }
//        }
//
//        paymentRepository.save(payment);
//    }
    
 // Trong PaymentServiceImpl.java

    @Override
    public void updatePaymentStatus(String sessionId, PaymentStatus status) {
        Payment payment = paymentRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new RuntimeException("Payment session not found"));

        payment.setStatus(status);
        if (status == PaymentStatus.COMPLETED) {
            payment.setCompletedTime(LocalDateTime.now());

            try {
                Stripe.apiKey = stripeSecretKey;
                Session session = Session.retrieve(sessionId);
                String cartId = session.getMetadata().get("cart_id");

                // Cập nhật trạng thái giỏ hàng thông qua API Gateway
                String updateCartUrl = apiGatewayUrl + "/cart/" + cartId + "/update-state";
                Map<String, String> cartRequest = new HashMap<>();
                cartRequest.put("state", "COMPLETED");
                restTemplate.put(updateCartUrl, cartRequest);

                // Trừ kho (inventory)
                String getCartDetailsUrl = apiGatewayUrl + "/cart/detail/" + cartId;
                ResponseEntity<Map<String, Object>> cartDetailResponse = restTemplate.exchange(
                    getCartDetailsUrl,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
                );

                if (!cartDetailResponse.getStatusCode().is2xxSuccessful() || cartDetailResponse.getBody() == null) {
                    throw new RuntimeException("Không thể lấy chi tiết giỏ hàng để cập nhật tồn kho");
                }

                // Duyệt qua từng sản phẩm và trừ số lượng
                var cartDetails = (Iterable<Map<String, Object>>) cartDetailResponse.getBody().get("data");
                for (Map<String, Object> item : cartDetails) {
                    int productId = (int) item.get("productId");
                    int quantity = (int) item.get("quantity");

                    String inventoryUrl = apiGatewayUrl + "/inventory/reduce-quantity";
                    Map<String, Object> inventoryRequest = new HashMap<>();
                    inventoryRequest.put("productId", productId);
                    inventoryRequest.put("quantity", quantity);

                    restTemplate.postForEntity(inventoryUrl, inventoryRequest, Void.class);
                }

            } catch (Exception e) {
                throw new RuntimeException("Thanh toán xong nhưng lỗi khi cập nhật cart hoặc inventory: " + e.getMessage(), e);
            }
        }

        paymentRepository.save(payment);
    }
    
    @Override
    public Payment getPaymentBySessionId(String sessionId) {
        return paymentRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

}