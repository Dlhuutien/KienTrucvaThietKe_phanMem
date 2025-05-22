package iuh.fit.se.models.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import iuh.fit.se.models.entities.Payment;

// @RepositoryRestResource(collectionResourceRel = "payment", path = "payments")
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    Optional<Payment> findBySessionId(String sessionId);
}
