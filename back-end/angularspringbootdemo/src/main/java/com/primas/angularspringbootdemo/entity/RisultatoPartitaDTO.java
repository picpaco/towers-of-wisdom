package com.primas.angularspringbootdemo.entity;

public class RisultatoPartitaDTO {

	private String nomeGiocatore1;
	private String nomeGiocatore2;
	private String risultato;

	public RisultatoPartitaDTO(String nomeGiocatore1, String nomeGiocatore2, String risultato) {
		assert(risultato.equals("1-0") || risultato.equals("0-1") || risultato.equals("1/2")): "Il risultato deve essere uguale a 1-0 o 0-1 o pari";

		this.nomeGiocatore1 = nomeGiocatore1;
		this.nomeGiocatore2 = nomeGiocatore2;
		this.risultato = risultato;
	}

	public String getNomeGiocatore1() {
		return nomeGiocatore1;
	}

	public String getNomeGiocatore2() {
		return nomeGiocatore2;
	}

	public String getRisultato() {
		return risultato;
	}

}
