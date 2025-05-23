package iuh.fit.se.models.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import iuh.fit.se.models.entities.Product;
import iuh.fit.se.models.enums.Brand;

@RepositoryRestResource(collectionResourceRel = "products", path = "products")
public interface ProductRepository extends JpaRepository<Product, Integer> {
    // Tìm kiếm mà không có phân trang và sắp xếp
    @Query("SELECT p FROM Product p WHERE " +
            "(LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "OR LOWER(p.category) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "OR LOWER(p.brand) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) ")
    List<Product> findProductBySearchTerm(@Param("searchTerm") String searchTerm);

    List<Product> findByNameContainingIgnoreCase(String name);

    // Tìm danh sách điện thoại theo khoảng giá
    @Transactional(readOnly = true)
    @Query("SELECT p FROM Product p WHERE p.salePrice >= :minPrice AND p.salePrice <= :maxPrice")
    List<Product> findProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice);

    // Tìm sản phẩm có giá dưới maxPrice
    @Transactional(readOnly = true)
    @Query("SELECT p FROM Product p WHERE p.salePrice <= :maxPrice")
    List<Product> findProductsByPriceBelow(@Param("maxPrice") BigDecimal maxPrice);

    // Tìm sản phẩm có giá trên minPrice
    @Transactional(readOnly = true)
    @Query("SELECT p FROM Product p WHERE p.salePrice >= :minPrice")
    List<Product> findProductsByPriceAbove(@Param("minPrice") BigDecimal minPrice);

    // Lấy danh sách các mẫu điện thoại mới nhất của một hãng
    @Transactional(readOnly = true)
    @Query("SELECT p FROM Product p WHERE p.brand = :brand ORDER BY p.id DESC")
    List<Product> findLatestProductsByBrand(@Param("brand") Brand brand);

    // Tìm sản phẩm theo loại sản phẩm (category)
    @Transactional(readOnly = true)
    @Query("SELECT p FROM Product p WHERE LOWER(p.category) = LOWER(:category)")
    List<Product> findProductsByCategory(@Param("category") String category);
}
