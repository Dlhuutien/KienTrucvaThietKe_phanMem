package iuh.fit.se.services.Impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import iuh.fit.se.exceptions.ItemNotFoundException;
import iuh.fit.se.models.dtos.ProductDTO;
import iuh.fit.se.models.dtos.ProviderDTO;
import iuh.fit.se.models.dtos.PurchaseDetailDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import iuh.fit.se.models.entities.PurchaseDetail;
import iuh.fit.se.models.repositories.PurchaseDetailRepository;
import iuh.fit.se.services.PurchaseDetailService;

import org.modelmapper.ModelMapper;

@Service
public class PurchaseDetailServiceImpl implements PurchaseDetailService {

    @Autowired
    private PurchaseDetailRepository purchaseDetailRepository;

    @Autowired
    private ModelMapper modelMapper;
    
    @Autowired
    private RestTemplate restTemplate;

    @Value("${api_gateway.url}")
    private String apiGatewayUrl;
    
    private PurchaseDetail convertToEntity(PurchaseDetailDTO purchaseDetailDTO) {
        return modelMapper.map(purchaseDetailDTO, PurchaseDetail.class);
    }

    private PurchaseDetailDTO convertToDTO(PurchaseDetail purchaseDetail) {
        return modelMapper.map(purchaseDetail, PurchaseDetailDTO.class);
    }

    @Transactional(readOnly = true)
    @Override
    public List<PurchaseDetail> findAll() {
        return purchaseDetailRepository.findAll();
    }

    @Override
    public List<PurchaseDetail> findAllByCreatedTimeDecs() {
        return purchaseDetailRepository.findAllByOrderByCreatedTimeDesc();
    }

    @Transactional(readOnly = true)
    @Override
    public PurchaseDetail findById(int id) {
        return purchaseDetailRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("PurchaseDetail id = " + id + " is not found"));
    }

    @Transactional(readOnly = true)
    @Override
    public List<PurchaseDetail> getPurchaseDetailByProductIdAndProviderId(int productId, int providerId) {
        return purchaseDetailRepository.findByProductIdAndProviderId(productId, providerId);
    }

    @Transactional
    @Override
    public PurchaseDetail save(PurchaseDetail newDetail) {
    	ProductDTO product = restTemplate.getForObject(
                apiGatewayUrl + "/api/products/" + newDetail.getProductId(), ProductDTO.class);
        ProviderDTO provider = restTemplate.getForObject(
                apiGatewayUrl + "/providers/" + newDetail.getProviderId(), ProviderDTO.class);

        if (product != null && provider != null) {
            return purchaseDetailRepository.save(newDetail);
        }
        throw new RuntimeException("Product or Provider not found");
    }

    @Transactional
    @Override
    public PurchaseDetail update(int id, PurchaseDetail updatedDetail) {
    	Optional<PurchaseDetail> existing = purchaseDetailRepository.findById(id);
        if (existing.isPresent()) {
            updatedDetail.setId(id);
            return purchaseDetailRepository.save(updatedDetail);
        }
        throw new RuntimeException("PurchaseDetail not found");
    }

    @Transactional
    @Override
    public boolean delete(int id) {
    	if (purchaseDetailRepository.existsById(id)) {
            purchaseDetailRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional(readOnly = true)
    @Override
    public List<PurchaseDetailDTO> search(String searchTerm) {
        return purchaseDetailRepository.findPurchaseDetailBySearchTerm(searchTerm).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}
