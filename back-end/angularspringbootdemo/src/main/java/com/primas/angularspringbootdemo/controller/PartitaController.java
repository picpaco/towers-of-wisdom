package com.primas.angularspringbootdemo.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.naming.factory.BeanFactory;
import org.json.JSONObject;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
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
		//TODO: cambiare nome bean in "inizializzaPartita"
		TorriDiSaggezza tow = (TorriDiSaggezza) context.getBean("inizializzaPartita");
		Giocatore[] giocatori = new Giocatore[2];
		giocatori[0] = new GiocatoreUmano();
		giocatori[1] = new GiocatoreBot();
		tow.setGiocatori(giocatori);
		tow.getGiocatori()[0].setNome("Giovanni");
		tow.getGiocatori()[1].setNome("STUPID BOT");
		
//		int turnoIniziale = tow.stabilisciPrimoTurno();
//		System.out.println("inizia prima: " + giocatori[turnoIniziale]);
//		int turnoCorrente = turnoIniziale;
		
		tow.getGiocatori()[0].distribuisciCarte(tow.getMazzoCoperto());
		tow.getGiocatori()[1].distribuisciCarte(tow.getMazzoCoperto());
	
		ArrayList<Carta> mano = tow.getGiocatori()[0].getMano();
		System.out.println("Mano del giocatore "+mano);
		return mano;
		
	}
	//deve restituire una carta 
	@GetMapping("/pescaDalMazzoCoperto")
	public ArrayList<Carta> pesca(){
		DatiPartitaInCorso dati= (DatiPartitaInCorso) context.getBean("getDatiPartita");
		return dati.pescaMazzoCoperto();
	}
	
	@PostMapping(path="/giocaSuTorre")	
	public String cartaGiocataSuTorre(@RequestBody String carta) {
		System.out.println(carta);
		DatiPartitaInCorso datiPartita=(DatiPartitaInCorso) context.getBean("getDatiPartita");
		datiPartita.creaCartaDaJson(carta);
		
		return carta;
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
