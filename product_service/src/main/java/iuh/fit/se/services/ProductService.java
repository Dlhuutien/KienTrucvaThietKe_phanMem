package iuh.fit.se.services;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;

import iuh.fit.se.models.dtos.ProductDTO;
import iuh.fit.se.models.entities.Product;

public interface ProductService {
	List<ProductDTO> findAll();

	Product findProductById(int id);

	@Transactional(readOnly = true)
	ProductDTO findProductDTOById(int id);

	List<ProductDTO> search(String searchTerm);

	ProductDTO saveProductDTO(ProductDTO productDTO);

	ProductDTO updateProductDTO(int id, ProductDTO productDTO);

	List<ProductDTO> findProductsByName(String name);

	List<String> getAllProductNames();

	boolean delete(int id);

	void updatePrice(int productId, BigDecimal purchasePrice, BigDecimal salePrice);

	boolean canDelete(int id);
	
	Page<ProductDTO> findAllWithPaging(int pageNo, int pageSize, String sortBy, String sortDirection);

	@Transactional(readOnly = true)
	List<ProductDTO> findByCategory(String category);
	
	@Transactional(readOnly = true)
	List<ProductDTO> findPhoneDTOWithFilter2(List<String> ramList, List<String> romList, List<String> chipList, BigDecimal minPrice, BigDecimal maxPrice);

	@Transactional(readOnly = true)
	List<ProductDTO> findEarphoneDTOWithFilter2(
			List<String> connectionTypeList,
			List<String> brandList,
			String other,
			BigDecimal minPrice,
			BigDecimal maxPrice);

	@Transactional(readOnly = true)
	List<ProductDTO> findChargingCableDTOWithFilter2(
			List<String> cableTypeList,
			List<String> lengthList,
			BigDecimal minPrice,
			BigDecimal maxPrice);
	
	@Transactional(readOnly = true)
	List<ProductDTO> findPowerBankDTOWithFilter2(
			List<String> inputList,
			List<String> outList,
			List<Integer> capacityList,
			int capacity,
			List<Integer> batteryGreaterList,
			List<Integer> batteryLessList,
			BigDecimal minPrice,
			BigDecimal maxPrice);

}
