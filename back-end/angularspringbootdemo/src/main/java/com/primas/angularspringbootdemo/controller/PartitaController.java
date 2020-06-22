package com.primas.angularspringbootdemo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.primas.angularspringbootdemo.entity.Carta;
import com.primas.angularspringbootdemo.entity.DatiPartitaInCorso;
import com.primas.angularspringbootdemo.entity.Giocatore;
import com.primas.angularspringbootdemo.entity.GiocatoreBot;
import com.primas.angularspringbootdemo.entity.GiocatoreUmano;
import com.primas.angularspringbootdemo.entity.Partita;
import com.primas.angularspringbootdemo.entity.TorriDiSaggezza;
import com.primas.angularspringbootdemo.repository.RepositoryPartita;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PartitaController implements ApplicationContextAware {
	private final RepositoryPartita repositoryPartita;
	private ApplicationContext context;

	public PartitaController(RepositoryPartita repo) {
		this.repositoryPartita = repo;
	}

//	@GetMapping("/giocatori")
//	public List<Partita> getGiocatori() {
//		return (List<Partita>) repositoryPartita.findAll();
//		// serve per visualizzare la leaderbord
//	}
//
//	@PostMapping("/giocatori")
//	public void addUser(@RequestBody Partita partita) {
//		repositoryPartita.save(partita);
//		// quando il front-end effettua un post mi passa come parametro un giocatore da
//		// aggiungere al database
//	}

	@GetMapping("/inizia-partita")
	public ArrayList<Carta> gestisciMenu() {
		DatiPartitaInCorso dati = (DatiPartitaInCorso) context.getBean("getDatiPartita");
		return dati.inizializzaPartita();// crea i due giocatori,il mazzo coperto il mazzo scarti,distribuisce le carte
											// ai giocatori e ritorna la mano del giocatore al front end.
	}

	// deve restituire una carta
	@GetMapping("/pescaDalMazzoCoperto")
	public ArrayList<Carta> pesca() {
		DatiPartitaInCorso dati = (DatiPartitaInCorso) context.getBean("getDatiPartita");
		return dati.pescaMazzoCoperto();// resituisce la mano del giocatore assieme alla carta pescata dal mazzo coperto
	}

	@PostMapping(path = "/giocaSuTorre")
	public String cartaGiocataSuTorre(@RequestBody String carta) {
		System.out.println("\r viene giocata una carta");
		DatiPartitaInCorso datiPartita = (DatiPartitaInCorso) context.getBean("getDatiPartita");
		Carta cartaGiocata = datiPartita.cercaCartaGiocata(carta);
		datiPartita.giocaSuTorre(cartaGiocata);
		return carta;
	}

	@PostMapping(path = "/scartaCarta")
	public void cartaDaScartareDallaMano(@RequestBody String carta) {
		System.out.println("\r viene scartata la seguente carta dalla mano" + carta);
		DatiPartitaInCorso datiPartita = (DatiPartitaInCorso) context.getBean("getDatiPartita");
		Carta cartaDaScartare = datiPartita.creaCartaDaJson(carta);
		datiPartita.aggiungiCartaAlMazzoScarti(cartaDaScartare);

	}

	@PostMapping(path = "/selezionaDalMazzoScarti")
	public void selezionaCartaDalMazzoScarti(@RequestBody String carta) {
		System.out.println("\r viene pescata una carta dal mazzo scarti ed e' " + carta);
		DatiPartitaInCorso datiPartita = (DatiPartitaInCorso) context.getBean("getDatiPartita");
		datiPartita.pescaMazzoScarti(carta);
	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {

		context = applicationContext;
	}

	// aggiungiere una get con parametro giocatore che restituisce le info sul
	// singolo giocatore

}
