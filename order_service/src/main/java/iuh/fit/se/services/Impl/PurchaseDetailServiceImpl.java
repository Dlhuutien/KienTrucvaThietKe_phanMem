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
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
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
    public PurchaseDetailDTO save(PurchaseDetailDTO purchaseDetailDTO) {
        List<ProviderDTO> providers = restTemplate.exchange(
                apiGatewayUrl + "/providers/search/findByName?name=" + purchaseDetailDTO.getProviderName(),
                HttpMethod.GET, null, new ParameterizedTypeReference<List<ProviderDTO>>() {
                }).getBody();
        System.out.println("Providers found: " + providers);

        if (providers != null && !providers.isEmpty()) {
            ProviderDTO provider = providers.get(0);

            List<ProductDTO> products = restTemplate.exchange(
                    apiGatewayUrl + "/api/products/search/findByName?name=" + purchaseDetailDTO.getProductName(),
                    HttpMethod.GET, null, new ParameterizedTypeReference<List<ProductDTO>>() {
                    }).getBody();
            System.out.println("Products found: " + products);

            if (products != null && !products.isEmpty()) {
                ProductDTO product = products.get(0);

                PurchaseDetail purchaseDetail = convertToEntity(purchaseDetailDTO);
                purchaseDetail.setProductId(product.getId());
                purchaseDetail.setProviderId(provider.getId());
                purchaseDetail.setPurchasePrice(purchaseDetailDTO.getPurchasePrice());
                purchaseDetail.setSalePrice(purchaseDetailDTO.getSalePrice());

                System.out.println("Saving PurchaseDetail: " + purchaseDetail);
                PurchaseDetail savedPurchaseDetail = purchaseDetailRepository.save(purchaseDetail);
                return convertToDTO(savedPurchaseDetail);
            }
            throw new RuntimeException("Product not found by name");
        }
        throw new RuntimeException("Provider not found by name");
    }

    @Transactional
    @Override
    public PurchaseDetailDTO update(int id, PurchaseDetailDTO updatedDetailDTO) {
        Optional<PurchaseDetail> existing = purchaseDetailRepository.findById(id);
        if (existing.isPresent()) {
            PurchaseDetail updatedDetail = convertToEntity(updatedDetailDTO);
            updatedDetail.setId(id);
            PurchaseDetail savedUpdatedDetail = purchaseDetailRepository.save(updatedDetail);

            return convertToDTO(savedUpdatedDetail);
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

    public List<String> getProductNames() {
        ResponseEntity<List<String>> response = restTemplate.exchange(
                apiGatewayUrl + "/api/products/names",
                HttpMethod.GET, null, new ParameterizedTypeReference<List<String>>() {
                });
        return response.getBody();
    }

    public List<String> getProviderNames() {
        ResponseEntity<List<String>> response = restTemplate.exchange(
                apiGatewayUrl + "/providers/names",
                HttpMethod.GET, null, new ParameterizedTypeReference<List<String>>() {
                });
        return response.getBody();
    }
}
