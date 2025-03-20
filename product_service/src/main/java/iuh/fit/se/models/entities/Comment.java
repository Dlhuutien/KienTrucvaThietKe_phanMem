package iuh.fit.se.models.entities;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@Entity
@Table(name = "comment")
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
	@Id
	@ManyToOne
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;

	@Id
	private LocalDateTime createdTime;

	@Lob
	private String content;
	@Column(columnDefinition = "tinyint")
	private int rate;

	@PrePersist
	protected void onCreate() {
		createdTime = LocalDateTime.now();
	}

}
