package com.primas.angularspringbootdemo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.primas.angularspringbootdemo.entity.Carta;
import com.primas.angularspringbootdemo.entity.DatiPartitaInCorso;
import com.primas.angularspringbootdemo.entity.LeaderboardEntry;
import com.primas.angularspringbootdemo.entity.TorriDiSaggezza;
import com.primas.angularspringbootdemo.repository.ClassificaRepository;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PartitaController implements ApplicationContextAware {
	
	@Autowired
	private ClassificaRepository repositoryClassifica;
	private ApplicationContext context;

	
//	public PartitaController(RepositoryPartita repo) {
//		this.repositoryPartita = repo;
//	}
	
	public  PartitaController() {
	
	}

	
	
	@GetMapping("/classifica")
	public List<LeaderboardEntry> getClassifica() {
//		List<LeaderboardEntry> risultatoMockDatiPartita = new ArrayList<>();
//		
//		LeaderboardEntry maurizio = new LeaderboardEntry("Maurizio", 13, 7);
//		LeaderboardEntry gennara = new LeaderboardEntry("Gennara", 4, 2);
//		LeaderboardEntry john = new LeaderboardEntry("John", 17, 0);
//		LeaderboardEntry marco = new LeaderboardEntry("Marco", 1, 1);
//		LeaderboardEntry antonio = new LeaderboardEntry("Antonio", 15, 9);
//		
//		risultatoMockDatiPartita.add(maurizio);
//		risultatoMockDatiPartita.add(gennara);
//		risultatoMockDatiPartita.add(john);
//		risultatoMockDatiPartita.add(marco);
//		risultatoMockDatiPartita.add(antonio);
		
//		System.out.println("risultato: "+risultatoMockDatiPartita);
//		return risultatoMockDatiPartita;
		
		 return (List<LeaderboardEntry>) repositoryClassifica.findAll();
	}
	
//	@GetMapping(path = {"/{id}"})
//	public ResponseEntity<LeaderboardEntry> findById(@PathVariable long id){
//	  return repositoryClassifica.findById(id)
//	          .map(record -> ResponseEntity.ok().body(record))
//	          .orElse(ResponseEntity.notFound().build());
//	}
	
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
		TorriDiSaggezza tow = (TorriDiSaggezza) context.getBean("tow");
		if(tow.getMazzoCoperto().isVuoto()) {
			//TODO: per ogni giocatoreUmano salvare(insert) o aggiornare(update) una riga della tabella "leaderboard"
			//serve: nome, vincitore(aggiorna partiteGiocate e partiteVinte), se perdente aggiorna solo partite giocate
			//se il nome non esiste inserire dati
			
			repositoryClassifica.save(new LeaderboardEntry("Maurizio", 1, 1));
			
		cartaPescata.setUltima(true);
		}	
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
