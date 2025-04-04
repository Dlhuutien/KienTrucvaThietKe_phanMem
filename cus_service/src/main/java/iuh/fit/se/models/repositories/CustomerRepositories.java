package iuh.fit.se.models.repositiory;

import iuh.fit.se.models.dtos.CustomerDTO;
import iuh.fit.se.models.entities.Customer;
import iuh.fit.se.models.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "Customers", path = "Customers")
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Customer findByPhoneNumber(String phoneNumber);
    List<Customer> findByRole(Role role);
}
