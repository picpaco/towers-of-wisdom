package com.primas.angularspringbootdemo.entity;

import java.util.ArrayList;

public class GiocatoreBot extends Giocatore {

//	public GiocatoreBot(String nome) {
//		super(nome);
//	}

	@Override
	public void decidiCartaDaGiocareSeMazzoNonVuoto(ArrayList<Carta> mano, MazzoCoperto mazzoCoperto, MazzoScarti mazzoScarti) {
		Carta c = null;
		boolean cartaTrovataInMazzoScarti = false;
		for(int i = 0; i<mazzoScarti.dimensione(); i++) {
			c = mazzoScarti.getListaCarte().get(i);
			if(isGiocabile(c)) {	
				mazzoScarti.pescaCarta(c);
				mano.add(c);
				System.out.println("carta presa da mazzo degli scarti: " + c);
				giocaCarta(mazzoScarti);
				cartaTrovataInMazzoScarti = true;
				break;
			}
		}
		if(!(cartaTrovataInMazzoScarti)) {
			mano.add(mazzoCoperto.pescaCarta());
			System.out.println("carte mano: "+mano);
			giocaCarta(mazzoScarti);
		}
		assert (mano.size() == 3 || mano.size() == 4 && mazzoCoperto.isVuoto()): "La mano deve avere 3 carte oppure 4 se il mazzo è finito";
	}

	@Override
	public Carta decidiCartaDaGiocare(ArrayList<Carta> mano) {
		assert (mano != null): "La mano non dovrebbe essere null";
		assert (mano.size() == 4): "La mano deve contenere 4 carte";

		for(int i = 0; i < mano.size(); i++) {
			if(isGiocabile(mano.get(i))) {
				System.out.println("carta che verrà giocata: " + mano.get(i));
				return mano.get(i);
			}
		}
		return null;
	}

	@Override
	public void pescaCarta(MazzoCoperto mazzoCoperto, MazzoScarti mazzoScarti) {
		assert (getMano().size()==3): "La mano prima di giocare deve avere 3 carte";

		boolean cartaTrovataInMazzoScarti = false;
		if(mazzoScarti.isVuoto()) {
			System.out.println("carte mano prima di pescare: " + getMano());
			getMano().add(mazzoCoperto.pescaCarta());
			System.out.println("carte mano dopo aver pescato: " + getMano());
		} else {
			Carta c = null;
			for(int i = 0; i<mazzoScarti.dimensione(); i++) {
				c = mazzoScarti.getListaCarte().get(i);
				if(isGiocabile(c)) {		
					mazzoScarti.pescaCarta(c);
					getMano().add(c);
					System.out.println("carta presa da mazzo degli scarti: " + c);
					cartaTrovataInMazzoScarti = true;
					break;
				}
			}
			if(!(cartaTrovataInMazzoScarti)) {
				getMano().add(mazzoCoperto.pescaCarta());
				System.out.println("carte mano: "+getMano());
			}
		}
		assert (getMano().size() == 4): "La mano deve essere di 4 carte";
	}

	@Override
	public void giocaCarta(MazzoScarti mazzoScarti) {
		assert (getMano().size()==4): "La mano prima di giocare deve avere 4 carte";

		System.out.println("torri giocatore: " + getInsTorri2());

		Carta cartaDaGiocare = decidiCartaDaGiocare(getMano());
		System.out.println("carta scelta: " + cartaDaGiocare);
		if(cartaDaGiocare == null) {
			scartaCarta(mazzoScarti);
		} else {
			aggiungiCartaATorre(cartaDaGiocare);
		}
		getMano().remove(cartaDaGiocare);

		assert (getMano().size() == 3): "La mano deve essere di 3 carte";
	}


}
