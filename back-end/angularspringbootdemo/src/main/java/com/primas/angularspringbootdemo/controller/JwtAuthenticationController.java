package com.primas.angularspringbootdemo.controller;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.primas.angularspringbootdemo.config.JwtTokenUtil;
import com.primas.angularspringbootdemo.model.JwtRequest;
import com.primas.angularspringbootdemo.model.JwtResponse;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserDetailsService jwtInMemoryUserDetailsService;

	@PostMapping("/authenticate")
	public ResponseEntity<?> generateAuthenticationToken(@RequestBody JwtRequest authenticationRequest)
			throws Exception {
		
		//Parte di autenticazione
		System.out.println("  "+authenticationRequest.getUsername() + " " + authenticationRequest.getPassword());
		Authentication aUt = authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
		
		//Parte di generazione del token
		//TODO costruire un oggetto user details usando l'oggetto authentication
		final UserDetails userDetails = jwtInMemoryUserDetailsService
		.loadUserByUsername(authenticationRequest.getUsername());
				
				
		final String token = jwtTokenUtil.generateToken(userDetails);
		System.out.println("\r Token generato dal controller: " + token);
		return ResponseEntity.ok(new JwtResponse(token));
	}

	private Authentication authenticate(String username, String password) throws Exception {
		Objects.requireNonNull(username);
		Objects.requireNonNull(password);
		//TODO fare gli stessi controlli formali del front-end
		try {
			Authentication aUt = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
			return aUt;
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
}
