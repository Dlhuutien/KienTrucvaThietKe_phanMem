package iuh.fit.se.models.dtos;

import java.time.LocalDateTime;

import iuh.fit.se.models.enums.PaymentMethod;
import iuh.fit.se.models.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentDTO {
    private int userId;
    private String stripeToken;
}
