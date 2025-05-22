package iuh.fit.se.services.Impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import iuh.fit.se.exceptions.ItemNotFoundException;
import iuh.fit.se.models.dtos.ProductDTO;
import iuh.fit.se.models.entities.*;
import iuh.fit.se.models.enums.Category;
import iuh.fit.se.models.repositories.*;
import iuh.fit.se.services.DiscountService;
import iuh.fit.se.services.ProductService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private DiscountService discountService;

	@Autowired
	ModelMapper modelMapper;

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

	// private ProductDTO convertToDTO(Product product) {
	// ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
	//// productDTO.setDiscountedPrice(discountService.calculateDiscountedPrice(product));
	//// productDTO.setPercentDiscount(calculateDiscountedPercent(productDTO.getSalePrice(),
	// productDTO.getDiscountedPrice()));
	// return productDTO;
	// }

	private ProductDTO convertToDTO(Product product) {
		ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);

		// Tính giá giảm giá từ discountService
		productDTO.setDiscountedPrice(discountService.calculateDiscountedPrice(product));

		BigDecimal salePrice = productDTO.getSalePrice();
		BigDecimal discountedPrice = productDTO.getDiscountedPrice();
		if (salePrice != null && discountedPrice != null && salePrice.compareTo(BigDecimal.ZERO) > 0) {
			int percentDiscount = calculateDiscountedPercent(salePrice, discountedPrice);
			productDTO.setPercentDiscount(percentDiscount);
		} else {
			productDTO.setPercentDiscount(0);
		}

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
		return productRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	@Override
	public List<ProductDTO> search(String searchTerm) {
		return productRepository.findProductBySearchTerm(searchTerm).stream().map(this::convertToDTO)
				.collect(Collectors.toList());
	}

	@Transactional
	@Override
	public ProductDTO saveProductDTO(ProductDTO productDTO) {
		Product product = this.convertToEntity(productDTO);
		// product = productRepository.save(product);
		if (productDTO.getCategory() == Category.PHONE) {
			Phone phone = this.convertToPhoneEntity(productDTO);
			// phone.setId(product.getId()); // Sử dụng ID từ product
			System.out.println("Product ID: " + product.getId());
			System.out.println("Phone ID: " + phone.getId());
			phoneRepository.save(phone);
		}
		if (productDTO.getCategory() == Category.CHARGING_CABLE) {
			ChargingCable chargingCable = this.convertToChargingEntity(productDTO);
			// chargingCable.setId(product.getId());
			System.out.println("Product ID: " + product.getId());
			System.out.println("Charging_cable ID: " + chargingCable.getId());
			chargingCableRepository.save(chargingCable);
		}
		if (productDTO.getCategory() == Category.POWER_BANK) {
			PowerBank powerBank = this.convertToPowerBankEntity(productDTO);
			// powerBank.setId(product.getId());
			System.out.println("Product ID: " + product.getId());
			System.out.println("PowerBank ID: " + powerBank.getId());
			powerBankRepository.save(powerBank);
		}
		if (productDTO.getCategory() == Category.EARPHONE) {
			Earphone earphone = this.convertToEarphoneEntity(productDTO);
			// earphone.setId(product.getId());
			System.out.println("Product ID: " + product.getId());
			System.out.println("Earphone ID: " + earphone.getId());
			earphoneRepository.save(earphone);
		}
		return this.convertToDTO(product);
	}

	@Transactional
	@Override
	@CachePut(value = "products", key = "#id")
	public ProductDTO updateProductDTO(int id, ProductDTO productDTO) {
		Product product = findProductById(id);

		product.setName(productDTO.getName());
		product.setUrl(productDTO.getUrl());
		product.setBrand(productDTO.getBrand());
		product.setCategory(productDTO.getCategory());
		product.setSalePrice(productDTO.getSalePrice());
		product.setPurchasePrice(productDTO.getPurchasePrice());

		if (productDTO.getCategory() == Category.PHONE) {
			Phone phone = phoneRepository.findById(id)
					.orElseThrow(() -> new ItemNotFoundException("Phone id = " + id + " is not found"));

			phone.setChip(productDTO.getChip());
			phone.setRam(productDTO.getRam());
			phone.setRom(productDTO.getRom());
			phone.setOs(productDTO.getOs());
			phone.setScreenSize(productDTO.getScreenSize());

			phoneRepository.save(phone);
		} else if (productDTO.getCategory() == Category.CHARGING_CABLE) {
			ChargingCable chargingCable = chargingCableRepository.findById(id)
					.orElseThrow(() -> new ItemNotFoundException("Charging Cable id = " + id + " is not found"));

			chargingCable.setCableType(productDTO.getCableType());
			chargingCable.setLength(productDTO.getLength());

			chargingCableRepository.save(chargingCable);
		} else if (productDTO.getCategory() == Category.POWER_BANK) {
			PowerBank powerBank = powerBankRepository.findById(id)
					.orElseThrow(() -> new ItemNotFoundException("Power Bank id = " + id + " is not found"));

			powerBank.setCapacity(productDTO.getCapacity());
			powerBank.setInput(productDTO.getInput());
			powerBank.setOutput(productDTO.getOutput());
			powerBank.setFastCharging(productDTO.getFastCharging());

			powerBankRepository.save(powerBank);
		} else if (productDTO.getCategory() == Category.EARPHONE) {
			Earphone earphone = earphoneRepository.findById(id)
					.orElseThrow(() -> new ItemNotFoundException("Earphone id = " + id + " is not found"));

			earphone.setBatteryLife(productDTO.getBatteryLife());

			earphoneRepository.save(earphone);
		}

		product = productRepository.save(product);

		return convertToDTO(product);
	}

	@Transactional(readOnly = true)
	@Override
	// @Cacheable(value = "products", key = "#id")
	public ProductDTO findProductDTOById(int id) {
		Product product = productRepository.findById(id)
				.orElseThrow(() -> new ItemNotFoundException("Product id = " + id + " is not found"));
		System.out.println("ID tim thay la:" + id);
		return convertToDTO(product);
	}

	@Override
	@Transactional
	// @CacheEvict(value = "products", key = "#id")
	public boolean delete(int id) {
		this.findProductById(id);
		productRepository.deleteById(id);
		return true;
	}

	@Override
	@Transactional(readOnly = true)
	public Product findProductById(int id) {
		return productRepository.findById(id)
				.orElseThrow(() -> new ItemNotFoundException("Product id = " + id + " is not found"));
	}

	@Override
	public List<ProductDTO> findProductsByName(String name) {
		List<Product> products = productRepository.findByNameContainingIgnoreCase(name);
		return products.stream()
				.map(this::convertToDTO)
				.collect(Collectors.toList());
	}

	@Override
	public List<String> getAllProductNames() {
		return productRepository.findAll().stream()
				.map(Product::getName)
				.collect(Collectors.toList());
	}

	@Override
	public void updatePrice(int productId, BigDecimal purchasePrice, BigDecimal salePrice) {
		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new ItemNotFoundException("Product id = " + productId + " is not found"));

		if (purchasePrice != null) {
			product.setPurchasePrice(purchasePrice);
		}

		if (salePrice != null) {
			product.setSalePrice(salePrice);
		}

		productRepository.save(product);
	}
}
