package com.primas.angularspringbootdemo;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.primas.angularspringbootdemo.entity.Carta;
import com.primas.angularspringbootdemo.entity.Giocatore;
import com.primas.angularspringbootdemo.entity.GiocatoreBot;
import com.primas.angularspringbootdemo.entity.MazzoCoperto;
import com.primas.angularspringbootdemo.entity.MazzoScarti;
import com.primas.angularspringbootdemo.entity.Simbolo;
import com.primas.angularspringbootdemo.entity.Torre;
import com.primas.angularspringbootdemo.entity.Valore;


class TestDiSaggezza {

	private MazzoScarti scarti;
	private MazzoCoperto coperto;
	private Giocatore giocatorebot;
	Carta cartaA;
	Carta cartaQ;
	Carta cartaC;
	Carta cartaT;
	Carta cartaCimaA;
	Carta cartaCimaQ;
	Carta cartaCimaC;
	Carta cartaCimaT;
	Carta cartaUnoA;
	Carta cartaUnoQ;
	Carta cartaUnoC;
	Carta cartaUnoT;
	Torre torreA;
	Torre torreQ;
	Torre torreC;
	Torre torreT;

	@BeforeEach
	public void setUp() throws Exception{
		scarti = new MazzoScarti();
		coperto = new MazzoCoperto();
		giocatorebot = new GiocatoreBot("robot");
		cartaA = new Carta(Valore.QUATTRO, Simbolo.A);
		cartaQ = new Carta(Valore.CINQUE, Simbolo.Q);
		cartaC = new Carta(Valore.DUE, Simbolo.C);
		cartaT = new Carta(Valore.SEI, Simbolo.T);
		cartaUnoA = new Carta(Valore.UNO, Simbolo.A);
		cartaUnoQ = new Carta(Valore.UNO, Simbolo.Q);
		cartaUnoC = new Carta(Valore.UNO, Simbolo.C);
		cartaUnoT = new Carta(Valore.UNO, Simbolo.T);
		cartaCimaA = new Carta(Valore.CIMA, Simbolo.A);
		cartaCimaQ = new Carta(Valore.CIMA, Simbolo.Q);
		cartaCimaC = new Carta(Valore.CIMA, Simbolo.C);
		cartaCimaT = new Carta(Valore.CIMA, Simbolo.T);
		torreA = new Torre(Simbolo.A);
		torreQ = new Torre(Simbolo.Q);
		torreC = new Torre(Simbolo.C);
		torreT = new Torre(Simbolo.T);
	}

	@Test
	void carteTotali() {
		assertEquals(32, coperto.dimensione(), "il mazzo dovrebbe contenere 32 carte");
	}

	@Test
	void mazzoScopertoVuoto() {
		assertEquals(0, scarti.dimensione(), "il mazzo scarti dovrebbe essere vuoto");
	}

	@Test 
	void distribuzioneCarteAdUnGiocatore(){
		giocatorebot.distribuisciCarte(coperto);
		assertEquals(29, coperto.dimensione(), "il mazzo coperto dovrebbe contenere 29 carte");	
	}

	@Test
	void controlloNumeroCarteInMano() {
		assertEquals(0, giocatorebot.getMano().size(), "la mano dovrebbe essere vuota");
		giocatorebot.distribuisciCarte(coperto);
		assertEquals(3, giocatorebot.getMano().size(), "la mano dovrebbe avere 3 carte");
	}

	@Test
	void pescaCarta() {
		giocatorebot.distribuisciCarte(coperto);
		assertEquals(3, giocatorebot.getMano().size(), "la mano dovrebbe avere 3 carte");
		giocatorebot.getMano().add(coperto.pescaCarta());
		assertEquals(4, giocatorebot.getMano().size(), "la mano dovrebbe avere 4 carte");
	}

	@Test
	void scartaCarta() {
		giocatorebot.distribuisciCarte(coperto);
		giocatorebot.getMano().add(cartaCimaA);
		giocatorebot.scartaCarta(scarti);
	}

	@Test
	void giocaCarta() {
		giocatorebot.distribuisciCarte(coperto);
		assertEquals(3, giocatorebot.getMano().size(), "la mano dovrebbe avere 3 carte");
		giocatorebot.getMano().add(coperto.pescaCarta());
		assertEquals(4, giocatorebot.getMano().size(), "la mano dovrebbe avere 4 carte");
		giocatorebot.giocaCarta(scarti);
		assertEquals(3, giocatorebot.getMano().size(), "la mano dovrebbe avere 3 carte dopo lo scarto");
	}

	@Test
	void pescaDaMazzoCopertoConMAzzoScartiVuoto() {
		giocatorebot.distribuisciCarte(coperto);
		giocatorebot.giocaTurno(coperto, scarti);
		assertEquals(28, coperto.dimensione(), "il mazzo coperto dovrebbe contenere 28 carte");
	}

	@Test
	void cartaNonGiocabileDalMazzoScarti() {
		giocatorebot.distribuisciCarte(coperto);
		scarti.aggiungiCarta(cartaCimaT);
		giocatorebot.giocaTurno(coperto, scarti);
		assertEquals(28, coperto.dimensione(), "il mazzo dovrebbe contenere 31 carte");
	}

	@Test
	void pescaCartaGiocabileDaMazzoScarti() {
		giocatorebot.distribuisciCarte(coperto);
		scarti.aggiungiCarta(cartaA);
		giocatorebot.giocaTurno(coperto, scarti);
		assertEquals(0, scarti.dimensione(), "il mazzo scarti dovrebbe contenere 0 carte");
	}

	@Test
	void controlloCalcoloDelValoreTorreA() {
		torreA.aggiungiCartaInCima(cartaA);
		torreA.aggiornaValore(cartaA.getValore().getVal());
		assertEquals(4, torreA.getValoreTorre(), "il punteggio delle torreA dovrebbe essere 4");
	}

	@Test
	void controlloCalcoloDelValoreTorreQ() {
		torreQ.aggiungiCartaInCima(cartaQ);
		torreQ.aggiornaValore(cartaQ.getValore().getVal());
		assertEquals(5, torreQ.getValoreTorre(), "il punteggio delle torreA dovrebbe essere 5");
	}

	@Test
	void controlloCalcoloDelValoreTorreC() {
		torreC.aggiungiCartaInCima(cartaC);
		torreC.aggiornaValore(cartaC.getValore().getVal());
		assertEquals(2, torreC.getValoreTorre(), "il punteggio delle torreA dovrebbe essere 2");
	}

	@Test
	void controlloCalcoloDelValoreTorreT() {
		torreT.aggiungiCartaInCima(cartaT);
		torreT.aggiornaValore(cartaT.getValore().getVal());
		assertEquals(6, torreT.getValoreTorre(), "il punteggio delle torreA dovrebbe essere 6");
	}

	@Test
	void controlloCalcoloDelValoreTorreAConCima() {
		torreA.aggiungiCartaInCima(cartaA);
		torreA.aggiungiCartaInCima(cartaCimaA);
		torreA.aggiornaValore(cartaA.getValore().getVal());
		torreA.aggiornaValore(cartaCimaA.getValore().getVal());
		assertEquals(8, torreA.getValoreTorre(), "il punteggio delle torreA dovrebbe essere 8");
	}

	@Test
	void controlloCalcoloDelValoreTorreQConCima() {
		torreQ.aggiungiCartaInCima(cartaQ);
		torreQ.aggiungiCartaInCima(cartaCimaQ);
		torreQ.aggiornaValore(cartaQ.getValore().getVal());
		torreQ.aggiornaValore(cartaCimaQ.getValore().getVal());
		assertEquals(10, torreQ.getValoreTorre(), "il punteggio delle torreQ dovrebbe essere 1'");
	}

	@Test
	void controlloCalcoloDelValoreTorreCConCima() {
		torreC.aggiungiCartaInCima(cartaC);
		torreC.aggiungiCartaInCima(cartaCimaC);
		torreC.aggiornaValore(cartaC.getValore().getVal());
		torreC.aggiornaValore(cartaCimaC.getValore().getVal());
		assertEquals(4, torreC.getValoreTorre(), "il punteggio delle torreC dovrebbe essere 8");
	}

	@Test
	void controlloCalcoloDelValoreTorreTConCima() {
		torreT.aggiungiCartaInCima(cartaT);
		torreT.aggiungiCartaInCima(cartaCimaT);
		torreT.aggiornaValore(cartaT.getValore().getVal());
		torreT.aggiornaValore(cartaCimaT.getValore().getVal());
		assertEquals(12, torreT.getValoreTorre(), "il punteggio delle torreA dovrebbe essere 8");
	}

	@Test
	void calcoloPunteggioTotale() {
		giocatorebot.aggiungiCartaATorre(cartaA);
		giocatorebot.aggiungiCartaATorre(cartaQ);
		giocatorebot.aggiungiCartaATorre(cartaC);
		giocatorebot.aggiungiCartaATorre(cartaT);
		assertEquals(17, giocatorebot.getPunteggioTotale(), "il punteggio totale dovrebbe essere 17");
	}

	@Test
	void calcoloPunteggioTotaleConCimaA() {
		giocatorebot.aggiungiCartaATorre(cartaA);
		giocatorebot.aggiungiCartaATorre(cartaQ);
		giocatorebot.aggiungiCartaATorre(cartaC);
		giocatorebot.aggiungiCartaATorre(cartaT);
		giocatorebot.aggiungiCartaATorre(cartaUnoA);
		giocatorebot.aggiungiCartaATorre(cartaCimaA);
		assertEquals(23, giocatorebot.getPunteggioTotale(), "il punteggio totale dovrebbe essere 23");
	}

	@Test
	void calcoloPunteggioTotaleConCimaQ() {
		giocatorebot.aggiungiCartaATorre(cartaA);
		giocatorebot.aggiungiCartaATorre(cartaQ);
		giocatorebot.aggiungiCartaATorre(cartaC);
		giocatorebot.aggiungiCartaATorre(cartaT);
		giocatorebot.aggiungiCartaATorre(cartaUnoQ);
		giocatorebot.aggiungiCartaATorre(cartaCimaQ);
		assertEquals(24, giocatorebot.getPunteggioTotale(), "il punteggio totale dovrebbe essere 24");
	}

	@Test
	void calcoloPunteggioTotaleConCimaC() {
		giocatorebot.aggiungiCartaATorre(cartaA);
		giocatorebot.aggiungiCartaATorre(cartaQ);
		giocatorebot.aggiungiCartaATorre(cartaC);
		giocatorebot.aggiungiCartaATorre(cartaT);
		giocatorebot.aggiungiCartaATorre(cartaUnoC);
		giocatorebot.aggiungiCartaATorre(cartaCimaC);
		assertEquals(21, giocatorebot.getPunteggioTotale(), "il punteggio totale dovrebbe essere 21");
	}

	@Test
	void calcoloPunteggioTotaleConCimaT() {
		giocatorebot.aggiungiCartaATorre(cartaA);
		giocatorebot.aggiungiCartaATorre(cartaQ);
		giocatorebot.aggiungiCartaATorre(cartaC);
		giocatorebot.aggiungiCartaATorre(cartaT);
		giocatorebot.aggiungiCartaATorre(cartaUnoT);
		giocatorebot.aggiungiCartaATorre(cartaCimaT);
		assertEquals(25, giocatorebot.getPunteggioTotale(), "il punteggio totale dovrebbe essere 25");
	}

	@Test
	void calcoloPunteggioTotaleConTutteCime() {
		giocatorebot.aggiungiCartaATorre(cartaA);
		giocatorebot.aggiungiCartaATorre(cartaQ);
		giocatorebot.aggiungiCartaATorre(cartaC);
		giocatorebot.aggiungiCartaATorre(cartaT);
		giocatorebot.aggiungiCartaATorre(cartaUnoA);
		giocatorebot.aggiungiCartaATorre(cartaCimaA);
		giocatorebot.aggiungiCartaATorre(cartaUnoQ);
		giocatorebot.aggiungiCartaATorre(cartaCimaQ);
		giocatorebot.aggiungiCartaATorre(cartaUnoC);
		giocatorebot.aggiungiCartaATorre(cartaCimaC);
		giocatorebot.aggiungiCartaATorre(cartaUnoT);
		giocatorebot.aggiungiCartaATorre(cartaCimaT);
		assertEquals(42, giocatorebot.getPunteggioTotale(), "il punteggio totale dovrebbe essere 42");
	}

}
