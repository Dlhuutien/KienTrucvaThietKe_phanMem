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
import iuh.fit.se.models.enums.Category;

@RepositoryRestResource(collectionResourceRel = "products", path = "products")
public interface ProductRepository extends JpaRepository<Product, Integer> {
    // Tìm kiếm mà không có phân trang và sắp xếp
    @Query("SELECT p FROM Product p WHERE " +
            "(LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "OR LOWER(p.category) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "OR LOWER(p.brand) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) ")
    List<Product> findProductBySearchTerm(@Param("searchTerm") String searchTerm);

    List<Product> findByNameContainingIgnoreCase(String name);
    
    List<Product> findProductByCategory(Category category);

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
    
    @Query("SELECT p FROM Phone  p WHERE p.category = :phoneCategory " +
            "AND (:ramList IS NULL or p.ram IN :ramList) " +
            "AND (:romList IS NULL or p.rom IN :romList) " +
            "AND (:maxPrice IS NULL or p.salePrice <= :maxPrice) " +
            "AND (:minPrice IS NULL or p.salePrice >= :minPrice)")
    List<Product> findPhoneWithFilters(
            @Param("ramList") List<String> ramList,
            @Param("romList") List<String> romList,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("phoneCategory") Category phoneCategory);
    
    @Query("SELECT e FROM Earphone  e WHERE e.category = :earPhoneCategory " +
            "AND (:connectTypeList IS NULL or e.connectionType IN :connectTypeList) " +
            "AND (:other IS NULL or e.brand != 'APPLE' AND e.brand != 'SAMSUNG' " +
            "AND e.brand != 'SONY' AND e.brand != 'HUAWEI' AND e.brand != 'XIAOMI')" +
            "AND (:brandList IS NULL or e.brand IN :brandList) " +
            "AND (:minPrice IS NULL or e.salePrice >= :minPrice)" +
            "AND (:maxPrice IS NULL or e.salePrice <= :maxPrice) ")
    List<Product> findEarPhoneWithFilters(
            @Param("connectTypeList") List<String> connectTypeList,
            @Param("brandList") List<String> brandList,
            @Param("other") String other,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("earPhoneCategory") Category earPhoneCategory);

    @Query("select c from ChargingCable c where c.category = :cableCategory and " +
            "(:cableTypeList is null or c.cableType in :cableTypeList) and " +
            "(:minPrice IS NULL or c.salePrice >= :minPrice) and " +
            "(:maxPrice IS NULL or c.salePrice <= :maxPrice) ")
    List<Product> findCableWithFilters(
            @Param("cableTypeList") List<String> cableList,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("cableCategory") Category cableCategory);

    @Query("select p from PowerBank p where p.category = :cableCategory and " +
            "(:inputList is null or p.input in :inputList) and " +
            "(:outputList is null or p.output in :outputList) and " +
            "(:capacityList is null or p.capacity in :capacityList) and " +
            "(:capacity = 0 or p.capacity < :capacity) and " +
            "(:minPrice IS NULL or p.salePrice >= :minPrice) and " +
            "(:maxPrice IS NULL or p.salePrice <= :maxPrice) ")
    List<Product> findPowerBankWithFilters(
            @Param("inputList") List<String> inputList,
            @Param("outputList") List<String> outputList,
            @Param("capacityList") List<Integer> capacityList,
            @Param("capacity") Integer capacity,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("cableCategory") Category cableCategory);

}
