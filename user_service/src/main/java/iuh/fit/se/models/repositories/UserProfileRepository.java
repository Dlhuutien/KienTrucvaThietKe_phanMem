package iuh.fit.se.models.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import iuh.fit.se.models.enitites.UserProfile;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserProfileRepository extends JpaRepository<UserProfile, Integer>{
    Optional<UserProfile> findByEmail(String email);

    // Thêm phương thức tìm người dùng theo trạng thái
    List<UserProfile> findByUserState(UserState userState);
}
