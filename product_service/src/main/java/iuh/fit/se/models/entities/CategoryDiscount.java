package iuh.fit.se.models.entities;

import iuh.fit.se.models.enums.Category;
import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@Entity
@Table(name = "category_discount")
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDiscount extends Discount {
	@Enumerated(EnumType.STRING)
	private Category category;

}
