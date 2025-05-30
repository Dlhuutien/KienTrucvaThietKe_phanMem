package iuh.fit.se.services;

import java.util.List;

import iuh.fit.se.models.dtos.ProviderDTO;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;

import iuh.fit.se.models.entities.Provider;

public interface ProviderService {
	List<ProviderDTO> findAll();

	@Transactional(readOnly = true)
	ProviderDTO findById(int id);

	List<ProviderDTO> findProvidersByName(String name);

	List<ProviderDTO> search(String searchTerm);

	ProviderDTO save(ProviderDTO provider);

	ProviderDTO update(int id, ProviderDTO providerDTO);

	boolean isEmailUnique(String email);

	List<String> getAllProviderNames();

	boolean isEmailUniqueForUpdate(String email, int id);

	boolean delete(int id);

	boolean isProviderInUse(int id);
}
