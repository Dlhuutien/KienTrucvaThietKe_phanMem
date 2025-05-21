package iuh.fit.se.services.Impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import iuh.fit.se.exceptions.ItemNotFoundException;
import iuh.fit.se.models.dtos.ProviderDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import iuh.fit.se.models.entities.Provider;
import iuh.fit.se.models.repositories.ProviderRepository;
import iuh.fit.se.services.ProviderService;

@Service
public class ProviderServiceImpl implements ProviderService {
	@Autowired
	private ProviderRepository providerRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private RestTemplate restTemplate;

	@Value("${api_gateway.url}")
	private String apiGatewayUrl;

	@Transactional(readOnly = true)
	@Override
	public List<ProviderDTO> findAll() {
		return providerRepository.findAll()
				.stream()
				.map(this::convertToDTO)
				.collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	@Override
	public ProviderDTO findById(int id) {
		Provider provider = providerRepository.findById(id)
				.orElseThrow(() -> new ItemNotFoundException("Provider id = " + id + " is not found"));
		return convertToDTO(provider);
	}

	@Transactional(readOnly = true)
	@Override
	public List<ProviderDTO> search(String searchTerm) {
		return providerRepository.findProviderBySearchTerm(searchTerm)
				.stream()
				.map(this::convertToDTO)
				.collect(Collectors.toList());
	}

	private ProviderDTO convertToDTO(Provider provider) {
		return modelMapper.map(provider, ProviderDTO.class);
	}

	private Provider convertToEntity(ProviderDTO providerDTO) {
		return modelMapper.map(providerDTO, Provider.class);
	}

	@Transactional
	@Override
	public ProviderDTO save(ProviderDTO providerDTO) {
		Provider provider = convertToEntity(providerDTO);
		Provider savedProvider = providerRepository.save(provider);
		return convertToDTO(savedProvider);
	}

	@Override
	public ProviderDTO update(int id, ProviderDTO providerDTO) {
		Provider provider = providerRepository.findById(id)
				.orElseThrow(() -> new ItemNotFoundException("Provider id = " + id + " is not found"));
		provider.setName(providerDTO.getName());
		provider.setAddress(providerDTO.getAddress());
		provider.setEmail(providerDTO.getEmail());
		provider.setOrigin(providerDTO.getOrigin());
		Provider updatedProvider = providerRepository.save(provider);
		return convertToDTO(updatedProvider);
	}

	@Override
	public boolean isEmailUnique(String email) {
		return !providerRepository.existsByEmail(email);
	}

	@Override
	public boolean isEmailUniqueForUpdate(String email, int id) {
		Provider existingProvider = providerRepository.findByEmail(email);
		return existingProvider == null || existingProvider.getId() == id;
	}

	@Override
	public boolean delete(int id) {
		Provider provider = providerRepository.findById(id)
				.orElseThrow(() -> new ItemNotFoundException("Provider id = " + id + " is not found"));
		providerRepository.delete(provider);
		return true;
	}

	@Override
	public List<ProviderDTO> findProvidersByName(String name) {
		List<Provider> providers = providerRepository.findByNameContainingIgnoreCase(name);
		return providers.stream()
				.map(this::convertToDTO)
				.collect(Collectors.toList());
	}

	@Override
	public List<String> getAllProviderNames() {
		return providerRepository.findAll().stream()
				.map(Provider::getName)
				.collect(Collectors.toList());
	}

	@Override
	public boolean isProviderInUse(int id) {
		try {
			ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
					apiGatewayUrl + "/purchaseDetail/provider/" + id + "/count",
					HttpMethod.GET,
					null,
					new ParameterizedTypeReference<Map<String, Object>>() {
					});

			if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
				Long count = Long.valueOf(response.getBody().get("count").toString());
				return count > 0;
			}
			return false;
		} catch (Exception e) {
			return true;
		}
	}
}