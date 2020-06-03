package com.primas.angularspringbootdemo.entity;

import java.util.Stack;

public class Torre {

	private Stack<Carta> carte = new Stack<Carta>();
	private int valoreTotale;
	private Simbolo simbolo;

	public Torre(Simbolo s) {
		this.simbolo = s;
	}

	public void aggiungiCarta(Carta c) {
		assert c != null: "la carta deve esistere";
		carte.push(c);
	}

	public int getValoreTorre() {
		return valoreTotale;
	}

	public Simbolo getSimbolo() {
		return simbolo;
	}

	public int aggiornaValore(int valoreDaAggiungere) {
		if(guardaLaCartaInCima().getValore().equals(Valore.CIMA)) {
			valoreTotale= valoreTotale*2;
		}
		return valoreTotale += valoreDaAggiungere;
	}

	public boolean isVuota() {
		return carte.isEmpty();
	}

	public Carta guardaLaCartaInCima() {
		return carte.peek();
	}

	public Carta aggiungiCartaInCima(Carta c) {
		return carte.push(c);
	}

	@Override
	public String toString() {
		return "Torre [carte=" + carte + ", valoreTotale=" + valoreTotale + ", simbolo=" + simbolo + "]";
	}

}







