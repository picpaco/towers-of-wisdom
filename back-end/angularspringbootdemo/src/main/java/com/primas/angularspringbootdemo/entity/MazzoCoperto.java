package com.primas.angularspringbootdemo.entity;

import java.util.Collections;

public class MazzoCoperto extends Mazzo {

	public MazzoCoperto() {
		for (Simbolo s: Simbolo.values()) {
			for (Valore f: Valore.values()) {
				getListaCarte().add(new Carta(f, s));
			}
		}
		Collections.shuffle(getListaCarte());
		
		assert (getListaCarte().size() == 32): "Il mazzo deve contenere 32  carte";
	}
	
	public Carta pescaCarta() {
		assert (!getListaCarte().isEmpty()): "Il mazzo deve contenere almeno una carta";
		
		int vecchiaDimensione = getListaCarte().size();
		Carta cartaPescata = getListaCarte().remove(0);
		
		assert (getListaCarte().size() == vecchiaDimensione-1): "Il mazzo deve avere una carta in meno";
		return cartaPescata;
	}

}
