package iuh.fit.se.models.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import iuh.fit.se.models.entities.Phone;

@RepositoryRestResource(collectionResourceRel = "products", path = "products")
public interface PhoneRepository extends JpaRepository<Phone, Integer>{

}
