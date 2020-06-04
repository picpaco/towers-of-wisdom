package com.primas.angularspringbootdemo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.primas.angularspringbootdemo.entity.Giocatore;
import com.primas.angularspringbootdemo.entity.Partita;
import com.primas.angularspringbootdemo.repository.RepositoryPartita;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PartitaController {
	private final RepositoryPartita repositoryPartita;

	public PartitaController(RepositoryPartita repo) {
		this.repositoryPartita = repo;
	}

	@GetMapping("/giocatori")
	public List<Partita> getGiocatori() {
		return (List<Partita>) repositoryPartita.findAll();
		//serve per visualizzare la leaderbord 
	}

	@PostMapping("/giocatori")
	void addUser(@RequestBody Partita partita) {
		repositoryPartita.save(partita);
		//quando il front-end effettua un post mi passa come parametro un giocatore da aggiungere al database
	}
	
	
	
	//aggiungiere una get con parametro giocatore che restituisce le info sul singolo giocatore
	

}
