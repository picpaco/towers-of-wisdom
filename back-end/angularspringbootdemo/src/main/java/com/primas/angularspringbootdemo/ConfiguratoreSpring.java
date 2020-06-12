package com.primas.angularspringbootdemo;

import java.util.ArrayList;
import java.util.Objects;

import javax.annotation.PostConstruct;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.primas.angularspringbootdemo.entity.Carta;
import com.primas.angularspringbootdemo.entity.Giocatore;
import com.primas.angularspringbootdemo.entity.Mazzo;
import com.primas.angularspringbootdemo.entity.MazzoCoperto;
import com.primas.angularspringbootdemo.entity.TorriDiSaggezza;
import com.primas.angularspringbootdemo.entity.User;


@Configuration
public class ConfiguratoreSpring {

	
	private TorriDiSaggezza tow = new TorriDiSaggezza();
	private User user = new User();
	
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
	
	@Bean(name = "datiPartita")
	public TorriDiSaggezza gestisciPartita() {
		System.out.println("sono dentro gestisci partita");
		return tow;
	}
	
	@Bean(name = "utente")
	public User getUser() {
		return user;
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
