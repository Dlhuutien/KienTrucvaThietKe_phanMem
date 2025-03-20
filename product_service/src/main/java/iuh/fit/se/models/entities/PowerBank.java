package iuh.fit.se.models.entities;

import iuh.fit.se.models.enums.ConnectionType;
import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@Entity
@Table(name = "power_bank")
@NoArgsConstructor
@AllArgsConstructor

public class PowerBank extends Product{
private Integer fastCharging;
    
    @Column(name = "capacity")
    private int capacity;
    @Column(name = "input",columnDefinition = "varchar(50)")
    private String input;
    @Column(name = "output",columnDefinition = "varchar(50)")
    private String output;
    
    @Enumerated(EnumType.STRING)
    private ConnectionType connectionType;

}
