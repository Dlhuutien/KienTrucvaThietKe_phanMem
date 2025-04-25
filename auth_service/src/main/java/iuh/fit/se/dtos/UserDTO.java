package iuh.fit.se.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import iuh.fit.se.entities.Role;
import iuh.fit.se.enums.Gender;
import iuh.fit.se.enums.UserState;
import lombok.*;
import lombok.Builder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private int id;
    private String fullName;
    private String email;
    private Gender gender;
    private String phoneNumber;
    private String address;
    private Role role;
    private String url;
    private UserState userState;
    private String password;
    private LocalDateTime createdTime;
}