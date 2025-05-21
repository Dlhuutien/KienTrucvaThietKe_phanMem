package iuh.fit.se.models.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import iuh.fit.se.models.entities.PurchaseDetail;

@RepositoryRestResource(collectionResourceRel = "purchasedetail", path = "purchasedetails")
public interface PurchaseDetailRepository extends JpaRepository<PurchaseDetail, Integer> {
	@Query("SELECT pd FROM PurchaseDetail pd WHERE pd.productId = :productId AND pd.providerId = :providerId")
	List<PurchaseDetail> findByProductIdAndProviderId(@Param("productId") int productId,
			@Param("providerId") int providerId);

	List<PurchaseDetail> findAllByOrderByCreatedTimeDesc();

	@Query("SELECT p FROM PurchaseDetail p WHERE FUNCTION('MONTH', p.createdTime) = :month AND FUNCTION('YEAR', p.createdTime) = :year")
	List<PurchaseDetail> findByMonthAndYear(@Param("month") int month, @Param("year") int year);

	@Query("SELECT p FROM PurchaseDetail p WHERE FUNCTION('YEAR', p.createdTime) = :year")
	List<PurchaseDetail> findByYear(@Param("year") int year);

	@Query("SELECT p FROM PurchaseDetail p WHERE " +
			"STR(p.createdTime) LIKE CONCAT('%', :searchTerm, '%') OR " +
			"STR(p.purchasePrice) LIKE CONCAT('%', :searchTerm, '%') OR " +
			"CAST(p.quantity AS string) LIKE CONCAT('%', :searchTerm, '%')")
	List<PurchaseDetail> findPurchaseDetailBySearchTerm(@Param("searchTerm") String searchTerm);

	long countByProductId(int productId);

	@Query("SELECT SUM(p.quantity) FROM PurchaseDetail p")
	Long getTotalQuantity();

	long countByProviderId(int providerId);
}
