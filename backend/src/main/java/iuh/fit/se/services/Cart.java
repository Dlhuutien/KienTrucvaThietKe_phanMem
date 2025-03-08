package iuh.fit.se.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

import iuh.fit.se.entities.CartDetail;
import iuh.fit.se.entities.User;
import iuh.fit.se.models.enums.State;
import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@Entity
@Table(name = "cart")
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, optional = true)
	@JoinColumn(name = "user_id")
	private User user;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "cart", orphanRemoval = true)
	private Set<CartDetail> cartDetails;

	private LocalDateTime createdTime;
	
	private LocalDateTime modifiedTime;

	@Enumerated(EnumType.STRING)
	private State state;
	
	@Column(name = "used_coin", columnDefinition = "DECIMAL(19,0)")
	private BigDecimal usedCoin;
	
	@Column(name = "total_due", columnDefinition = "DECIMAL(19,0)")
	private BigDecimal totalDue;
	
	

	public int getId() {
		return id;
	}



	public void setId(int id) {
		this.id = id;
	}



	public User getUser() {
		return user;
	}



	public void setUser(User user) {
		this.user = user;
	}



	public Set<CartDetail> getCartDetails() {
		return cartDetails;
	}



	public void setCartDetails(Set<CartDetail> cartDetails) {
		this.cartDetails = cartDetails;
	}



	public LocalDateTime getCreatedTime() {
		return createdTime;
	}



	public void setCreatedTime(LocalDateTime createdTime) {
		this.createdTime = createdTime;
	}



	public LocalDateTime getModifiedTime() {
		return modifiedTime;
	}



	public void setModifiedTime(LocalDateTime modifiedTime) {
		this.modifiedTime = modifiedTime;
	}



	public State getState() {
		return state;
	}



	public void setState(State state) {
		this.state = state;
	}



	public BigDecimal getUsedCoin() {
		return usedCoin;
	}



	public void setUsedCoin(BigDecimal usedCoin) {
		this.usedCoin = usedCoin;
	}



	public BigDecimal getTotalDue() {
		return totalDue;
	}



	public void setTotalDue(BigDecimal totalDue) {
		this.totalDue = totalDue;
	}



	@PrePersist
	protected void onCreate() {
		createdTime = LocalDateTime.now();
		state = State.PENDING;
	}
}