package com.primas.angularspringbootdemo.entity;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.primas.angularspringbootdemo.repository.RepositoryUser;
 
public class UserDetailsServiceImpl implements UserDetailsService {
 
    @Autowired
    private RepositoryUser userRepository;
     
    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
         Optional<DAOUser> user = userRepository.findById(username);
         
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("Could not find user");
        }
         
		com.primas.angularspringbootdemo.entity.DAOUser existentUser = user.get(); 
        return new MyUserDetails(existentUser);
    }
 
}
