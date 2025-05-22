package iuh.fit.se.services.Impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class ProductServiceClient {

    private static final Logger logger = LoggerFactory.getLogger(ProductServiceClient.class);

    @Autowired
    private RestTemplate restTemplate;

    @Value("${api_gateway.url}")
    private String apiGatewayUrl;

    @Retryable(value = { Exception.class }, maxAttempts = 5, backoff = @Backoff(delay = 3000))
    public Map<String, Object> getProductById(int productId) {
        ResponseEntity<Map<String, Object>> productResponse = restTemplate.exchange(
                apiGatewayUrl + "/api/products/" + productId,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Map<String, Object>>() {
                });

        if (!productResponse.getStatusCode().is2xxSuccessful() || productResponse.getBody() == null) {
            throw new RuntimeException("Không thể kết nối tới product service hoặc dữ liệu rỗng");
        }

        Map<String, Object> productMap = productResponse.getBody();
        Map<String, Object> productData = (Map<String, Object>) productMap.get("data");

        if (productData == null) {
            throw new RuntimeException("Không tìm thấy sản phẩm với ID: " + productId);
        }

        return productData;
    }

    @Recover
    public Map<String, Object> recover(RuntimeException e, int productId) {
        throw new RuntimeException(
                "Không thể kết nối tới product service sau nhiều lần thử với productId: " + productId);
    }
}
