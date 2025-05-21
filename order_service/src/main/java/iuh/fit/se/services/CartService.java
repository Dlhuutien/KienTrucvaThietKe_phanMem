package iuh.fit.se.services;

import java.util.List;

import iuh.fit.se.models.dtos.CartDTO;

public interface CartService {

	List<CartDTO> findAll();

	CartDTO save(CartDTO cartDTO);

	boolean deleteCartDetailById(int id);

	public boolean updateCartDetailQuantity(int cartDetailId, int newQuantity);

	CartDTO findById(int cartId);

	void updateCartState(int cartId, String newState);

	CartDTO findPendingCartByUserId(int userId);

	long countProductUsageInCarts(int productId);

}
