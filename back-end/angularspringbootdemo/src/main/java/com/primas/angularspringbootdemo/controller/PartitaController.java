package com.primas.angularspringbootdemo.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.naming.factory.BeanFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.primas.angularspringbootdemo.entity.Carta;
import com.primas.angularspringbootdemo.entity.Giocatore;
import com.primas.angularspringbootdemo.entity.GiocatoreBot;
import com.primas.angularspringbootdemo.entity.GiocatoreUmano;
import com.primas.angularspringbootdemo.entity.Partita;
import com.primas.angularspringbootdemo.entity.TorriDiSaggezza;
import com.primas.angularspringbootdemo.repository.RepositoryPartita;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PartitaController implements ApplicationContextAware{
	private final RepositoryPartita repositoryPartita;
	private ApplicationContext context;
	

	public PartitaController(RepositoryPartita repo) {
		this.repositoryPartita = repo;
	}

	@GetMapping("/giocatori")
	public List<Partita> getGiocatori() {
		return (List<Partita>) repositoryPartita.findAll();
		//serve per visualizzare la leaderbord 
	}

	@PostMapping("/giocatori")
	public void addUser(@RequestBody Partita partita) {
		repositoryPartita.save(partita);
		//quando il front-end effettua un post mi passa come parametro un giocatore da aggiungere al database
	}
	
	
	//TODO dovrebbe ricevere coem parametro 2 stringe per i nomei dei giocatori
	@GetMapping("/menu-di-gioco")
	public ArrayList<Carta> gestisciMenu() {

		TorriDiSaggezza tds = (TorriDiSaggezza) context.getBean("datiPartita");
		Giocatore[] giocatori = new Giocatore[2];
		giocatori[0] = new GiocatoreUmano();
		giocatori[1] = new GiocatoreBot();
		tds.setGiocatori(giocatori);
		tds.getGiocatori()[0].setNome("Giovanni");
		tds.getGiocatori()[1].setNome("STUPID BOT");
		
		int turnoIniziale = tds.stabilisciPrimoTurno();
		System.out.println("inizia prima: " + giocatori[turnoIniziale]);
		int turnoCorrente = turnoIniziale;

		giocatori[0].distribuisciCarte(tds.getMazzoCoperto());
		giocatori[1].distribuisciCarte(tds.getMazzoCoperto());
		
		ArrayList<Carta> mano = tds.getGiocatori()[0].getMano();
		return mano;
		
	}
	
//	@PostMapping("/nome")
//	public void inizializzaGiocatore(@RequestBody String nomeGiocatore) {
//		String nome = nomeGiocatore;
//		System.out.println("Nome giocatore inviato: " + nome);
//		
//	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		
		context = applicationContext;
	}

	//aggiungiere una get con parametro giocatore che restituisce le info sul singolo giocatore
	

}
