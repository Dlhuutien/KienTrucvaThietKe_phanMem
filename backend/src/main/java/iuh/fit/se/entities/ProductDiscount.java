package iuh.fit.se.entities;

import iuh.fit.se.models.enums.Brand;
import iuh.fit.se.models.enums.ConnectionType;
import jakarta.persistence.*;
import lombok.*;
@Data
@Builder
@Entity
@Table(name = "product_discount")
@NoArgsConstructor
@AllArgsConstructor
public class ProductDiscount{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "discount_id")
    private Discount discount;
}
