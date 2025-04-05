package iuh.fit.se.models.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Purchase_Detail")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected int id;
	@Column(name = "provider_id")
	private int providerId;
	@Column(name = "product_id")
	private int productId;
	@Column(name = "created_time")
	private LocalDateTime createdTime;
	@Column(name = "purchase_price", columnDefinition = "Decimal(19,0)")
	private BigDecimal purchasePrice;
	private int quantity;

	@PrePersist
	protected void onCreate() {
		this.createdTime = LocalDateTime.now();
	}
}
