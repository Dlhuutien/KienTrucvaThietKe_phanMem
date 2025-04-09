package iuh.fit.se.services;

import java.util.List;
import iuh.fit.se.models.dtos.UserProfileDTO;

public interface UserProfileService {
    List<UserProfileDTO> findAll();
    UserProfileDTO findById(int id);
}
