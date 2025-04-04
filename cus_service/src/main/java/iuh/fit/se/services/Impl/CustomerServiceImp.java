package iuh.fit.se.services.impl;

import iuh.fit.se.exceptions.ItemNotFoundException;
import iuh.fit.se.models.dtos.ProviderDTO;
import iuh.fit.se.models.dtos.CustomertomerDTO;
import iuh.fit.se.models.entities.LoginRequest;
import iuh.fit.se.models.entities.Provider;
import iuh.fit.se.models.entities.Customertomer;
import iuh.fit.se.models.enums.Role;
import iuh.fit.se.models.enums.CustomertomerState;
import iuh.fit.se.models.repositiory.CustomertomerRepository;
import iuh.fit.se.models.services.CustomertomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Customertomerdetails.CustomertomernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomertomerServiceImpl implements CustomertomerService {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    CustomertomerRepository CustomertomerRepository;

    @Autowired
    private ModelMapper modelMapper;

    private CustomertomerDTO convertToDTO(Customertomer Customertomer) {
        return modelMapper.map(Customertomer, CustomertomerDTO.class);
    }

    private Customertomer convertToEntity(CustomertomerDTO CustomertomerDTO) {
        return modelMapper.map(CustomertomerDTO, Customertomer.class);
    }

    @Override
    public List<CustomertomerDTO> findAll() {
        return CustomertomerRepository.findByRole(Role.Customertomer)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CustomertomerDTO findById(int id) {
        Customertomer Customertomer = CustomertomerRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("Customertomer id = " + id + " is not found"));
        return convertToDTO(Customertomer);
    }

    @Override
    public CustomertomerDTO updateState(CustomertomerDTO CustomertomerDTO) {
        Customertomer Customertomer = CustomertomerRepository.findById(CustomertomerDTO.getId())
            .orElseThrow(() -> new ItemNotFoundException("Not found the Customertomer"));
        Customertomer.setCustomertomerState(CustomertomerState.BANNED);
        Customertomer updatedCustomertomer = CustomertomerRepository.save(Customertomer);
        return convertToDTO(updatedCustomertomer);
    }

    @Override
    public CustomertomerDTO updateCustomertomer(int id, CustomertomerDTO CustomertomerDTO) {
        CustomertomerDTO existingCustomertomer = findById(id);
        Customertomer existingCustomertomerDTO = convertToEntity(existingCustomertomer);
        Customertomer Customertomer = convertToEntity(CustomertomerDTO);

        Customertomer.setId(id);
        Customertomer.setFullName(CustomertomerDTO.getFullName());
        Customertomer.setGender(CustomertomerDTO.getGender());
        Customertomer.setPhoneNumber(CustomertomerDTO.getPhoneNumber());
        Customertomer.setRole(CustomertomerDTO.getRole());
        Customertomer.setUrl(CustomertomerDTO.getUrl());
        Customertomer.setCoin(CustomertomerDTO.getCoin());
        Customertomer.setCustomertomerState(CustomertomerDTO.getCustomertomerState());
        Customertomer.setEmail(CustomertomerDTO.getEmail());
        Customertomer.setPassword(CustomertomerDTO.getPassword());

        if (existingCustomertomerDTO.getCreatedTime() != null) {
            Customertomer.setCreatedTime(existingCustomertomerDTO.getCreatedTime());
        }

        Customertomer savedCustomertomer = CustomertomerRepository.save(Customertomer);
        return convertToDTO(savedCustomertomer);
    }

    @Override
    public boolean delete(int id) {
        CustomertomerRepository.deleteById(id);
        return true;
    }

    @Override
    public CustomertomerDTO save(CustomertomerDTO CustomertomerDTO) {
        CustomertomerDTO.setCreatedTime(LocalDateTime.now());
        CustomertomerDTO.setRole(Role.Customertomer);
        Customertomer Customertomer = convertToEntity(CustomertomerDTO);
        Customertomer savedCustomertomer = CustomertomerRepository.save(Customertomer);
        return convertToDTO(savedCustomertomer);
    }

    @Override
    public CustomertomerDTO save(Customertomer Customertomer) {
        Customertomer.setPassword(bCryptPasswordEncoder.encode(Customertomer.getPassword()));
        return this.convertToDTO(CustomertomerRepository.save(Customertomer));
    }

    @Override
    public boolean login(LoginRequest loginRequest) {
        System.out.println(loginRequest.getCustomertomerName());
        Customertomer Customertomer = CustomertomerRepository.findByPhoneNumber(loginRequest.getCustomertomerName());
        if(Customertomer == null) {
            throw new CustomertomernameNotFoundException("Customertomer doesn't not exist in database");
        }

        if(!bCryptPasswordEncoder.matches(loginRequest.getPassword(), Customertomer.getPassword())) {
            System.out.println(Customertomer.getPassword());
            System.out.println(loginRequest.getPassword());
            System.out.println(bCryptPasswordEncoder.encode(loginRequest.getPassword()));
            throw new CustomertomernameNotFoundException("The password is incorrect");
        }
        return  true;
    }
}
