package iuh.fit.se.services;

import java.util.List;

import iuh.fit.se.models.dtos.InventoryDTO;

public interface InventoryService {
	List<InventoryDTO> findAll();

	InventoryDTO findById(int id);

	InventoryDTO save(InventoryDTO inventoryDTO);

	InventoryDTO update(int id, InventoryDTO inventoryDTO);

	boolean delete(int id);
}
