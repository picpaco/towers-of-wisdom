package com.primas.angularspringbootdemo.test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.fasterxml.jackson.databind.type.PlaceholderForType;
import com.primas.angularspringbootdemo.entity.Carta;
import com.primas.angularspringbootdemo.entity.Giocatore;
import com.primas.angularspringbootdemo.entity.GiocatoreBot;
import com.primas.angularspringbootdemo.entity.GiocatoreUmano;
import com.primas.angularspringbootdemo.entity.MazzoCoperto;
import com.primas.angularspringbootdemo.entity.MazzoScarti;
import com.primas.angularspringbootdemo.entity.Simbolo;
import com.primas.angularspringbootdemo.entity.Torre;
import com.primas.angularspringbootdemo.entity.Valore;



class testDisaggezza {

	private MazzoScarti scarti;
	private MazzoCoperto coperto;
	private Giocatore giocatorebot;
	private Giocatore umano;
	private Carta cartaA;
	private Carta cartaQ;
	private Carta cartaC;
	private Carta cartaT;
	private Carta cartaCimaA;
	private Carta cartaCimaQ;
	private Carta cartaCimaC;
	private Carta cartaCimaT;
	private Carta cartaUnoA;
	private Carta cartaUnoQ;
	private Carta cartaUnoC;
	private Carta cartaUnoT;
	private Torre torreA;
	private Torre torreQ;
	private Torre torreC;
	private Torre torreT;
	private ArrayList<Carta> mano;
	private ArrayList<Torre> insTorri;
 //   InsiemeTorri insTorri;
	
	@BeforeEach
	public void setUp() throws Exception{
		scarti = new MazzoScarti();
		coperto = new MazzoCoperto();
		giocatorebot = new GiocatoreBot();
		umano = new GiocatoreUmano();
		mano = new ArrayList<Carta>();
		insTorri = new ArrayList<Torre>();
//		giocatorebot.setMazzoScarti(scarti);
//		giocatorebot.setMazzoCoperto(coperto);
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
//		insTorri = new InsiemeTorri();
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
	void distribuzioneCarteAlPrimoGiocatore(){
		giocatorebot.distribuisciCarte(coperto);
		assertEquals(29, coperto.dimensione(), "il mazzo coperto dovrebbe contenere 29 carte");	
	}
	
	@Test 
	void distribuzioneCarteEntrambiIGiocatore(){
		giocatorebot.distribuisciCarte(coperto);
		umano.distribuisciCarte(coperto);
		assertEquals(26, coperto.dimensione(), "il mazzo coperto dovrebbe contenere 26 carte");	
	}
	
	@Test
	void pescaCarta() {
		giocatorebot.distribuisciCarte(coperto);
		assertEquals(3, giocatorebot.getMano().size(), "la mano dovrebbe avere 3 carte");
		giocatorebot.getMano().add(coperto.pescaCarta());
		assertEquals(4, giocatorebot.getMano().size(), "la mano dovrebbe avere 4 carte");
	}
	
	@Test
	void controlloCartaScartataInMano() {
		giocatorebot.distribuisciCarte(coperto);
		giocatorebot.pescaCarta(coperto, scarti);
		ArrayList<Carta> manoIniziale = giocatorebot.getMano();
		Carta scarto = giocatorebot.scartaCarta(scarti);
		assertEquals(scarti.contiene(scarto), scarto, "la carta scartata dovrebbe essere quella contenuta nel mazzo scarti");
		assertTrue(manoIniziale.contains(scarto), "la carta scartata deve essere contenuta nella mano");
	}

	@Test
	void conotrolloCartaScartata() {
		giocatorebot.distribuisciCarte(coperto);
		giocatorebot.getMano().add(cartaCimaA);
		giocatorebot.scartaCarta(scarti);
		assertEquals(1, scarti.dimensione(), "il mazzo scarti dovrebbe contenere una carta");
		assertEquals(3, giocatorebot.getMano().size(),"la mano del giocatore deve contenere 3 carte");
	}
	
//	@Test
//	void giocaCarta() {
//		giocatorebot.distribuisciCarte(coperto);
//		assertEquals(3, giocatorebot.getMano().size(), "la mano dovrebbe avere 3 carte");
//		giocatorebot.getMano().add(coperto.pescaCarta());
//		assertEquals(4, giocatorebot.getMano().size(), "la mano dovrebbe avere 4 carte");
//		giocatorebot.giocaCarta(scarti);
//		assertEquals(3, giocatorebot.getMano().size(), "la mano dovrebbe avere 3 carte dopo lo scarto");
//	}
	
//	@Test
//	void pescaDaMazzoCopertoConMAzzoScartiVuoto() {
//		giocatorebot.distribuisciCarte(coperto);
//		giocatorebot.getMano().add(coperto.pescaCarta());
//		giocatorebot.giocaCarta(scarti);
//		assertEquals(31, coperto.dimensione(), "il mazzo coperto dovrebbe contenere 31 carte");
//	}

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
		torreA.aggiornaValore(cartaA.getValore().getVal());
		torreA.aggiungiCartaInCima(cartaUnoA);
		torreA.aggiornaValore(cartaUnoA.getValore().getVal());
		torreA.aggiungiCartaInCima(cartaCimaA);
		torreA.aggiornaValore(cartaCimaA.getValore().getVal());
		assertEquals(10, torreA.getValoreTorre(), "il punteggio delle torreA dovrebbe essere 10");
	}
	
	@Test
	void controlloCalcoloDelValoreTorreQConCima() {
		torreQ.aggiungiCartaInCima(cartaQ);
		torreQ.aggiornaValore(cartaQ.getValore().getVal());
		torreQ.aggiungiCartaInCima(cartaUnoQ);
		torreQ.aggiornaValore(cartaUnoQ.getValore().getVal());
		torreQ.aggiungiCartaInCima(cartaCimaQ);
		torreQ.aggiornaValore(cartaCimaQ.getValore().getVal());
		assertEquals(12, torreQ.getValoreTorre(), "il punteggio delle torreA dovrebbe essere 12");
	}
	
	@Test
	void controlloCalcoloDelValoreTorreCConCima() {
		torreC.aggiungiCartaInCima(cartaC);
		torreC.aggiornaValore(cartaC.getValore().getVal());
		torreC.aggiungiCartaInCima(cartaUnoC);
		torreC.aggiornaValore(cartaUnoC.getValore().getVal());
		torreC.aggiungiCartaInCima(cartaCimaC);
		torreC.aggiornaValore(cartaCimaC.getValore().getVal());
		assertEquals(6, torreC.getValoreTorre(), "il punteggio delle torreA dovrebbe essere 6");
	}
	
	@Test
	void controlloCalcoloDelValoreTorreTConCima() {
		torreT.aggiungiCartaInCima(cartaT);
		torreT.aggiornaValore(cartaT.getValore().getVal());
		torreT.aggiungiCartaInCima(cartaUnoT);
		torreT.aggiornaValore(cartaUnoT.getValore().getVal());
		torreT.aggiungiCartaInCima(cartaCimaT);
		torreT.aggiornaValore(cartaCimaT.getValore().getVal());
		assertEquals(14, torreT.getValoreTorre(), "il punteggio delle torreA dovrebbe essere 14");
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
		giocatorebot.aggiungiCartaATorre(cartaUnoA);
		giocatorebot.aggiungiCartaATorre(cartaCimaA);
        giocatorebot.aggiungiCartaATorre(cartaQ);
        giocatorebot.aggiungiCartaATorre(cartaC);
        giocatorebot.aggiungiCartaATorre(cartaT);
        assertEquals(23, giocatorebot.getPunteggioTotale(), "il punteggio totale dovrebbe essere 23");
	}
	@Test
	void calcoloPunteggioTotaleConCimaQ() {
		giocatorebot.aggiungiCartaATorre(cartaA);
        giocatorebot.aggiungiCartaATorre(cartaQ);
		giocatorebot.aggiungiCartaATorre(cartaUnoQ);
		giocatorebot.aggiungiCartaATorre(cartaCimaQ);
        giocatorebot.aggiungiCartaATorre(cartaC);
        giocatorebot.aggiungiCartaATorre(cartaT);
        assertEquals(24, giocatorebot.getPunteggioTotale(), "il punteggio totale dovrebbe essere 24");
	}
	
	
	@Test
	void calcoloPunteggioTotaleConCimaC() {
		giocatorebot.aggiungiCartaATorre(cartaA);
        giocatorebot.aggiungiCartaATorre(cartaQ);
        giocatorebot.aggiungiCartaATorre(cartaC);
    	giocatorebot.aggiungiCartaATorre(cartaUnoC);
		giocatorebot.aggiungiCartaATorre(cartaCimaC);
        giocatorebot.aggiungiCartaATorre(cartaT);
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
        assertEquals(25, giocatorebot.getPunteggioTotale(), "il punteggio totale dovrebbe essere 24");
	}
	
	@Test
	void calcoloPunteggioTotaleConTutteCime() {
		giocatorebot.aggiungiCartaATorre(cartaA);
		giocatorebot.aggiungiCartaATorre(cartaUnoA);
		giocatorebot.aggiungiCartaATorre(cartaCimaA);
        giocatorebot.aggiungiCartaATorre(cartaQ);
        giocatorebot.aggiungiCartaATorre(cartaUnoQ);
		giocatorebot.aggiungiCartaATorre(cartaCimaQ);
        giocatorebot.aggiungiCartaATorre(cartaC);
        giocatorebot.aggiungiCartaATorre(cartaUnoC);
		giocatorebot.aggiungiCartaATorre(cartaCimaC);
        giocatorebot.aggiungiCartaATorre(cartaT);
		giocatorebot.aggiungiCartaATorre(cartaUnoT);
		giocatorebot.aggiungiCartaATorre(cartaCimaT);
        assertEquals(42, giocatorebot.getPunteggioTotale(), "il punteggio totale dovrebbe essere 42");
	}

}
