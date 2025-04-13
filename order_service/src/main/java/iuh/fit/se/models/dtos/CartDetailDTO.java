package iuh.fit.se.models.dtos;

import java.math.BigDecimal;
import iuh.fit.se.models.entities.Cart;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartDetailDTO {
	private int id;
	private int productId;

	@NotNull(message = "Số lượng không được để trống")
	@Min(value = 0, message = "Số lượng phải lớn hơn hoặc bằng 0")
	private int quantity;
	
	private BigDecimal priceAtTransaction;
}
