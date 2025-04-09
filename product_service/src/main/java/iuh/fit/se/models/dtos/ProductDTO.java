package iuh.fit.se.models.dtos;

import java.math.BigDecimal;

import iuh.fit.se.models.enums.*;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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

	@NotBlank(message = "Tên sản phẩm không được để trống")
	@Size(max = 100, message = "Tên sản phẩm không được vượt quá 100 ký tự")
	@Pattern(regexp = "^[a-zA-Z0-9\\s]+$", message = "Tên sản phẩm không được chứa ký tự đặc biệt")
	private String name;

	@NotBlank(message = "URL ảnh không được để trống")
	@Pattern(regexp = "^data:image/(jpeg|jpg|png|gif|webp);base64,.+$", message = "URL ảnh phải có định dạng .jpg, .jpeg, .png hoặc .gif dưới dạng base64")
	private String url;
	
	@NotNull(message = "Thương hiệu không được để trống")
	private Brand brand;
	
    @NotNull(message = "Danh mục sản phẩm không được để trống")
	private Category category;
    
    @NotNull(message = "Số lượng không được để trống")
    @Min(value = 0, message = "Số lượng phải lớn hơn hoặc bằng 0")
	private int quantity;
    
    @Min(value = 0, message = "Giá bán phải lớn hơn hoặc bằng 0")
    @Digits(integer = 19, fraction = 0, message = "Giá nhập tối đa 19 chữ số và không có phần thập phân")
	private BigDecimal salePrice;
    
    @Min(value = 0, message = "Giá mua phải lớn hơn hoặc bằng 0")
    @Digits(integer = 19, fraction = 0, message = "Giá bán tối đa 19 chữ số và không có phần thập phân")
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
