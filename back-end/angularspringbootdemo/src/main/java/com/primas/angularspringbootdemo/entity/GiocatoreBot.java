package com.primas.angularspringbootdemo.entity;

import java.util.ArrayList;

public class GiocatoreBot extends Giocatore {

	public GiocatoreBot(String nome) {
		super(nome);
	}

	@Override
	public Carta decidiCartaDaGiocare(ArrayList<Carta> mano, InsiemeTorri insTorri) {
		assert (mano != null): "La mano non dovrebbe essere null";
		assert (mano.size() == 4): "La mano deve contenere 4 carte";
		
		for(int i = 0; i < mano.size(); i++) {
			if(insTorri.isGiocabile(mano.get(i))) {
				System.out.println("carta che verrà giocata: " + mano.get(i));
				return mano.get(i);
			}
		}
		return null;
	}

	@Override
	public void giocaTurnoUmano() {
	}

}
