package com.primas.angularspringbootdemo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.primas.angularspringbootdemo.entity.DatiPartitaInCorso;
import com.primas.angularspringbootdemo.entity.TorriDiSaggezza;
import com.primas.angularspringbootdemo.entity.User;


@Configuration
public class ConfigurazionePartita {

	
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
	
	
	@Bean
	public TorriDiSaggezza tow() {
		System.out.println("sono dentro al metodo tow() della classe ConfigurazionePartita");
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
