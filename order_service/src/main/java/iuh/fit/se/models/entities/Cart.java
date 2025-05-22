package iuh.fit.se.models.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import iuh.fit.se.models.enums.State;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.*;

@Data
@Builder
@Entity
@Table(name = "cart")
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
	// private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "user_id", nullable = false)
	private int userId;

	@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties("cart")
	private List<CartDetail> cartDetails;

	private LocalDateTime createdTime;

	private LocalDateTime modifiedTime;

	@Enumerated(EnumType.STRING)
	private State state;

	@Column(name = "total_due", columnDefinition = "DECIMAL(19,0)")
	private BigDecimal totalDue;

	@PrePersist
	protected void onCreate() {
		createdTime = LocalDateTime.now();
		state = State.PENDING;
	}

	@PreUpdate
	protected void onUpdate() {
		modifiedTime = LocalDateTime.now();
	}

}
