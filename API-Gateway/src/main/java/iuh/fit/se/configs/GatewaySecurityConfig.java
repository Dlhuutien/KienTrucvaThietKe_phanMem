package iuh.fit.se.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class GatewaySecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
          .csrf().disable() // tắt CSRF cho toàn bộ Gateway
          .authorizeHttpRequests(authorize -> authorize.anyRequest().permitAll()); // tạm cho phép tất cả

        return http.build();
    }
}
