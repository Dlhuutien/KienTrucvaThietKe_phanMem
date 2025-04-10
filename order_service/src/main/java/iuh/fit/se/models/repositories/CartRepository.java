package iuh.fit.se.models.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import iuh.fit.se.models.entities.Cart;
import iuh.fit.se.models.enums.State;

@RepositoryRestResource(collectionResourceRel = "carts", path = "carts")
public interface CartRepository extends JpaRepository<Cart, Integer> {
	Cart findByUserIdAndState(int userId, State state);

}
