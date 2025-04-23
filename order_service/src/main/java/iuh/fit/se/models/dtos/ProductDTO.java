package iuh.fit.se.models.dtos;

import java.math.BigDecimal;

import iuh.fit.se.models.enums.Brand;
import iuh.fit.se.models.enums.CableType;
import iuh.fit.se.models.enums.Category;
import iuh.fit.se.models.enums.ConnectionType;
import iuh.fit.se.models.enums.OS;
import iuh.fit.se.models.enums.RAM;
import iuh.fit.se.models.enums.ROM;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
	// dto attribute
	// Giảm giá
	private BigDecimal discountedPrice;
	private int percentDiscount;

	// product attribute
	private int id;
	private String name;
	private String url;
	private Brand brand;
	private Category category;
	private BigDecimal salePrice;
	private BigDecimal purchasePrice;

	// earphone attribute
	private int batteryLife;

	// phone attribute
	private String chip;
	private RAM ram;
	private ROM rom;
	private OS os;
	private float screenSize;

	// power bank attribute
	private int capacity;
	private String input;
	private String output;
	private Integer fastCharging;

	// charging cable attribute
	private CableType cableType;
	private int length;

	// earphone and power bank attribute
	private ConnectionType connectionType;

}
