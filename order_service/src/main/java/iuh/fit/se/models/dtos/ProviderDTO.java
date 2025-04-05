package iuh.fit.se.models.dtos;
import iuh.fit.se.models.enums.Origin;
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
    private String name;
    private String email;
    private String address;
    private Origin origin;
}
