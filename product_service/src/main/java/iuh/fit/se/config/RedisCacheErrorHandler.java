package iuh.fit.se.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.Cache;
import org.springframework.cache.annotation.CachingConfigurer;
import org.springframework.cache.interceptor.CacheErrorHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RedisCacheErrorHandler implements CachingConfigurer {

    private static final Logger logger = LoggerFactory.getLogger(RedisCacheErrorHandler.class);

    @Bean
    @Override
    public CacheErrorHandler errorHandler() {
        return new CacheErrorHandler() {
            @Override
            public void handleCacheGetError(RuntimeException exception, Cache cache, Object key) {
                logger.error("Redis Cache GET error: {}, Cache: {}, Key: {}", exception.getMessage(), cache.getName(),
                        key);
                logger.error("Error details:", exception);
            }

            @Override
            public void handleCachePutError(RuntimeException exception, Cache cache, Object key, Object value) {
                logger.error("Redis Cache PUT error: {}, Cache: {}, Key: {}", exception.getMessage(), cache.getName(),
                        key);
                logger.error("Error details:", exception);
            }

            @Override
            public void handleCacheEvictError(RuntimeException exception, Cache cache, Object key) {
                logger.error("Redis Cache EVICT error: {}, Cache: {}, Key: {}", exception.getMessage(), cache.getName(),
                        key);
                logger.error("Error details:", exception);
            }

            @Override
            public void handleCacheClearError(RuntimeException exception, Cache cache) {
                logger.error("Redis Cache CLEAR error: {}, Cache: {}", exception.getMessage(), cache.getName());
                logger.error("Error details:", exception);
            }
        };
    }
}