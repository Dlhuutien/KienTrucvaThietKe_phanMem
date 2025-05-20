package iuh.fit.se.models.entities;

import java.io.Serializable;
import java.math.BigDecimal;

import iuh.fit.se.models.enums.Brand;
import iuh.fit.se.models.enums.Category;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "product")
@NoArgsConstructor
@AllArgsConstructor
public class Product implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected int id;
	@Column(columnDefinition = "nvarchar(100)")
	protected String name;
	@Lob
	protected String url;

	@Enumerated(EnumType.STRING)
	protected Brand brand;

	@Enumerated(EnumType.STRING)
	protected Category category;

	// @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy =
	// "product")
	// protected Set<Comment> comments;

	// @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy =
	// "product")
	// protected Set<ProductDiscount> productDiscounts;

	@Column(name = "sale_price", columnDefinition = "Decimal(19,0)")
	protected BigDecimal salePrice;
	@Column(name = "purchase_price", columnDefinition = "Decimal(19,0)")
	protected BigDecimal purchasePrice;

	@PrePersist
	protected void onCreate() {
		if (salePrice == null) {
			salePrice = BigDecimal.ONE;
		}
		if (purchasePrice == null) {
			purchasePrice = BigDecimal.ONE;
		}
	}

}
