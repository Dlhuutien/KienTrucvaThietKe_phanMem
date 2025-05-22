// package iuh.fit.se.config;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.context.annotation.Primary;
// import org.springframework.data.redis.connection.RedisConnectionFactory;
// import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
// import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;

// @Configuration
// public class RedisConnectionConfig {

//     @Value("${spring.redis.host}")
//     private String redisHost;

//     @Value("${spring.redis.port}")
//     private int redisPort;

//     @Bean
//     @Primary
//     public RedisConnectionFactory redisConnectionFactory() {
//         RedisStandaloneConfiguration config = new RedisStandaloneConfiguration();
//         config.setHostName(redisHost);
//         config.setPort(redisPort);
//         return new LettuceConnectionFactory(config);
//     }
// }