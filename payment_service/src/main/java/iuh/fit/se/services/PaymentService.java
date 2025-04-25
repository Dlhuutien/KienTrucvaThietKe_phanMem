package iuh.fit.se.services;

import java.math.BigDecimal;
import iuh.fit.se.models.enums.PaymentStatus;

public interface PaymentService {
    String createCheckoutSession(int userId);

    void updatePaymentStatus(String sessionId, PaymentStatus status);
}
