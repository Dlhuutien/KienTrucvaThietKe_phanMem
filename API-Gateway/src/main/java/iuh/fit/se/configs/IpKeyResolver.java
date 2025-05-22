package iuh.fit.se.configs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class IpKeyResolver implements KeyResolver {
    private final Logger logger = LoggerFactory.getLogger(IpKeyResolver.class);

    @Override
    public Mono<String> resolve(ServerWebExchange exchange) {
        String ip = exchange.getRequest().getRemoteAddress().getAddress().getHostAddress();
        String path = exchange.getRequest().getPath().value();
        String method = exchange.getRequest().getMethod().name();

        logger.info("Rate limiting key for: {} {} - IP: {}", method, path, ip);

        return Mono.just(ip);
    }
}