package iuh.fit.se.services;

import iuh.fit.se.entities.Token;
import org.springframework.security.core.Authentication;

public interface TokenService {
	void saveToken(Token token);

	Token findByToken(String token);
}
