package iuh.fit.se.services;

import java.util.List;

import iuh.fit.se.models.dtos.ProductDTO;
import iuh.fit.se.models.entities.Product;
import org.springframework.transaction.annotation.Transactional;


public interface ProductService {
	List<ProductDTO> findAll();
//	
//	ProductDTO findProductByIdDTO(int id);
//
//	Product findProductById(int id);
//	
	List<ProductDTO> search(String searchTerm);
//	
//	ProductDTO saveProductDTO(ProductDTO productDTO);
//
//	ProductDTO saveProduct(Product product);
//
//	ProductDTO updateProductDTO(int id, ProductDTO productDTO);
//
//	ProductDTO updateProduct(int id, Product product);
//	
//	boolean delete(int id);
//
//	@Transactional(readOnly = true)
//	List<ProductDTO> findByCategory(String category);
//
//	@Transactional(readOnly = true)
//    ProductDTO findProductDTOById(int id);

}
