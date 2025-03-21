package iuh.fit.se.models.entities;

import iuh.fit.se.models.enums.CableType;
import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@Entity
@Table(name = "charging_cable")
@NoArgsConstructor
@AllArgsConstructor
public class ChargingCable extends Product {
	@Enumerated(EnumType.STRING)
	private CableType cableType;

	private int length;
}
