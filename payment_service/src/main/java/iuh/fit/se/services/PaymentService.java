package iuh.fit.se.services;

import iuh.fit.se.models.entities.Payment;
import iuh.fit.se.models.enums.PaymentStatus;

public interface PaymentService {
    String createCheckoutSession(int userId);

    void updatePaymentStatus(String sessionId, PaymentStatus status);
    
    Payment getPaymentBySessionId(String sessionId);
}
