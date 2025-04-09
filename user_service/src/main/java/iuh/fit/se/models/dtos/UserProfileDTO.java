package iuh.fit.se.models.dtos;

import iuh.fit.se.models.enums.Gender;
import iuh.fit.se.models.enums.Role;

public class UserProfileDTO {
    private int id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String address;
    private Role role;
    private Gender gender;
    private String url;
}
