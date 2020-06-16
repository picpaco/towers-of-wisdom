package com.primas.angularspringbootdemo.entity;

import java.util.ArrayList;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import com.primas.angularspringbootdemo.entity.TorriDiSaggezza;

public class DatiPartitaInCorso implements ApplicationContextAware {

	private ApplicationContext context;

	private TorriDiSaggezza tds;

	//private MazzoScarti mazzoScarti;
	
	
	public DatiPartitaInCorso(TorriDiSaggezza tds) {
		this.tds=tds;
	}


	public ArrayList<Carta> getManoGiocatore() {
		assert tds.getGiocatori()[0].getMano().size()>0 : "La mano del giocatore non ha nessuna carta";

		return tds.getGiocatori()[0].getMano();
	}
	
	public ArrayList<Carta> pescaMazzoCoperto() {
		assert (tds.getGiocatori()[0].getMano().size()==3): "La mano del giocatore deve avere 3 carte in mano";
		System.out.println("Mano del giocatore prima che lui peschi "+ tds.getGiocatori()[0].getMano());
		MazzoCoperto mc= tds.getMazzoCoperto();
		tds.getGiocatori()[0].getMano().add(mc.pescaCarta());
		System.out.println("Mano del giocatore dopo che lui ha pescato "+ tds.getGiocatori()[0].getMano());
		assert (tds.getGiocatori()[0].getMano().size()==4) : "La mano del giocatore ora deve essere di 4 carte dopo aver pescato dal mazzo coperto";
		return tds.getGiocatori()[0].getMano();
	}
	
	





	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		context=applicationContext;

	}

}
