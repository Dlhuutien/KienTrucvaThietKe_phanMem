package iuh.fit.se.models.dtos;

import java.math.BigDecimal;
import iuh.fit.se.models.entities.Cart;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartDetailDTO {
	private int id;
	private int productId;
	private int quantity;
	private BigDecimal priceAtTransaction;
}
