package iuh.fit.se.models.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import iuh.fit.se.models.enums.Gender;
import iuh.fit.se.models.enums.Role;
import iuh.fit.se.models.enums.CustomerState;
import lombok.*;
import lombok.Builder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {
    private int id;
    private String fullName;
    private String email;
    private Gender gender;
    private String phoneNumber;
    private String address;
    private Role role;
    private String url;
    private BigDecimal coin;
    private CustomerState CustomerState;
    private String password;
    private LocalDateTime createdTime;
}