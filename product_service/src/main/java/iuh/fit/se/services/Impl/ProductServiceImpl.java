package iuh.fit.se.services.Impl;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import iuh.fit.se.models.entities.*;
import iuh.fit.se.models.enums.Category;
import iuh.fit.se.models.repositories.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

//import iuh.fit.se.exceptions.ItemNotFoundException;
import iuh.fit.se.models.dtos.ProductDTO;
import iuh.fit.se.services.DiscountService;
import iuh.fit.se.services.ProductService;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private DiscountService discountService;

	@Autowired
	ModelMapper modelMapper;

//	@Autowired
//	private PurchaseDetailRepository purchaseDetailRepository;
	@Autowired
	private PhoneRepository phoneRepository;
	@Autowired
	private ChargingCableRepository chargingCableRepository;
	@Autowired
	private PowerBankRepository powerBankRepository;
	@Autowired
	private EarphoneRepository earphoneRepository;

	// write convertToEntity and convertToDTO
	private Product convertToEntity(ProductDTO productDTO) {
		Product product = modelMapper.map(productDTO, Product.class);
		return product;
	}

	private Phone convertToPhoneEntity(ProductDTO productDTO) {
		Phone phone = modelMapper.map(productDTO, Phone.class);
		System.out.println("Phone entity: " + phone);
		return phone;
	}

	private ChargingCable convertToChargingEntity(ProductDTO productDTO) {
		ChargingCable chargingCable = modelMapper.map(productDTO, ChargingCable.class);
		System.out.println("ChargingCable entity: " + chargingCable);
		return chargingCable;
	}

	private PowerBank convertToPowerBankEntity(ProductDTO productDTO) {
		PowerBank powerBank = modelMapper.map(productDTO, PowerBank.class);
		System.out.println("PowerBank entity: " + powerBank);
		return powerBank;
	}

	private Earphone convertToEarphoneEntity(ProductDTO productDTO) {
		Earphone earphone = modelMapper.map(productDTO, Earphone.class);
		System.out.println("Earphone entity: " + earphone);
		return earphone;
	}

	private ProductDTO convertToDTO(Product product) {
		ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
//        productDTO.setDiscountedPrice(discountService.calculateDiscountedPrice(product));
//        productDTO.setPercentDiscount(calculateDiscountedPercent(productDTO.getSalePrice(), productDTO.getDiscountedPrice()));
		return productDTO;
	}

	private int calculateDiscountedPercent(BigDecimal salePrice, BigDecimal discountedPrice) {
		BigDecimal discountPercent = salePrice.subtract(discountedPrice).divide(salePrice, 2, BigDecimal.ROUND_HALF_UP)
				.multiply(BigDecimal.valueOf(100));
		return discountPercent.intValue();
	}

	@Transactional(readOnly = true)
	@Override
	public List<ProductDTO> findAll() {
		return productRepository.findAll()
				.stream()
				.map(this::convertToDTO)
				.collect(Collectors.toList());
	}

    @Transactional(readOnly = true)
    @Override
    public List<ProductDTO> search(String searchTerm) {
        return productRepository.findProductBySearchTerm(searchTerm).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

}
