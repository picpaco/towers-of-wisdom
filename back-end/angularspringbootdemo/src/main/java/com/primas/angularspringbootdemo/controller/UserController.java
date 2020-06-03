package com.primas.angularspringbootdemo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.primas.angularspringbootdemo.entity.User;
import com.primas.angularspringbootdemo.repository.RepositoryUser;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	
	private final RepositoryUser repositoryUser;
	

	public UserController(RepositoryUser repositoryUser) {
		this.repositoryUser = repositoryUser;
	}
	
	
	@GetMapping("/utenti")
	public List<User> getGiocatori() {
		return (List<User>) repositoryUser.findAll();
		//serve per visualizzare la leaderbord 
	}

	@PostMapping("/utenti")
	void addUser(@RequestBody User utente) {
		repositoryUser.save(utente);
		//quando il front-end effettua un post mi passa come parametro un utente da aggiungere al database
	}
	
	
	
	
	@GetMapping(produces = "application/json")
	@RequestMapping({ "/validateLogin" })
	public User validateLogin() {
		return new User("User successfully authenticated");
	}

}
