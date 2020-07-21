package com.primas.angularspringbootdemo.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.primas.angularspringbootdemo.repository.RepositoryUser;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	
	//private HashMap<String,String> mappaNomi = new HashMap<>();
	private RepositoryUser repoUs;
	

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		com.primas.angularspringbootdemo.entity.User user = repoUs.getUserByUsername(username);
		//User user = user.getUsername(repoUs.getUserByUsername(username));
		
		/*for(String password: mappaNomi.values()) {
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12); // Strength set as 12
			encodedPassword = encoder.encode(password);
		}
	    System.out.println(encodedPassword);
		if (mappaNomi.containsKey(username)) {
			return new User(username, encodedPassword,
					new ArrayList<>());
		} else {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}*/
		return new User(user.getUsername(), user.getPassword(),
				new ArrayList<>());
	}
	
	
	

}