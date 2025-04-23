package iuh.fit.se.common.dtos;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryDTO {
    private int id;

    @NotNull(message = "ID sản phẩm không được để trống")
    private int productId;

    @NotNull(message = "Số lượng không được để trống")
    @Min(value = 0, message = "Số lượng phải lớn hơn hoặc bằng 0")
    private int quantity;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
