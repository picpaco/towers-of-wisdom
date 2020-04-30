package com.primas.angularspringboot.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.primas.angularspringboot.entity.Giocatore;
import com.primas.angularspringboot.repository.RepositoryGiocatore;

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
	}

	@PostMapping("/giocatori")
	void addUser(@RequestBody Giocatore giocatore) {
		repositoryGiocatore.save(giocatore);
	}
}
