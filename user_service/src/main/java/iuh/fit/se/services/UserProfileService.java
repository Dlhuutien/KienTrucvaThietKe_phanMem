package iuh.fit.se.services;

import java.util.List;
import iuh.fit.se.models.dtos.UserProfileDTO;
import iuh.fit.se.models.enums.UserState;

public interface UserProfileService {
	List<UserProfileDTO> findAll();

	UserProfileDTO findById(int id);

	UserProfileDTO save(UserProfileDTO userProfileDTO);
	

	UserProfileDTO update(int id, UserProfileDTO userProfileDTO);
	
	boolean delete(int id);

	UserProfileDTO updateUserState(int id, UserState newState);
	
	List<UserProfileDTO> findByState(UserState userState);

}
