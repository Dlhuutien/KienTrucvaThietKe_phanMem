package iuh.fit.se.models.dtos;
import iuh.fit.se.models.enums.Origin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProviderDTO {
    private int id;
    @NotBlank(message = "Tên nhà cung cấp không được để trống.")
    @Size(max = 100, message = "Tên nhà cung cấp không được vượt quá 100 ký tự.")
    private String name;
    @Email(message = "Định dạng email không hợp lệ.")
    @NotBlank(message = "Email không được để trống.")
    @Size(max = 100, message = "Email không được vượt quá 100 ký tự.")
    private String email;
    @NotBlank(message = "Địa chỉ không được để trống.")
    @Size(max = 200, message = "Địa chỉ không được vượt quá 200 ký tự.")
    private String address;
    @NotNull(message = "Xuất xứ phải được chỉ định.")
    private Origin origin;
}
