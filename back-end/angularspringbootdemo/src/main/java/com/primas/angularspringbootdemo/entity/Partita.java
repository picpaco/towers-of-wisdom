package com.primas.angularspringbootdemo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Partita {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String nomeGiocatore1;
	private String nomeGiocatore2;
	private int punteggio1;
	private int punteggio2;
	private String risultato;
	
	public Partita() {
		
	}
	
	public Partita(String nomeGiocatore1, String nomeGiocatore2) {
		this.nomeGiocatore1 = nomeGiocatore1;
		this.nomeGiocatore2 = nomeGiocatore2;
	}

	public String getGiocatore1() {
		return nomeGiocatore1;
	}

	public String getGiocatore2() {
		return nomeGiocatore2;
	}

	public String getRisultato() {
		return risultato;
	}

	public void setRisultato(String risultato) {
		assert(risultato.equals("1-0") || risultato.equals("0-1") || risultato.equals("1/2")): "Il risultato deve essere uguale a 1-0 o 0-1 o pari";
		
		this.risultato = risultato;
	}

	public void setPunteggio1(int punteggio1) {
		this.punteggio1 = punteggio1;
	}

	public void setPunteggio2(int punteggio2) {
		this.punteggio2 = punteggio2;
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
