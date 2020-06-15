package com.primas.angularspringbootdemo.controller;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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

import com.primas.angularspringbootdemo.entity.Giocatore;
import com.primas.angularspringbootdemo.entity.GiocatoreBot;
import com.primas.angularspringbootdemo.entity.GiocatoreUmano;
import com.primas.angularspringbootdemo.entity.TorriDiSaggezza;
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
	public User validateLogin(HttpServletRequest request, HttpServletResponse response) {
		TorriDiSaggezza tow = (TorriDiSaggezza) context.getBean("datiPartita");
		//inizializzaPartita(tow);
		Principal principal = request.getUserPrincipal();
		User utente = new User();
		utente.setNomeutente(principal.getName() + "!");
		System.out.println("siamo dentro validateLogin " + principal.getName());
		//response.addHeader("Access-Control-Allow-Origin", "http://localhost:4200");

		return utente;
	}
	
//	private void inizializzaPartita(TorriDiSaggezza tow) {
//		Giocatore[] giocatori = new Giocatore[2];
//		giocatori[0] = new GiocatoreUmano();
//		giocatori[1] = new GiocatoreBot();
//		tow.setGiocatori(giocatori);
//		tow.getGiocatori()[0].setNome("Giovanni");
//		tow.getGiocatori()[1].setNome("STUPID BOT");
//		
//		int turnoIniziale = tow.stabilisciPrimoTurno();
//		System.out.println("inizia prima: " + giocatori[turnoIniziale]);
//		int turnoCorrente = turnoIniziale;
//
//		giocatori[0].distribuisciCarte(tow.getMazzoCoperto());
//		giocatori[1].distribuisciCarte(tow.getMazzoCoperto());	
//	}



	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {

		context = applicationContext;
	}

}
