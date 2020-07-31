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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;



import com.primas.angularspringbootdemo.config.JwtTokenUtil;
import com.primas.angularspringbootdemo.entity.DAOUser;
import com.primas.angularspringbootdemo.model.JwtRequest;
import com.primas.angularspringbootdemo.model.JwtResponse;
import com.primas.angularspringbootdemo.repository.RepositoryUser;
import com.primas.angularspringbootdemo.service.JwtUserDetailsService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class JwtAuthenticationController {

	@Autowired
	private RepositoryUser repositoryUser;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;
	
	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
		
		System.out.println("Sono nel metodo authenticate");
		System.out.println("l'authentication request contiene: " + authenticationRequest.getUsername() + " " + authenticationRequest.getPassword());

		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

		final UserDetails userDetails = userDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());

		final String token = jwtTokenUtil.generateToken(userDetails);
		System.out.println("nel token c'è: " + token);

		return ResponseEntity.ok(new JwtResponse(token));
	}
	
	
	@PostMapping("/register")
	public ResponseEntity<?> save(@RequestBody DAOUser user) throws Exception {
		System.out.println("Il contenuto di Utente è: " + user.toString());
		return ResponseEntity.ok(userDetailsService.save(user));
	}
	
	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}


}


//vecchio authenticate
	/*@PostMapping("/authenticate")
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
	}*/

//authenticate 2.0
/*private Authentication authenticate(String username, String password) throws Exception {
System.out.println("lo username e la password sono: "+ username + " " + password);
Objects.requireNonNull(username);
Objects.requireNonNull(password);
Authentication aUt = null;
//TODO fare gli stessi controlli formali del front-end
String strongReGex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,15}";
if(username.length()>8 || username.length()<15) {
	if(password.matches(strongReGex)) {
		try {
			aUt = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
			
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
	
}
return aUt;
}*/