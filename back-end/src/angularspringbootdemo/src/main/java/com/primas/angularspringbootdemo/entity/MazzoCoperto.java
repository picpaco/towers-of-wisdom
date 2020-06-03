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
	}

	public Carta pescaCarta() {
		return getListaCarte().remove(0);
	}

}
