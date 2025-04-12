package iuh.fit.se.models.dtos;

import java.time.LocalDateTime;

import iuh.fit.se.models.enums.Gender;
import iuh.fit.se.models.enums.UserState;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDTO {
    private int id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String address;
    private Gender gender;
    private String url;
    private LocalDateTime createdTime;
    private UserState userState;
}