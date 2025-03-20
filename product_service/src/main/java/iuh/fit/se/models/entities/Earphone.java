package iuh.fit.se.models.entities;

import iuh.fit.se.models.enums.ConnectionType;
import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@Entity
@Table(name = "earphone")
@NoArgsConstructor
@AllArgsConstructor

public class Earphone extends Product {
	@Enumerated(EnumType.STRING)
	private ConnectionType connectionType;
	private int batteryLife;

}
