package com.primas.angularspringbootdemo.entity;

import java.util.ArrayList;

public class DatiPartitaInCorso {

	private Giocatore giocatore = new GiocatoreUmano("Tizio");
	private Giocatore avversario = new GiocatoreBot("Bot");
	private MazzoCoperto mazzoCoperto;
	private MazzoScarti mazzoScarti;
	
	public ArrayList<Carta> getManoGiocatore() {
		return giocatore.getMano();
	}
	
	public ArrayList<Carta> getManoAvversario() {
		return avversario.getMano();
	}
	
	public int getPunteggioParziale(Carta carta) {
		Torre t = new Torre(carta.getSimbolo());
		return t.getValoreTorre();
	}
	
	public int getPunteggioTotaleGiocatore() {
		return giocatore.getPunteggioTotale();
	}
	
	public int getPunteggioTotaleAvversario() {
		return avversario.getPunteggioTotale();
	}
	
	public MazzoCoperto getMazzoCoperto() {
		return mazzoCoperto;
	}
	
	public MazzoScarti getMazzoScarti() {
		return mazzoScarti;
	}

	@Override
	public String toString() {
		return "DatiPartitaInCorso [giocatore=" + giocatore + ", avversario=" + avversario + ", mazzoCoperto="
				+ mazzoCoperto + ", mazzoScarti=" + mazzoScarti + "]";
	}
	
}
