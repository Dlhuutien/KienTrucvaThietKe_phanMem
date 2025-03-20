package iuh.fit.se.models.entities;

import iuh.fit.se.models.enums.Brand;
import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@Entity
@Table(name = "brand_discount")
@NoArgsConstructor
@AllArgsConstructor
public class BrandDiscount extends Discount {
	@Enumerated(EnumType.STRING)
	private Brand brand;

}
