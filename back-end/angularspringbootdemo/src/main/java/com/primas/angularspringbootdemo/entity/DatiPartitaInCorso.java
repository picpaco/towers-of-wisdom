package com.primas.angularspringbootdemo.entity;

import java.util.ArrayList;

import org.json.JSONObject;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import com.primas.angularspringbootdemo.entity.TorriDiSaggezza;

public class DatiPartitaInCorso implements ApplicationContextAware {

	private ApplicationContext context;

	// private MazzoScarti mazzoScarti;

	public DatiPartitaInCorso() {
	}

	public ArrayList<Carta> getManoGiocatore() {
		TorriDiSaggezza tds = (TorriDiSaggezza) context.getBean("inizializzaPartita");
		assert tds.getGiocatori()[0].getMano().size() > 0 : "La mano del giocatore non ha nessuna carta";

		return tds.getGiocatori()[0].getMano();
	}

	public ArrayList<Carta> pescaMazzoCoperto() {
		TorriDiSaggezza tds = (TorriDiSaggezza) context.getBean("inizializzaPartita");
		assert (tds.getGiocatori()[0].getMano().size() == 3) : "La mano del giocatore deve avere 3 carte in mano";

		System.out.println("Mano del giocatore prima che lui peschi " + tds.getGiocatori()[0].getMano());
		MazzoCoperto mc = tds.getMazzoCoperto();
		tds.getGiocatori()[0].getMano().add(mc.pescaCarta());

		System.out.println("Mano del giocatore dopo che lui ha pescato " + tds.getGiocatori()[0].getMano());
		assert (tds.getGiocatori()[0].getMano()
				.size() == 4) : "La mano del giocatore ora deve essere di 4 carte dopo aver pescato dal mazzo coperto";

		return tds.getGiocatori()[0].getMano();
	}

	public Carta creaCartaDaJson(String cartaJson) {
		JSONObject jsonCarta = new JSONObject(cartaJson);
		Simbolo simbolo = null;
		Valore valore = null;

		switch (jsonCarta.getString("symbol")) {
		case "Quadrato":
			simbolo=Simbolo.Q;
			break;

		case "Triangolo":
			simbolo=Simbolo.T;
			break;

		case "Cerchio":
			simbolo=Simbolo.C;
			break;
		case "Ancora":
			simbolo=Simbolo.A;
			break;
		}
		switch (jsonCarta.getString("value")) {
		case "P":
			valore=Valore.CIMA;
			break;
		case "7":
			valore=Valore.SETTE;
			break;
		case "6":
			valore=Valore.SEI;
			break;
		case "5":
			valore=Valore.CINQUE;
			break;
		case "4":
			valore=Valore.QUATTRO;
			break;
		case "3":
			valore=Valore.TRE;
			break;
		case "2":
			valore=Valore.DUE;
			break;
		case "1":
			valore=Valore.UNO;
			break;

		}
		System.out.println("Carta ricreata");
		return new Carta(valore, simbolo);
	
		

	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		context = applicationContext;

	}

}
