package com.primas.angularspringbootdemo.entity;

import java.util.ArrayList;

import org.json.JSONObject;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import com.primas.angularspringbootdemo.entity.TorriDiSaggezza;

public class DatiPartitaInCorso implements ApplicationContextAware {

	private ApplicationContext context;

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

		System.out.println("\r Mano del giocatore prima che lui peschi dal mazzo coperto" + tds.getGiocatori()[0].getMano());
		MazzoCoperto mc = tds.getMazzoCoperto();
		tds.getGiocatori()[0].getMano().add(mc.pescaCarta());

		System.out.println("\r Mano del giocatore dopo che lui ha pescato " + tds.getGiocatori()[0].getMano());
		assert (tds.getGiocatori()[0].getMano().size() == 4) : "La mano del giocatore ora deve essere di 4 carte dopo aver pescato dal mazzo coperto";

		return tds.getGiocatori()[0].getMano();
	}


	public ArrayList<Carta> aggiungiCartaAlMazzoScarti(Carta carta){
		TorriDiSaggezza tds = (TorriDiSaggezza) context.getBean("inizializzaPartita");
		int dimensionePrimaDiScartareCarta= tds.getMazzoScarti().dimensione();

		assert (tds.getGiocatori()[0].getMano().size() == 4) : "La mano del giocatore deve essere di 4 carte";
		assert (tds.getGiocatori()[0].getMano().contains(carta)) : "La mano del giocatore deve contenere la carta da scartare";

		MazzoScarti ms = tds.getMazzoScarti();


		System.out.println("Mano del giocatore prima che lui scarti la carta" + tds.getGiocatori()[0].getMano());
		ms.aggiungiCarta(carta);
		int dimensioneDopoAverScartatoLaCarta= tds.getMazzoScarti().dimensione();

		tds.getGiocatori()[0].getMano().remove(carta);
		assert (tds.getGiocatori()[0].getMano().size() == 3) : "La mano del giocatore ora deve essere di 3 carte dopo aver scartato la carta dalla mano";
		System.out.println("Mano del giocatore dopo che lui ha scartato " + tds.getGiocatori()[0].getMano());

		assert (dimensioneDopoAverScartatoLaCarta==dimensionePrimaDiScartareCarta+1) : "Al mazzo degli scarti dovrebbe essere stata aggiunta una carta";
		assert (tds.getMazzoScarti().contiene(carta)) : "Il mazzo degli scarti dovrebbe contenere la carta scartata dev'essere corretta";
		return tds.getGiocatori()[0].getMano();

	}

	public Carta creaCartaDaJson(String cartaJson) {
		JSONObject jsonCarta = new JSONObject(cartaJson);
		Simbolo simbolo = null;
		Valore valore = null;

		switch (jsonCarta.getString("symbol")) {
		case "Quadrato":
			simbolo = Simbolo.Q;
			break;

		case "Triangolo":
			simbolo = Simbolo.T;
			break;

		case "Cerchio":
			simbolo = Simbolo.C;
			break;
		case "Ancora":
			simbolo = Simbolo.A;
			break;
		}
		switch (jsonCarta.getString("value")) {
		case "P":
			valore = Valore.CIMA;
			break;
		case "7":
			valore = Valore.SETTE;
			break;
		case "6":
			valore = Valore.SEI;
			break;
		case "5":
			valore = Valore.CINQUE;
			break;
		case "4":
			valore = Valore.QUATTRO;
			break;
		case "3":
			valore = Valore.TRE;
			break;
		case "2":
			valore = Valore.DUE;
			break;
		case "1":
			valore = Valore.UNO;
			break;

		}
		System.out.println("\r" + cartaJson + "Carta da giocare ricreata");
		return new Carta(valore, simbolo);

	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		context = applicationContext;

	}

	public ArrayList<Carta> inizializzaPartita() {
		TorriDiSaggezza tow = (TorriDiSaggezza) context.getBean("inizializzaPartita");
		// System.out.println(tow.getMazzoCoperto().getListaCarte().size());
		String nomeGiocatore = tow.getNomeGiocatore();
		String nomeAvversario = tow.getNomeAvversario();
		Giocatore[] giocatori = new Giocatore[2];
		giocatori[0] = new GiocatoreUmano();
		giocatori[1] = new GiocatoreBot();
		tow.setGiocatori(giocatori);
		tow.getGiocatori()[0].setNome(nomeGiocatore);
		tow.getGiocatori()[1].setNome(nomeAvversario);
		tow.setMazzoCoperto(new MazzoCoperto());
		tow.setMazzoScarti(new MazzoScarti());

		//		int turnoIniziale = tow.stabilisciPrimoTurno();
		//		System.out.println("inizia prima: " + giocatori[turnoIniziale]);
		//		int turnoCorrente = turnoIniziale;

		tow.getGiocatori()[0].distribuisciCarte(tow.getMazzoCoperto());
		tow.getGiocatori()[1].distribuisciCarte(tow.getMazzoCoperto());
		ArrayList<Carta> mano = tow.getGiocatori()[0].getMano();
		return mano;

	}

	public Carta cercaCartaGiocata(String carta) {

		TorriDiSaggezza tow = (TorriDiSaggezza) context.getBean("inizializzaPartita");
		assert (tow.getGiocatori()[0].getMano()
				.size() == 4) : "La mano del giocatore deve essere di 4 carte prima di essere giocata!";
		Carta cartaGiocata = creaCartaDaJson(carta);// ritorna una carta in formato oggetto java

		Carta cartaCorrispondente = null;

		for (int index = 0; index < tow.getGiocatori()[0].getMano().size(); index++) {

			if (cartaGiocata.getSimbolo().equals(tow.getGiocatori()[0].getMano().get(index).getSimbolo())
					&& cartaGiocata.getValore().equals(tow.getGiocatori()[0].getMano().get(index).getValore())) {

				cartaCorrispondente = tow.getGiocatori()[0].getMano().remove(index);
			}
		}
		assert (tow.getGiocatori()[0].getMano()
				.size() == 3) : "La mano del giocatore deve essere di 3 carte dopo aver giocato la carta! ";
		assert (cartaCorrispondente != null) : "La carta giocata non è stata trovata!";
		return cartaCorrispondente;
	}

	public Carta pescaMazzoScarti(String carta) {

		TorriDiSaggezza tow = (TorriDiSaggezza) context.getBean("inizializzaPartita");
		assert (tow.getGiocatori()[0].getMano().size() == 3) : "La mano del giocatore deve essere di 3 carte per pescare dal mazzo scarti!";
		assert (tow.getMazzoScarti().dimensione() > 0) : "Il mazzo degli scarti deve contenere almeno una carta per essere pescata!";

		Carta cartaSceltaDaPescare = creaCartaDaJson(carta);// ritorna una carta in formato oggetto java


		if(tow.getMazzoScarti().contiene(cartaSceltaDaPescare)) {
			tow.getGiocatori()[0].getMano().add(tow.getMazzoScarti().pescaCarta(cartaSceltaDaPescare));
		}
		System.out.println("\r Il mazzo Scarti è :"+ tow.getMazzoScarti());
		System.out.println("\r La mano del giocatore è composta da: "+ tow.getGiocatori()[0].getMano());
		

		assert (tow.getGiocatori()[0].getMano().size() == 4) : "Dopo aver pescato dal mazzo degli scarti la mano deve contenere una carta in più!";


		return cartaSceltaDaPescare;
	}

	public void giocaSuTorre(Carta cartaGiocata) {
		TorriDiSaggezza tow = (TorriDiSaggezza) context.getBean("inizializzaPartita");
		assert (tow.getGiocatori()[0].getMano()
				.size() == 3) : "La mano del giocatore deve aver già rimosso dalla sua mano la carta da giocare!";
		tow.getGiocatori()[0].aggiungiCartaATorre(cartaGiocata);
		System.out.println("\r Mano del giocatore: " + tow.getGiocatori()[0].getMano());
		System.out.println("\r InsiemeDiTorri: " + tow.getGiocatori()[0].getInsTorri2());
	}



}
