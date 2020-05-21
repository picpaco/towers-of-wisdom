package com.primas.angularspringbootdemo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.primas.angularspringbootdemo.entity.Giocatore;
import com.primas.angularspringbootdemo.repository.RepositoryGiocatore;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class GiocatoreController {
	private final RepositoryGiocatore repositoryGiocatore;

	public GiocatoreController(RepositoryGiocatore repo) {
		this.repositoryGiocatore = repo;
	}

	@GetMapping("/giocatori")
	public List<Giocatore> getGiocatori() {
		return (List<Giocatore>) repositoryGiocatore.findAll();
		//serve per visualizzare la leaderbord 
	}

	@PostMapping("/giocatori")
	void addUser(@RequestBody Giocatore giocatore) {
		repositoryGiocatore.save(giocatore);
		//quando il front-end effettua un post mi passa come parametro un giocatore da aggiungere al database
	}
	
	//aggiungiere una get con parametro giocatore che restituisce le info sul singolo giocatore
	
	
}
