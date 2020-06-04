package com.primas.angularspringbootdemo.entity;


public class Partita {

	private String nomeGiocatore1;
	private String nomeGiocatore2;
	private int punteggio1;
	private int punteggio2;
	
	public Partita(String nomeGiocatore1, String nomeGiocatore2, int punteggio1, int punteggio2) {
		this.nomeGiocatore1 = nomeGiocatore1;
		this.nomeGiocatore2 = nomeGiocatore2;
		this.punteggio1 = punteggio1;
		this.punteggio2 = punteggio2;
	}

	public String getGiocatore1() {
		return nomeGiocatore1;
	}

	public String getGiocatore2() {
		return nomeGiocatore2;
	}

	public int getPunteggio1() {
		return punteggio1;
	}

	public int getPunteggio2() {
		return punteggio2;
	}

	@Override
	public String toString() {
		return "Partita [giocatore1=" + nomeGiocatore1 + ", giocatore2=" + nomeGiocatore2 + ", punteggio1=" + punteggio1
				+ ", punteggio2=" + punteggio2 + "]";
	}
	
}
