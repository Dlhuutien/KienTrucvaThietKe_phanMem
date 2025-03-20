package iuh.fit.se.models.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import iuh.fit.se.models.entities.Discount;

@RepositoryRestResource(collectionResourceRel = "discounts", path = "discounts")
public interface DiscountRepository extends JpaRepository<Discount, Integer> {

}
