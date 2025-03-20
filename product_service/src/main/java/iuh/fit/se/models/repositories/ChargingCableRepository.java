package iuh.fit.se.models.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import iuh.fit.se.models.entities.ChargingCable;

@RepositoryRestResource(collectionResourceRel = "products", path = "products")
public interface ChargingCableRepository extends JpaRepository<ChargingCable, Integer>{

}
