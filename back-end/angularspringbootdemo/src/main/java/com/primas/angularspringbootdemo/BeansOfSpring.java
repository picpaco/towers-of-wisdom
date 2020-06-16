package com.primas.angularspringbootdemo;

import java.util.ArrayList;
import java.util.Objects;

import javax.annotation.PostConstruct;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.primas.angularspringbootdemo.entity.Carta;
import com.primas.angularspringbootdemo.entity.DatiPartitaInCorso;
import com.primas.angularspringbootdemo.entity.Giocatore;
import com.primas.angularspringbootdemo.entity.GiocatoreBot;
import com.primas.angularspringbootdemo.entity.GiocatoreUmano;
import com.primas.angularspringbootdemo.entity.Mazzo;
import com.primas.angularspringbootdemo.entity.MazzoCoperto;
import com.primas.angularspringbootdemo.entity.TorriDiSaggezza;
import com.primas.angularspringbootdemo.entity.User;


@Configuration
public class BeansOfSpring {

	
	private TorriDiSaggezza tow = new TorriDiSaggezza();
	private User user = new User();
	private DatiPartitaInCorso dati= new DatiPartitaInCorso();
	
//	MazzoCoperto coperto = new MazzoCoperto();
//	ArrayList<Carta> manoGiocatore = tow.getGiocatore().distribuisciCarte(coperto);
//	
	
//	Giocatore player = new GiocatoreUmano("Ugo");
//	Mazzo coperto = new MazzoCoperto();
//	
//	
//	@Bean(name = "datiPartita")
//	public ArrayList<Carta> gestisciPartita() {
//		
//		return player.distribuisciCarte(coperto.getListaCarte());
//	}
	
	//TODO: cambiare nome Bean in "inizializzaPartita"
	@Bean
	public TorriDiSaggezza inizializzaPartita() {
		System.out.println("sono dentro al metodo inizializzaPartita della classe BeansOfSpring");

		return tow;
	}
	
	@Bean(name = "utente")
	public User getUser() {
		return user;
	}
	
	
	@Bean
	public DatiPartitaInCorso getDatiPartita() {
		return dati;
	}
	
//	@Bean(name = "manoGiocatore")
//	public ArrayList<Carta> getManoGiocatoreCorrente() {
//	//	Objects.requireNonNull(manoGiocatore);
//		return tow.getGiocatoreCorrente().getMano();
//	}
	
	
//	@Bean(name="dati")
//	public DatiPartitaInCorso getDatiPartitaInCorso() {
//		return new DatiPartitaInCorso();
//	}
	
}
