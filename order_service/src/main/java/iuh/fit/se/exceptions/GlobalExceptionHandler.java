package iuh.fit.se.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClientException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException e) {
        logger.error("Xử lý RuntimeException: {}", e.getMessage());
        return new ResponseEntity<>("Lỗi: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(HttpServerErrorException.class)
    public ResponseEntity<String> handleHttpServerError(HttpServerErrorException e) {
        logger.error("Xử lý HttpServerErrorException: {}", e.getMessage());
        return new ResponseEntity<>("Lỗi server từ API Gateway: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(RestClientException.class)
    public ResponseEntity<String> handleRestClientException(RestClientException e) {
        logger.error("Xử lý RestClientException: {}", e.getMessage());
        return new ResponseEntity<>("Lỗi kết nối: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}