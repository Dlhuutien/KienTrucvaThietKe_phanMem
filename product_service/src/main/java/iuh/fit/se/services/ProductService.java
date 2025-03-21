package iuh.fit.se.services;

import java.util.List;

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
	
	boolean delete(int id);
}
