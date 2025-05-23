package iuh.fit.se.services.Impl;

import iuh.fit.se.models.entities.Product;

import iuh.fit.se.models.enums.Brand;
import iuh.fit.se.models.repositories.ProductRepository;
import iuh.fit.se.services.ChatboxService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ChatboxServiceImpl implements ChatboxService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public String processUserQuery(String userQuery) {
        if (userQuery.contains("giá từ")) {
            return handlePriceRangeQuery(userQuery);
        } else if (userQuery.contains("mới nhất") && userQuery.contains("hãng")) {
            return handleLatestProductsByBrandQuery(userQuery);
        } else if (userQuery.contains("thông tin") && userQuery.contains("sản phẩm")) {
            return handleProductDetailsQuery(userQuery);
        } else if (userQuery.contains("theo loại sản phẩm")) {
            return handleProductsByCategory(userQuery);
        } else if (userQuery.contains("tìm sản phẩm dưới")) {
            return handlePriceBelowQuery(userQuery);
        } else if (userQuery.contains("tìm sản phẩm trên")) {
            return handlePriceAboveQuery(userQuery);
        } else {
            throw new IllegalArgumentException("Câu hỏi không hợp lệ hoặc không hỗ trợ.");
        }
    }

    // Xử lý câu hỏi về khoảng giá
    private String handlePriceRangeQuery(String query) {
        BigDecimal minPrice = extractPrice(query, "từ");
        BigDecimal maxPrice = extractPrice(query, "đến");

        if (minPrice == null && maxPrice == null) {
            return "Vui lòng cung cấp khoảng giá hợp lệ.";
        }

        if (minPrice == null)
            minPrice = BigDecimal.ZERO;
        if (maxPrice == null)
            maxPrice = BigDecimal.valueOf(Long.MAX_VALUE);

        List<Product> products = productRepository.findProductsByPriceRange(minPrice, maxPrice);
        if (products.isEmpty()) {
            return "Không có sản phẩm nào trong khoảng giá này.";
        }

        StringBuilder response = new StringBuilder(
                "Các sản phẩm trong khoảng giá từ " + minPrice.divide(BigDecimal.valueOf(1_000_000)) + " triệu đến "
                        + maxPrice.divide(BigDecimal.valueOf(1_000_000)) + " triệu:\n");
        for (Product product : products) {
            response.append(product.getName()).append(" - Giá: ")
                    .append(product.getSalePrice().divide(BigDecimal.valueOf(1_000_000))).append(" triệu\n");
        }

        return response.toString();
    }

    // Xử lý câu hỏi về sản phẩm mới nhất theo hãng
    private String handleLatestProductsByBrandQuery(String query) {
        String brand = extractBrand(query);
        if (brand == null) {
            return "Vui lòng cung cấp tên hãng hợp lệ.";
        }

        List<Product> products = productRepository.findLatestProductsByBrand(Brand.valueOf(brand));
        if (products.isEmpty()) {
            return "Không có sản phẩm mới nhất của hãng " + brand + ".";
        }

        StringBuilder response = new StringBuilder("Các sản phẩm mới nhất của hãng " + brand + ":\n");
        for (Product product : products) {
            response.append(product.getName()).append(" - Giá: ")
                    .append(product.getSalePrice().divide(BigDecimal.valueOf(1_000_000))).append(" triệu\n");
        }

        return response.toString();
    }

    // Xử lý câu hỏi chi tiết sản phẩm
    private String handleProductDetailsQuery(String query) {
        Integer id = extractProductId(query);
        if (id == null) {
            return "Vui lòng cung cấp mã sản phẩm hợp lệ.";
        }

        Product product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return "Không tìm thấy sản phẩm với mã: " + id;
        }

        return String.format("Thông tin chi tiết sản phẩm %s:\n" +
                "Hãng: %s\n" +
                "Loại: %s\n" +
                "Giá bán: %.2f triệu\n",
                product.getName(),
                product.getBrand(),
                product.getCategory(),
                product.getSalePrice().divide(BigDecimal.valueOf(1_000_000)));
    }

    // Helper: Trích xuất khoảng giá
    private BigDecimal extractPrice(String query, String keyword) {
        Pattern pattern = Pattern.compile(keyword + "\\s(\\d+)");
        Matcher matcher = pattern.matcher(query);
        if (matcher.find()) {
            return new BigDecimal(matcher.group(1)) // giá trị sau keyword
                    .multiply(BigDecimal.valueOf(1_000_000)); // chuyển triệu về VND
        }
        return null;
    }

    // Helper: Trích xuất tên hãng
    private String extractBrand(String query) {
        Pattern pattern = Pattern.compile("hãng\\s([a-zA-Z0-9]+)");
        Matcher matcher = pattern.matcher(query);
        return matcher.find() ? matcher.group(1) : null;
    }

    // Helper: Trích xuất mã sản phẩm
    private Integer extractProductId(String query) {
        Pattern pattern = Pattern.compile("mã\\s(\\d+)");
        Matcher matcher = pattern.matcher(query);
        return matcher.find() ? Integer.parseInt(matcher.group(1)) : null;
    }

    // Xử lý tìm sản phẩm theo loại
    private String handleProductsByCategory(String query) {
        Pattern pattern = Pattern.compile("theo loại sản phẩm\\s(\\w+)");
        Matcher matcher = pattern.matcher(query);
        if (!matcher.find()) {
            return "Vui lòng cung cấp loại sản phẩm hợp lệ.";
        }

        String category = matcher.group(1);
        List<Product> products = productRepository.findProductsByCategory(category.toUpperCase());
        if (products.isEmpty()) {
            return "Không tìm thấy sản phẩm thuộc loại: " + category;
        }

        StringBuilder response = new StringBuilder("Các sản phẩm thuộc loại " + category + ":\n");
        for (Product p : products) {
            response.append(p.getName()).append(" - Giá: ")
                    .append(p.getSalePrice().divide(BigDecimal.valueOf(1_000_000))).append(" triệu\n");
        }

        return response.toString();
    }

    // Xử lý tìm sản phẩm dưới mức giá
    private String handlePriceBelowQuery(String query) {
        Pattern pattern = Pattern.compile("tìm sản phẩm dưới (\\d+)");
        Matcher matcher = pattern.matcher(query);
        if (!matcher.find()) {
            return "Vui lòng cung cấp mức giá hợp lệ.";
        }
        BigDecimal maxPrice = new BigDecimal(matcher.group(1)).multiply(BigDecimal.valueOf(1_000_000));
        List<Product> products = productRepository.findProductsByPriceBelow(maxPrice);
        if (products.isEmpty()) {
            return "Không có sản phẩm nào dưới " + maxPrice.divide(BigDecimal.valueOf(1_000_000)) + " triệu.";
        }
        StringBuilder response = new StringBuilder(
                "Các sản phẩm dưới " + maxPrice.divide(BigDecimal.valueOf(1_000_000)) + " triệu:\n");
        for (Product p : products) {
            response.append(p.getName()).append(" - Giá: ")
                    .append(p.getSalePrice().divide(BigDecimal.valueOf(1_000_000))).append(" triệu\n");
        }
        return response.toString();
    }

    // Xử lý tìm sản phẩm trên mức giá
    private String handlePriceAboveQuery(String query) {
        Pattern pattern = Pattern.compile("tìm sản phẩm trên (\\d+)");
        Matcher matcher = pattern.matcher(query);
        if (!matcher.find()) {
            return "Vui lòng cung cấp mức giá hợp lệ.";
        }
        BigDecimal minPrice = new BigDecimal(matcher.group(1)).multiply(BigDecimal.valueOf(1_000_000));
        List<Product> products = productRepository.findProductsByPriceAbove(minPrice);
        if (products.isEmpty()) {
            return "Không có sản phẩm nào trên " + minPrice.divide(BigDecimal.valueOf(1_000_000)) + " triệu.";
        }
        StringBuilder response = new StringBuilder(
                "Các sản phẩm trên " + minPrice.divide(BigDecimal.valueOf(1_000_000)) + " triệu:\n");
        for (Product p : products) {
            response.append(p.getName()).append(" - Giá: ")
                    .append(p.getSalePrice().divide(BigDecimal.valueOf(1_000_000))).append(" triệu\n");
        }
        return response.toString();
    }
}
