package com.primas.angularspringbootdemo.entity;

import java.util.ArrayList;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;

public class GiocatoreBot extends Giocatore  {

	private ApplicationContext context;
	DatiPartitaInCorso datiPartita;

//	public GiocatoreBot(String nome) {
//		super(nome);
//	}
	
	@Override
	public void decidiCartaDaGiocareSeMazzoNonVuoto(ArrayList<Carta> mano, MazzoCoperto mazzoCoperto,
			MazzoScarti mazzoScarti) {
		Carta c = null;
		boolean cartaTrovataInMazzoScarti = false;
		for (int i = 0; i < mazzoScarti.dimensione(); i++) {
			c = mazzoScarti.getListaCarte().get(i);
			if (isGiocabile(c)) {
				mazzoScarti.pescaCarta(c);
				mano.add(c);
				System.out.println("carta presa da mazzo degli scarti: " + c);
				giocaCarta(mazzoScarti);
				cartaTrovataInMazzoScarti = true;
				break;
			}
		}
		if (!(cartaTrovataInMazzoScarti)) {
			mano.add(mazzoCoperto.pescaCarta());
			System.out.println("carte mano: " + mano);
			giocaCarta(mazzoScarti);
		}
		assert (mano.size() == 3 || mano.size() == 4
				&& mazzoCoperto.isVuoto()) : "La mano deve avere 3 carte oppure 4 se il mazzo è finito";
	}

	@Override
	public Carta decidiCartaDaGiocare(ArrayList<Carta> mano) {
		assert (mano != null) : "La mano non dovrebbe essere null";
		assert (mano.size() == 4) : "La mano deve contenere 4 carte";

		for (int i = 0; i < mano.size(); i++) {
			if (isGiocabile(mano.get(i))) {
				System.out.println("\r carta che verrà giocata: " + mano.get(i));
				return mano.get(i);
			}
		}
		
		return null;
	}

	@Override
	public void pescaCarta(MazzoCoperto mazzoCoperto, MazzoScarti mazzoScarti) {
		assert (getMano().size() == 3) : "La mano prima di giocare deve avere 3 carte";

	    datiPartita=(DatiPartitaInCorso) context.getBean("getDatiPartita");
		
		Carta cartaPescata=null;
		boolean cartaTrovataInMazzoScarti = false;
		if (mazzoScarti.isVuoto()) {
			//System.out.println("\r BOT prima di pescare dal mazzo coperto: " + getMano());
			cartaPescata=mazzoCoperto.pescaCarta();
			getMano().add(cartaPescata);
			if(mazzoCoperto.isVuoto()) {
				cartaPescata.setUltima(true);
			}
			datiPartita.setIlBotHaPescatoDalMazzoCoperto(true);
			System.out.println("\r BOT ha pescato dal mazzo coperto la carta: "+cartaPescata);
			//System.out.println("\r BOT dopo aver pescato dal mazzo coperto:" + getMano());
		} else {
			Carta c = null;
			for (int i = 0; i < mazzoScarti.dimensione(); i++) {
				c = mazzoScarti.getListaCarte().get(i);
				if (isGiocabile(c)) {
					mazzoScarti.pescaCarta(c);
					getMano().add(c);
					System.out.println("\r BOT ha pescato dal mazzo scarti: " + c);
					cartaTrovataInMazzoScarti = true;
					datiPartita.setIlBotHaPescatoDalMazzoCoperto(false);
					datiPartita.setCartaPescataDaMazzoScartiBot(c);
					break;
				}
			}
			if (!(cartaTrovataInMazzoScarti)) {
				//System.out.println("\r BOT prima di pescare dal mazzo coperto: " + getMano());
				cartaPescata=mazzoCoperto.pescaCarta();
				getMano().add(cartaPescata);
				if(mazzoCoperto.isVuoto()) {
					cartaPescata.setUltima(true);
				}
				datiPartita.setIlBotHaPescatoDalMazzoCoperto(true);
				System.out.println("\r BOT ha pescato dal mazzo coperto la carta: "+cartaPescata);
				//System.out.println("\r BOT dopo aver pescato dal mazzo coperto:" + getMano());
			}
		}
		assert (getMano().size() == 4) : "La mano deve essere di 4 carte";
	}

	@Override
	public Carta giocaCarta(MazzoScarti mazzoScarti) {
		assert (getMano().size() == 4) : "La mano prima di giocare deve avere 4 carte";
		
//		System.out.println("torri giocatore: " + getInsTorri2());

		Carta cartaDaGiocare = decidiCartaDaGiocare(getMano());
		Carta cartaGiocata = null;
		

		
		if (cartaDaGiocare == null) {
			cartaGiocata = scartaCarta(mazzoScarti);
			datiPartita.setCartaAvversarioGiocataSuScarti(true);
			datiPartita.setCartaAvversarioGiocataSuTorre(false);

		} else {
			cartaGiocata = cartaDaGiocare;
			aggiungiCartaATorre(cartaDaGiocare);
			getMano().remove(cartaDaGiocare);
			datiPartita.setCartaAvversarioGiocataSuScarti(false);
			datiPartita.setCartaAvversarioGiocataSuTorre(true);
		}
		
		System.out.println("\r carta scelta: " + cartaGiocata);
		datiPartita.setCartaGiocataBot(cartaGiocata);


		
		assert (getMano().size() == 3) : "La mano deve essere di 3 carte";
		return cartaGiocata;
	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		context=applicationContext;
		
	}

}
