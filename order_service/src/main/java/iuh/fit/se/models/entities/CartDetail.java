package iuh.fit.se.models.entities;

import java.io.Serializable;
import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@Entity
@Table(name = "cart_detail")
@NoArgsConstructor
@AllArgsConstructor
public class CartDetail implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "cart_id", nullable = false, referencedColumnName = "id")
	// @JsonBackReference
	@JsonIgnoreProperties("cartDetails")
	private Cart cart;

	// @Id
	@Column(name = "product_id", nullable = false)
	private int productId;

	private int quantity;

	@Column(name = "price_at_transaction", columnDefinition = "Decimal(19,0)")
	private BigDecimal priceAtTransaction;

}
