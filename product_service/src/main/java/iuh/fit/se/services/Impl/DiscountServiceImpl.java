package iuh.fit.se.services.Impl;
import java.math.BigDecimal;
import java.util.List;

import iuh.fit.se.models.entities.Discount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import iuh.fit.se.models.entities.Product;
import iuh.fit.se.models.repositories.*;
import iuh.fit.se.services.*;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DiscountServiceImpl implements DiscountService{

	@Override
	public BigDecimal calculateDiscountedPrice(Product product) {
	    BigDecimal salePrice = product.getSalePrice();

	    if (salePrice == null || salePrice.compareTo(BigDecimal.ZERO) <= 0) {
	        // Nếu giá bán không hợp lệ, trả về giá bán gốc hoặc 0
	        return BigDecimal.ZERO;
	    }

	    // Tỷ lệ giảm giá cố định (10%)
	    BigDecimal discountRate = BigDecimal.valueOf(0.1);

	    BigDecimal discountedPrice = salePrice.subtract(salePrice.multiply(discountRate));

	    return discountedPrice;
	}


}
