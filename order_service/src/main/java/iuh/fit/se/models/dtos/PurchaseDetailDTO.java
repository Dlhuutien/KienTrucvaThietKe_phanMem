package iuh.fit.se.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseDetailDTO {
    protected int id;
    private LocalDateTime createdTime;
    @NotNull(message = "Số lượng không được để trống")
    @Positive(message = "Số lượng phải là số dương")
    @Min(value = 1, message = "Số lượng phải lớn hơn 0")
    private int quantity;
    @NotNull(message = "Giá mua không được để trống")
    @Positive(message = "Giá mua phải là số dương")
    @Min(value = 1, message = "Giá mua phải lớn hơn 0")
    private BigDecimal purchasePrice;
    @NotNull(message = "Giá bán không được để trống")
    @Positive(message = "Giá bán phải là số dương")
    @Min(value = 1, message = "Giá bán phải lớn hơn 0")
    private BigDecimal salePrice;

    private int providerId;
    private int productId;
    // @NotNull(message = "Sản phẩm không được để trống")
    private String productName;
    // @NotNull(message = "Nhà cung cấp không được để trống")
    private String providerName;
}