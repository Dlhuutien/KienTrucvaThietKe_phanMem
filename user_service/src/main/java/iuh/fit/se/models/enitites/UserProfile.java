package iuh.fit.se.models.enitites;

import java.math.BigDecimal;
import java.time.LocalDateTime;


import iuh.fit.se.models.enums.Gender;
import iuh.fit.se.models.enums.UserState;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.*;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_profile")
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(columnDefinition = "nvarchar(100)")
    private String fullName;
    @Column(columnDefinition = "varchar(100)")
    private String email;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @Column(columnDefinition = "nvarchar(15)")
    private String phoneNumber;
    @Column(columnDefinition = "nvarchar(200)")
    private String address;

    @Enumerated(EnumType.STRING)
    private UserState userState;

    @Lob
    private String url;

    private LocalDateTime createdTime;

    @PrePersist
    public void onCreate() {
        createdTime = LocalDateTime.now();
        setUserState(userState.ACTIVE);
    }
}
