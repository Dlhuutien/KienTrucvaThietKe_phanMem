package iuh.fit.se.services;

import iuh.fit.se.models.dtos.CartDTO;

import java.util.List;

public interface CartService {
	List<CartDTO> findAll();

	CartDTO save(CartDTO cartDTO);

	boolean deleteCartDetailById(int id);

	boolean updateCartDetailQuantity(int cartDetailId, int newQuantity);

	CartDTO findById(int cartId);

	void updateCartState(int cartId, String newState);

	CartDTO findPendingCartByUserId(int userId);

}