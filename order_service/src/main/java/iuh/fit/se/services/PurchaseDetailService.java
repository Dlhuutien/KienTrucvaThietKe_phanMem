package iuh.fit.se.services;

import java.util.List;

import iuh.fit.se.models.dtos.PurchaseDetailDTO;
import iuh.fit.se.models.entities.PurchaseDetail;

public interface PurchaseDetailService {

	List<PurchaseDetailDTO> search(String searchTerm);

	List<PurchaseDetail> findAll();

	List<PurchaseDetail> findAllByCreatedTimeDecs();

	PurchaseDetail findById(int id);

	List<PurchaseDetail> getPurchaseDetailByProductIdAndProviderId(int productId, int providerId);

	PurchaseDetailDTO save(PurchaseDetailDTO newDetail);

	PurchaseDetailDTO update(int id, PurchaseDetailDTO updatedDetail);

	boolean delete(int id);

	List<String> getProductNames();

	List<String> getProviderNames();

	long countByProviderId(int providerId);

	boolean isProductUsed(int productId);
}