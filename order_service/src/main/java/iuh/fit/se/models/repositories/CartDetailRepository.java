package iuh.fit.se.models.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import iuh.fit.se.models.entities.CartDetail;

@RepositoryRestResource(collectionResourceRel = "cartDetails", path = "cartDetails")
public interface CartDetailRepository  extends JpaRepository<CartDetail, Integer> {
	@Modifying
	@Query("DELETE FROM CartDetail cd WHERE cd.id = :id")
	void deleteCartDetailByIdDirect(@Param("id") int id);

}
