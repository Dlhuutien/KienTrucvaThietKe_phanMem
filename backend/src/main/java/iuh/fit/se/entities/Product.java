package iuh.fit.se.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import iuh.fit.se.models.enums.Brand;
import iuh.fit.se.models.enums.Category;
import iuh.fit.se.models.enums.State;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "product")
@NoArgsConstructor
@AllArgsConstructor

public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected int id;
	@Column(columnDefinition = "nvarchar(100)")
	protected String name;
	@Lob
	protected String url;

	@Enumerated(EnumType.STRING)
	protected Brand brand;

	@Enumerated(EnumType.STRING)
	protected Category category;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "product")
	protected Set<CartDetail> cartDetails;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "product")
	protected Set<Comment> comments;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "product")
	@JsonIgnore
	protected Set<PurchaseDetail> purchaseDetails;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "product")
	protected  Set<ProductDiscount> productDiscounts;
	
	protected int quantity;
	@Column(name = "sale_price", columnDefinition = "Decimal(19,0)")
	protected BigDecimal salePrice;
	@Column(name = "purchase_price", columnDefinition = "Decimal(19,0)")
	protected BigDecimal purchasePrice;
	@PrePersist
	protected void onCreate() {
		salePrice = BigDecimal.ONE;
		purchasePrice = BigDecimal.ONE;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Brand getBrand() {
		return brand;
	}
	public void setBrand(Brand brand) {
		this.brand = brand;
	}
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
	}
	public Set<CartDetail> getCartDetails() {
		return cartDetails;
	}
	public void setCartDetails(Set<CartDetail> cartDetails) {
		this.cartDetails = cartDetails;
	}
	public Set<Comment> getComments() {
		return comments;
	}
	public void setComments(Set<Comment> comments) {
		this.comments = comments;
	}
	public Set<PurchaseDetail> getPurchaseDetails() {
		return purchaseDetails;
	}
	public void setPurchaseDetails(Set<PurchaseDetail> purchaseDetails) {
		this.purchaseDetails = purchaseDetails;
	}
	public Set<ProductDiscount> getProductDiscounts() {
		return productDiscounts;
	}
	public void setProductDiscounts(Set<ProductDiscount> productDiscounts) {
		this.productDiscounts = productDiscounts;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public BigDecimal getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
	}
	public BigDecimal getPurchasePrice() {
		return purchasePrice;
	}
	public void setPurchasePrice(BigDecimal purchasePrice) {
		this.purchasePrice = purchasePrice;
	}
	
	
}
