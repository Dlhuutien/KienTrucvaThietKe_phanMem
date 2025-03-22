package iuh.fit.se.services;

import java.util.List;

import iuh.fit.se.models.dtos.ProviderDTO;
import org.springframework.data.domain.Page;

import iuh.fit.se.models.entities.Provider;


public interface ProviderService {
	List<ProviderDTO> findAll();

	ProviderDTO findById(int id);

	List<ProviderDTO> search(String searchTerm);
	ProviderDTO save(ProviderDTO provider);
}
