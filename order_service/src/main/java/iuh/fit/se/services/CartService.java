package iuh.fit.se.services;

import java.util.List;

import iuh.fit.se.models.dtos.CartDTO;

public interface CartService {

	List<CartDTO> findAll();
	
	CartDTO save(CartDTO cartDTO);
	
	boolean deleteCartDetailById(int id);
}
