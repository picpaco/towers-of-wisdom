package com.primas.angularspringbootdemo.controller;

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

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PartitaController implements ApplicationContextAware {
	//private final RepositoryPartita repositoryPartita;
	private ApplicationContext context;

//	public PartitaController(RepositoryPartita repo) {
//		this.repositoryPartita = repo;
//	}
	
	public  PartitaController() {
		
	}

//	@GetMapping("/giocatori")
//	public List<Partita> getGiocatori() {
////		return (List<Partita>) repositoryPartita.findAll();
//		return new ArrayList<Partita>();
//		//serve per visualizzare la leaderbord 
//	}


//	@PostMapping("/giocatori")
//	public void addUser(@RequestBody Partita partita) {
//		repositoryPartita.save(partita);
		//quando il front-end effettua un post mi passa come parametro un giocatore da aggiungere al database

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

	//TODO: Cambiare l'uri in /partitaConBot e cambiare il nome del metodo in gestisciMossaGiocatore

	@GetMapping("/partitaConBot")
	public DatiPartitaInCorso gestisciMossaGiocatore() {
		DatiPartitaInCorso dati = (DatiPartitaInCorso) context.getBean("getDatiPartita");
		dati.inizializzaPartita();		
		return dati;
	}
	
	@GetMapping("/giocaBot")
	public DatiPartitaInCorso giocaBot() {
		DatiPartitaInCorso dati = (DatiPartitaInCorso) context.getBean("getDatiPartita");
		dati.giocaBot();		
		System.out.println("\r"+dati);
		return dati;
	}
	
	@GetMapping("/pescaDalMazzoCopertoUmano")
	public Carta pescaUmano() {
		System.out.println("\r Giocatore pesca dal mazzo coperto!");
		DatiPartitaInCorso dati = (DatiPartitaInCorso) context.getBean("getDatiPartita");
		Carta cartaPescata = dati.pescaMazzoCoperto();
		return cartaPescata;
	}
	
//	@GetMapping("/pescaDalMazzoCopertoBot")
//	public ArrayList<Carta> pescaBot() {
//		DatiPartitaInCorso dati = (DatiPartitaInCorso) context.getBean("getDatiPartita");
//		return dati.pescaMazzoCoperto();// resituisce la mano del giocatore assieme alla carta pescata dal mazzo coperto
//	}
	
	

	@PostMapping(path = "/giocaSuTorre")
	public String cartaGiocataSuTorre(@RequestBody String carta) {
		System.out.println("\r Il giocatore ha giocato una carta!");
		DatiPartitaInCorso datiPartita = (DatiPartitaInCorso) context.getBean("getDatiPartita");
		Carta cartaGiocata = datiPartita.creaCartaDaJson(carta);
		datiPartita.giocatoreGiocaSuTorre(cartaGiocata);
		return carta;
	}

	@PostMapping(path = "/scartaCarta")
	public void cartaDaScartareDallaMano(@RequestBody String carta) {
		System.out.println("\r viene scartata la seguente carta dalla mano del giocatore" + carta);
		DatiPartitaInCorso datiPartita = (DatiPartitaInCorso) context.getBean("getDatiPartita");
		Carta cartaDaScartare = datiPartita.creaCartaDaJson(carta);
		datiPartita.aggiungiCartaAlMazzoScarti(cartaDaScartare);

	}

	@PostMapping(path = "/selezionaDalMazzoScarti")
	public void selezionaCartaDalMazzoScarti(@RequestBody String carta) {
		System.out.println("\r viene pescata una carta dal mazzo scarti dal giocatore ed e'" + carta);
		DatiPartitaInCorso datiPartita = (DatiPartitaInCorso) context.getBean("getDatiPartita");
		Carta cartaDaPescare = datiPartita.creaCartaDaJson(carta);
		datiPartita.pescaMazzoScarti(cartaDaPescare);
	}
	
	
	

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {

		context = applicationContext;
	}

	// aggiungiere una get con parametro giocatore che restituisce le info sul
	// singolo giocatore

}
