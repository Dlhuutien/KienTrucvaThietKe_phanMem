package iuh.fit.se.models.entities;

import iuh.fit.se.models.enums.OS;
import iuh.fit.se.models.enums.RAM;
import iuh.fit.se.models.enums.ROM;
import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@Entity
@Table(name = "phone")
@NoArgsConstructor
@AllArgsConstructor

public class Phone extends Product{
	@Enumerated(EnumType.STRING)
    private OS os;
	@Enumerated(EnumType.STRING)
    private RAM ram;
	@Enumerated(EnumType.STRING)
    private ROM rom;
    @Column(columnDefinition = "varchar(50)")
    private String chip;
    @Column(name = "screen_size", columnDefinition = "Decimal(3,2)")
    private float screenSize;

}
