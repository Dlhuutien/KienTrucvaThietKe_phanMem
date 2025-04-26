package iuh.fit.se.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.paypal.base.rest.APIContext;
import com.stripe.Stripe;

@Configuration
public class PaymentConfig {

    @Value("${stripe.secret.key}")
    private String stripeApiKey;

    @Value("${paypal.client.id}")
    private String paypalClientId;

    @Value("${paypal.client.secret}")
    private String paypalClientSecret;

    @Value("${paypal.mode}")
    private String paypalMode;

    @Bean
    public String configureStripe() {
        Stripe.apiKey = stripeApiKey;
        return "Stripe configured successfully";
    }

    @Bean
    public APIContext paypalApiContext() {
        return new APIContext(paypalClientId, paypalClientSecret, paypalMode);
    }
}