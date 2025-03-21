package iuh.fit.se.models.entities;

import java.util.Set;

import iuh.fit.se.models.enums.Origin;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Provider")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Provider {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(columnDefinition = "nvarchar(100)")
	private String name;
	@Column(columnDefinition = "varchar(100)")
	private String email;
	@Column(columnDefinition = "nvarchar(200)")
	private String address;
	private Origin origin;
}
