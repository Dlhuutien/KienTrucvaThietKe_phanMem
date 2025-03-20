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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Discount findById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Discount save(Discount discount) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Discount update(int id, Discount discount) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(int id) {
		// TODO Auto-generated method stub
		return false;
	}

}
