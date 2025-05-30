package iuh.fit.se.services.Impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private DiscountService discountService;

	@Value("${api_gateway.url}")
	private String apiGatewayUrl;

	@Autowired
	ModelMapper modelMapper;

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private PhoneRepository phoneRepository;
	@Autowired
	private ChargingCableRepository chargingCableRepository;
	@Autowired
	private PowerBankRepository powerBankRepository;
	@Autowired
	private EarphoneRepository earphoneRepository;

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
	@Cacheable(value = "products", key = "#id")
	public ProductDTO findProductDTOById(int id) {
		Product product = productRepository.findById(id)
				.orElseThrow(() -> new ItemNotFoundException("Product id = " + id + " is not found"));
		System.out.println("ID tim thay la:" + id);
		return convertToDTO(product);
	}

	@Override
	@Transactional
	@CacheEvict(value = "products", key = "#id")
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

	@Override
	public boolean canDelete(int id) {
		Product product = findProductById(id);

		try {
			ResponseEntity<Map<String, Object>> orderResponse = restTemplate.exchange(
					apiGatewayUrl + "/purchaseDetail/check-product-usage/" + id,
					org.springframework.http.HttpMethod.GET,
					null,
					new ParameterizedTypeReference<Map<String, Object>>() {
					});

			if (orderResponse.getStatusCode().is2xxSuccessful()) {
				Map<String, Object> responseBody = orderResponse.getBody();
				if (responseBody != null && responseBody.containsKey("isUsed")
						&& (Boolean) responseBody.get("isUsed")) {
					return false; // Sản phẩm đang được sử dụng trong purchaseDetail
				}
			}
		} catch (Exception e) {
			System.err.println("Không thể kiểm tra sử dụng sản phẩm trong order-service: " + e.getMessage());
		}

		// Kiểm tra thêm trong inventory-service
		try {
			ResponseEntity<Map<String, Object>> inventoryResponse = restTemplate.exchange(
					apiGatewayUrl + "/inventory/check-product-usage/" + id,
					org.springframework.http.HttpMethod.GET,
					null,
					new ParameterizedTypeReference<Map<String, Object>>() {
					});

			if (inventoryResponse.getStatusCode().is2xxSuccessful()) {
				Map<String, Object> responseBody = inventoryResponse.getBody();
				if (responseBody != null && responseBody.containsKey("isUsed")
						&& (Boolean) responseBody.get("isUsed")) {
					return false; // Sản phẩm đang được sử dụng trong inventory
				}
			}
		} catch (Exception e) {
			System.err.println("Không thể kiểm tra sử dụng sản phẩm trong inventory-service: " + e.getMessage());
		}

		return true; // Sản phẩm có thể xóa
	}
	
	  // Get all products with paging
    @Transactional(readOnly = true)
    @Override
    public Page<ProductDTO> findAllWithPaging(int pageNo, int pageSize, String sortBy, String sortDirection) {
        Sort sort = sortDirection.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        return productRepository.findAll(pageable).map(this::convertToDTO);
    }
    
    @Transactional(readOnly = true)
    @Override
    public List<ProductDTO> findByCategory(String category) {
        return productRepository.findProductByCategory(Category.valueOf(category.toUpperCase()))
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<ProductDTO> findPhoneDTOWithFilter2(List<String> ramList, List<String> romList, List<String> chipList, BigDecimal minPrice, BigDecimal maxPrice) {
        List<ProductDTO> productDTOList = productRepository.findPhoneWithFilters(ramList, romList, minPrice, maxPrice, Category.PHONE)
                .stream()
                .map(this::convertToDTO)
                .toList();
        if(chipList != null && !chipList.isEmpty()) {
            productDTOList = productDTOList.stream()
                    .filter((pDTO -> chipList.stream()
                            .anyMatch(chip -> pDTO.getChip().contains(chip))))
                    .toList();
        }
        return productDTOList;
    }

    @Override
    public List<ProductDTO> findEarphoneDTOWithFilter2(List<String> connectionTypeList, List<String> brandList,
                                                       String other, BigDecimal minPrice, BigDecimal maxPrice) {

        return  productRepository.findEarPhoneWithFilters(connectionTypeList, brandList, other, minPrice, maxPrice, Category.EARPHONE)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }
    
    @Override
    public List<ProductDTO> findChargingCableDTOWithFilter2(List<String> cableTypeList, List<String> lengthList, BigDecimal minPrice, BigDecimal maxPrice) {
        List<ProductDTO> list =  productRepository.findCableWithFilters(cableTypeList, minPrice, maxPrice, Category.CHARGING_CABLE)
                .stream()
                .map(this::convertToDTO)
                .toList();
        System.out.println(list);
        if(lengthList != null) {
            if(lengthList.contains("100") && lengthList.contains("200"))
                return list;
            else if(lengthList.contains("100"))
                return list.stream()
                        .filter(p -> p.getLength() <= 100)
                        .toList();
            else
                return list.stream()
                        .filter(p -> p.getLength() >= 100 && p.getLength() <= 200)
                        .toList();
        }
        return list;
    }

    @Transactional(readOnly = true)
    @Override
    public List<ProductDTO> findPowerBankDTOWithFilter2(
            List<String> inputList, List<String> outList, List<Integer> capacityList, int capacity,
            List<Integer> batteryGreaterList, List<Integer> batteryLessList,
            BigDecimal minPrice, BigDecimal maxPrice) {

        List<ProductDTO> list = productRepository.findPowerBankWithFilters(inputList, outList, capacityList, capacity, minPrice, maxPrice, Category.POWER_BANK)
                .stream()
                .map(this::convertToDTO)
                .toList();
        List<ProductDTO> tempList = new ArrayList<>();
        if(batteryGreaterList != null && !batteryGreaterList.isEmpty() &&
                batteryLessList != null && !batteryLessList.isEmpty()) {

            for(int i = 0; i < batteryGreaterList.size(); i++) {
                final int less = batteryLessList.get(i);
                final int greater = batteryGreaterList.get(i);
                tempList.addAll(list
                        .stream()
                        .filter(p -> p.getFastCharging() >= less && p.getFastCharging() <= greater)
                        .toList());
            }
            return tempList;
        }
        return list;
    }
  





}
