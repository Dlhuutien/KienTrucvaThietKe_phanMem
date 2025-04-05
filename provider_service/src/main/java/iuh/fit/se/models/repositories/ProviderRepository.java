package iuh.fit.se.models.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import iuh.fit.se.models.entities.Provider;

@RepositoryRestResource(collectionResourceRel = "provider", path = "providers")
public interface ProviderRepository extends JpaRepository<Provider, Integer> {
	@Query("SELECT p FROM Provider p WHERE " + "LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR "
			+ "LOWER(p.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR "
			+ "LOWER(p.address) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
	List<Provider> findProviderBySearchTerm(@Param("searchTerm") String searchTerm);

	boolean existsByEmail(String email);

	Provider findByEmail(String email);
}
