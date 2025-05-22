package iuh.fit.se.models.repositories;

import org.springframework.data.repository.CrudRepository;
import iuh.fit.se.models.entities.Phone;

public interface PhoneRedisRepository extends CrudRepository<Phone, Integer> {
}