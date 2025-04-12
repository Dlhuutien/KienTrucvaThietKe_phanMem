package iuh.fit.se.services.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import iuh.fit.se.UserServiceApplication;
import iuh.fit.se.exceptions.ItemNotFoundException;
import iuh.fit.se.models.dtos.UserProfileDTO;
import iuh.fit.se.models.enitites.UserProfile;
import iuh.fit.se.models.repositories.UserProfileRepository;
import iuh.fit.se.services.UserProfileService;

@Service
public class UserProfileServiceImpl implements UserProfileService {

	@Autowired
	UserProfileRepository userProfileRepository;

	@Autowired
	private ModelMapper modelMapper;

	private UserProfileDTO convertToDTO(UserProfile userProfile) {
		return modelMapper.map(userProfile, UserProfileDTO.class);
	}

	private UserProfile convertToEntity(UserProfileDTO userProfileDTO) {
		return modelMapper.map(userProfileDTO, UserProfile.class);
	}

	@Override
	public List<UserProfileDTO> findAll() {
		return userProfileRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	@Override
	public UserProfileDTO findById(int id) {
		UserProfile userProfile = userProfileRepository.findById(id)
				.orElseThrow(() -> new ItemNotFoundException("User id = " + id + " is not found"));
		return convertToDTO(userProfile);
	}

	@Override
	public UserProfileDTO save(UserProfileDTO userProfileDTO) {
		 userProfileDTO.setCreatedTime(LocalDateTime.now());
	        UserProfile userProfile = convertToEntity(userProfileDTO);
	        UserProfile savedUser = userProfileRepository.save(userProfile);
	        return convertToDTO(savedUser);
	}

	@Override
	public UserProfileDTO update(int id, UserProfileDTO userProfileDTO) {
		UserProfile userProfile = userProfileRepository.findById(id)
				.orElseThrow(() -> new ItemNotFoundException("User id = " + id + " is not found"));
		userProfile.setFullName(userProfileDTO.getFullName());
		userProfile.setEmail(userProfileDTO.getEmail());
		userProfile.setGender(userProfileDTO.getGender());
		userProfile.setPhoneNumber(userProfileDTO.getPhoneNumber());
		userProfile.setAddress(userProfileDTO.getAddress());
		userProfile.setUrl(userProfileDTO.getUrl());
		userProfile.setCreatedTime(LocalDateTime.now());
		UserProfile updatedUser = userProfileRepository.save(userProfile);
		return convertToDTO(updatedUser);
	}

	@Override
	public boolean delete(int id) {
		UserProfile userProfile = userProfileRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("User id = " + id + " is not found"));
        userProfileRepository.delete(userProfile);
        return true;
	}
}