package iuh.fit.se.services.Impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import iuh.fit.se.exceptions.ItemNotFoundException;
import iuh.fit.se.models.dtos.InventoryDTO;
import iuh.fit.se.models.entities.Inventory;
import iuh.fit.se.models.repositories.InventoryRepository;
import iuh.fit.se.services.InventoryService;

@Service
public class InventoryServiceImpl implements InventoryService {
	@Autowired
	private InventoryRepository inventoryRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private RestTemplate restTemplate;
	
	@Value("${api_gateway.url}")
	private String apiGatewayUrl;

	private Inventory convertToEntity(InventoryDTO dto) {
		return modelMapper.map(dto, Inventory.class);
	}

	private InventoryDTO convertToDTO(Inventory entity) {
		return modelMapper.map(entity, InventoryDTO.class);
	}

	@Transactional(readOnly = true)
	@Override
	public List<InventoryDTO> findAll() {
		return inventoryRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	@Override
	public InventoryDTO findById(int id) {
		Inventory inventory = inventoryRepository.findById(id)
				.orElseThrow(() -> new ItemNotFoundException("Inventory id = " + id + " not found"));
		return convertToDTO(inventory);
	}

	@Transactional
	@Override
	public InventoryDTO save(InventoryDTO inventoryDTO) {
		// Kiểm tra productId tồn tại qua API Gateway
		ResponseEntity<Map<String, Object>> productResponse = restTemplate.exchange(
				apiGatewayUrl + "/api/products/" + inventoryDTO.getProductId(),
				HttpMethod.GET,
				null,
				new ParameterizedTypeReference<Map<String, Object>>() {}
		);

		if (!productResponse.getStatusCode().is2xxSuccessful() || productResponse.getBody() == null) {
			throw new RuntimeException("Không thể kết nối tới product service hoặc dữ liệu rỗng");
		}

		Map<String, Object> productMap = productResponse.getBody();
		Map<String, Object> productData = (Map<String, Object>) productMap.get("data");

		if (productData == null) {
			throw new RuntimeException("Không tìm thấy sản phẩm với ID: " + inventoryDTO.getProductId());
		}

		// Kiểm tra nếu inventory đã tồn tại theo productId
		Inventory inventory = inventoryRepository.findByProductId(inventoryDTO.getProductId())
				.map(existing -> {
					existing.setQuantity(existing.getQuantity() + inventoryDTO.getQuantity());
					existing.setUpdatedAt(java.time.LocalDateTime.now()); // cập nhật updated_at
					return existing;
				})
				.orElseGet(() -> convertToEntity(inventoryDTO));

		return convertToDTO(inventoryRepository.save(inventory));
	}

	@Transactional
	@Override
	public InventoryDTO update(int id, InventoryDTO inventoryDTO) {
		// Kiểm tra tồn tại
		Inventory existing = inventoryRepository.findById(id)
				.orElseThrow(() -> new ItemNotFoundException("Inventory id = " + id + " not found"));

		// Kiểm tra productId tồn tại qua API Gateway
		ResponseEntity<Map<String, Object>> productResponse = restTemplate.exchange(
				apiGatewayUrl + "/api/products/" + inventoryDTO.getProductId(),
				HttpMethod.GET,
				null,
				new ParameterizedTypeReference<Map<String, Object>>() {}
		);

		if (!productResponse.getStatusCode().is2xxSuccessful() || productResponse.getBody() == null) {
			throw new RuntimeException("Không thể kết nối tới product service hoặc dữ liệu rỗng");
		}

		Map<String, Object> productMap = productResponse.getBody();
		Map<String, Object> productData = (Map<String, Object>) productMap.get("data");

		if (productData == null) {
			throw new RuntimeException("Không tìm thấy sản phẩm với ID: " + inventoryDTO.getProductId());
		}

		existing.setProductId(inventoryDTO.getProductId());
		existing.setQuantity(inventoryDTO.getQuantity());
		return convertToDTO(inventoryRepository.save(existing));
	}

	@Transactional
	@Override
	public boolean delete(int id) {
		if (inventoryRepository.existsById(id)) {
			inventoryRepository.deleteById(id);
			return true;
		}
		return false;
	}
}