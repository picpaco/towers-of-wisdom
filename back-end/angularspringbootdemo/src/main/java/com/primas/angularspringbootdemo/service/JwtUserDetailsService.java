package com.primas.angularspringbootdemo.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.primas.angularspringbootdemo.dao.UserDao;
import com.primas.angularspringbootdemo.entity.DAOUser;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	

@Autowired
private UserDao userDao;

@Autowired
private PasswordEncoder bcryptEncoder;

@Override
public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	DAOUser user = userDao.findByUsername(username);
	if (user == null) {
		throw new UsernameNotFoundException("User not found with username: " + username);
	}
	return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
			new ArrayList<>());
}

public DAOUser save(DAOUser user) {
	DAOUser newUser = new DAOUser();
	newUser.setUsername(user.getUsername());
	newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
	newUser.setEmail(user.getEmail());
	return userDao.save(newUser);
}
}





























/*public class JwtUserDetailsService implements UserDetailsService {
	
	//private HashMap<String,String> mappaNomi = new HashMap<>();
	@Autowired
	private RepositoryUser repoUs;
	

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Optional<com.primas.angularspringbootdemo.entity.User> user = repoUs.findById(username);
		//User user = user.getUsername(repoUs.getUserByUsername(username));
		
		for(String password: mappaNomi.values()) {
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12); // Strength set as 12
			encodedPassword = encoder.encode(password);
		}
	    System.out.println(encodedPassword);
		if (mappaNomi.containsKey(username)) {
			return new User(username, encodedPassword,
					new ArrayList<>());
		} else {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		/*com.primas.angularspringbootdemo.entity.User existentUser = user.get(); 
		return new MyUserDetails(existentUser);
	}
	
	
	

}*/