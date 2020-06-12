package com.primas.angularspringbootdemo.controller;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.primas.angularspringbootdemo.entity.User;
import com.primas.angularspringbootdemo.repository.RepositoryUser;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController implements ApplicationContextAware {

	private final RepositoryUser repositoryUser;
	private ApplicationContext context;

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




//	@GetMapping(produces = "application/json")
//	@RequestMapping({ "/validateLogin" })
//	public User validateLogin(@RequestBody User utente) {
//		System.out.println("sono dentro validateLogin");
//		return utente;
//	}


	@RequestMapping(value = "/validateLogin", method = RequestMethod.GET)
	@ResponseBody
	public User validateLogin(HttpServletRequest request) {
		
		Principal principal = request.getUserPrincipal();
		User utente = new User();
		utente.setNomeutente(principal.getName() + "!");
		System.out.println("siamo dentro validateLogin " + principal.getName());
		return utente;
	}
	
	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {

		context = applicationContext;
	}


}
