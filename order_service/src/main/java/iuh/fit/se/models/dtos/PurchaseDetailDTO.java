package iuh.fit.se.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseDetailDTO {
    protected int id;
    private LocalDateTime createdTime;
    private int quantity;
    private BigDecimal purchasePrice;
    private int providerId;
    private int productId;
}
