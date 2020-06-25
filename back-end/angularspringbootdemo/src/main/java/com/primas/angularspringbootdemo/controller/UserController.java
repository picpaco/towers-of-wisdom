package com.primas.angularspringbootdemo.controller;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.primas.angularspringbootdemo.repository.RepositoryUser;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController implements ApplicationContextAware {

	private final RepositoryUser repositoryUser;
	private ApplicationContext context;

	public UserController(RepositoryUser repositoryUser) {
		this.repositoryUser = repositoryUser;
	}
	
//	@GetMapping("/utenti")
//	public List<User> getGiocatori() {
//		return (List<User>) repositoryUser.findAll();
//		// serve per visualizzare la leaderbord
//	}
//
//	@PostMapping("/utenti")
//	void addUser(@RequestBody User utente) {
//		repositoryUser.save(utente);
//		// quando il front-end effettua un post mi passa come parametro un utente da
//		// aggiungere al database
//	}

//	@GetMapping("/validateLogin")
//	public User validateLogin(HttpServletRequest request, HttpServletResponse response) {
//		TorriDiSaggezza tow = (TorriDiSaggezza) context.getBean("inizializzaPartita");
//		Principal principal = request.getUserPrincipal();
//		tow.setNomeGiocatore(principal.getName());
//		return new User("stefano89");
//	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {

		context = applicationContext;
	}

}
