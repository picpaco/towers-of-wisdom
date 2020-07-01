package com.primas.angularspringbootdemo.controller;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.primas.angularspringbootdemo.entity.Carta;
import com.primas.angularspringbootdemo.entity.DatiPartitaInCorso;
import com.primas.angularspringbootdemo.entity.LeaderboardEntry;
import com.primas.angularspringbootdemo.repository.ClassificaRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PartitaController implements ApplicationContextAware {

	@Autowired
	private ClassificaRepository repositoryClassifica;
	private ApplicationContext context;
	private DatiPartitaInCorso datiPartita;

	// public PartitaController(RepositoryPartita repo) {
	// this.repositoryPartita = repo;
	// }

	public PartitaController() {

	}

	@GetMapping("/classifica")
	public List<LeaderboardEntry> getClassifica() {
		// List<LeaderboardEntry> risultatoMockDatiPartita = new ArrayList<>();
		//
		// LeaderboardEntry maurizio = new LeaderboardEntry("Maurizio", 13, 7);
		// LeaderboardEntry gennara = new LeaderboardEntry("Gennara", 4, 2);
		// LeaderboardEntry john = new LeaderboardEntry("John", 17, 0);
		// LeaderboardEntry marco = new LeaderboardEntry("Marco", 1, 1);
		// LeaderboardEntry antonio = new LeaderboardEntry("Antonio", 15, 9);
		//
		// risultatoMockDatiPartita.add(maurizio);
		// risultatoMockDatiPartita.add(gennara);
		// risultatoMockDatiPartita.add(john);
		// risultatoMockDatiPartita.add(marco);
		// risultatoMockDatiPartita.add(antonio);

		// System.out.println("risultato: "+risultatoMockDatiPartita);
		// return risultatoMockDatiPartita;

		return (List<LeaderboardEntry>) repositoryClassifica.findAll();
	}

	// @GetMapping("/giocatori")
	// public List<Partita> getGiocatori() {
	//// return (List<Partita>) repositoryPartita.findAll();
	// return new ArrayList<Partita>();
	// //serve per visualizzare la leaderbord
	// }

	// @PostMapping("/giocatori")
	// public void addUser(@RequestBody Partita partita) {
	// repositoryPartita.save(partita);
	// quando il front-end effettua un post mi passa come parametro un giocatore da
	// aggiungere al database

	@GetMapping("/partitaConBot")
	public DatiPartitaInCorso gestisciMossaGiocatore() {
		datiPartita = (DatiPartitaInCorso) context.getBean("getDatiPartita");
		datiPartita.inizializzaPartita();
		return datiPartita;
	}

	@GetMapping("/giocaBot")
	public DatiPartitaInCorso giocaBot() {
		datiPartita.giocaBot();

		return datiPartita;
	}

	@GetMapping("/pescaDalMazzoCopertoUmano")
	public Carta pescaUmano() {
		System.out.println("\r Giocatore pesca dal mazzo coperto!");
		Carta cartaPescata = datiPartita.pescaMazzoCoperto();
		return cartaPescata;
	}

	@PostMapping(path = "/giocaSuTorre")
	public String cartaGiocataSuTorre(@RequestBody String carta) {
		System.out.println("\r Il giocatore ha giocato una carta!");
		Carta cartaGiocata = datiPartita.creaCartaDaJson(carta);
		datiPartita.giocatoreGiocaSuTorre(cartaGiocata);
		return carta;
	}

	@PostMapping(path = "/scartaCarta")
	public void cartaDaScartareDallaMano(@RequestBody String carta) {
		System.out.println("\r Viene scartata la seguente carta dalla mano del giocatore" + carta);
		Carta cartaDaScartare = datiPartita.creaCartaDaJson(carta);
		datiPartita.aggiungiCartaAlMazzoScarti(cartaDaScartare);

	}

	@PostMapping(path = "/selezionaDalMazzoScarti")
	public void selezionaCartaDalMazzoScarti(@RequestBody String carta) {
		System.out.println("\r viene pescata una carta dal mazzo scarti dal giocatore ed e'" + carta);
		Carta cartaDaPescare = datiPartita.creaCartaDaJson(carta);
		datiPartita.pescaMazzoScarti(cartaDaPescare);
	}

	@PostMapping(path = "/finePartita")
	public void finePartita(@RequestBody String finePartita) {
		System.out.println("\r ----é terminata la partita -----" + finePartita);

		JSONObject oggettoDTO = new JSONObject(finePartita);
		String nomePrimoGiocatore = oggettoDTO.getString("giocatore");
		String nomeSecondoGiocatore = oggettoDTO.getString("avversario");
		String risultato = oggettoDTO.getString("risultato");
		
		
		if(!risultato.equals("1/2")) {
			datiPartita.salvaRisultatiPartita(nomePrimoGiocatore, risultato.substring(0, 1));
			datiPartita.salvaRisultatiPartita(nomeSecondoGiocatore, risultato.substring(2));
		}else {
			datiPartita.salvaRisultatiPartita(nomePrimoGiocatore, risultato);
			datiPartita.salvaRisultatiPartita(nomeSecondoGiocatore, risultato);
		}
		
		


	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {

		context = applicationContext;
	}

	// aggiungiere una get con parametro giocatore che restituisce le info sul
	// singolo giocatore

}
