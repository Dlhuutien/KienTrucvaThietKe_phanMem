package iuh.fit.se.services;

import iuh.fit.se.entities.User;

public interface UserService {
	User findByUserName(String userName);

	void saveUser(User user);

	boolean existsByEmail(String email);

	boolean existsByUserName(String userName);
}
