package iuh.fit.se.services;

import java.math.BigDecimal;

import iuh.fit.se.models.entities.Discount;
import iuh.fit.se.models.entities.Product;

public interface DiscountService {
	BigDecimal calculateDiscountedPrice(Product product);
}
