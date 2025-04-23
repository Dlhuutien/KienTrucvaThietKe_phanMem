package iuh.fit.se.models.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import iuh.fit.se.models.entities.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, Integer>{
    Optional<Inventory> findByProductId(int productId);
}
