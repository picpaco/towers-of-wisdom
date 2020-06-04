package com.primas.angularspringbootdemo.entity;

import java.util.ArrayList;

public abstract class Giocatore {  

	private String nome;
	private ArrayList<Torre> insTorri2 = new ArrayList<>();
	private ArrayList<Carta> mano = new ArrayList<>(4);


	public Giocatore(String nome) {
		this.nome = nome;
		insTorri2.add(new Torre(Simbolo.Q));
		insTorri2.add(new Torre(Simbolo.C));
		insTorri2.add(new Torre(Simbolo.T));
		insTorri2.add(new Torre(Simbolo.A));
	}

	protected ArrayList<Torre> getInsTorri2() {
		return insTorri2;
	}

	public String getNome() {
		return nome;
	}

	public ArrayList<Carta> getMano() {
		return mano;
	}

	public void setMano(ArrayList<Carta> mano) {
		this.mano = mano;
	}

	private Torre getTorre(Simbolo s) {
		for(Torre t : insTorri2) {
			if(t.getSimbolo().equals(s)) {
				return t;
			}
		}
		assert false: "Torre non valida";
		return null;
	}
	
	public boolean isGiocabile(Carta carta) {
		assert (carta!=null): "La carta non dovrebbe essere null!";

		Torre torre = getTorre(carta.getSimbolo());
		if(!(torre.isVuota())) {
			if(carta.getValore().equals(Valore.CIMA)) {
				if(torre.guardaLaCartaInCima().getValore().equals(Valore.UNO)) {
					return true;
				} else {
					return false;
				}
			}
			if(carta.getValore().getVal() < torre.guardaLaCartaInCima().getValore().getVal()) {
				return true;
			} 
		} else {
			if(!(carta.getValore().equals(Valore.CIMA))) {
				return true;
			}
		}
		return false;
	}

	public void aggiungiCartaATorre(Carta carta) { 
		assert (carta!=null):"La carta non dovrebbe essere null!";
		assert (isGiocabile(carta)): "La carta deve essere giocabile!";

		Torre vecchiaTorre = getTorre(carta.getSimbolo());
		vecchiaTorre.aggiungiCartaInCima(carta);
		System.out.println("punteggio carta: " + carta.getValore().getVal());

		aggiornaPunteggioParziale(carta);

		System.out.println("punteggio totale: " + getPunteggioTotale());
		System.out.println("carta appena aggiunta alla torre: " + vecchiaTorre.guardaLaCartaInCima());
	}

	public void aggiornaPunteggioParziale(Carta carta) {
		assert (carta != null): "La carta non deve essere null";

		Torre torreDiSimboli = getTorre(carta.getSimbolo());
		torreDiSimboli.aggiornaValore(carta.getValore().getVal());
	}
	
	public int getPunteggioTotale() {
		int somma = 0;
		for(Torre t : insTorri2) {
			somma = somma + t.getValoreTorre();
		}
		assert (somma != 0): "Il punteggio non deve essere 0";
		return somma;
	}
	
	public void giocaTurno(MazzoCoperto mazzoCoperto, MazzoScarti mazzoScarti) { 
		assert (mano.size() == 3): "La mano deve avere 3 carte";

		boolean cartaTrovataInMazzoScarti = false;
		if(mazzoScarti.isVuoto()) {
			System.out.println("carte mano prima di pescare: " + mano);
			mano.add(mazzoCoperto.pescaCarta());
			System.out.println("carte mano dopo aver pescato: " + mano);
			giocaCarta(mazzoCoperto, mazzoScarti);
			System.out.println("carte mano dopo aver giocato: " + mano);
		} else {
			Carta c = null;
			for(int i = 0; i<mazzoScarti.dimensione(); i++) {
				c = mazzoScarti.getListaCarte().get(i);
				if(isGiocabile(c)) {		
					mazzoScarti.rimuoviCarta(c);
					mano.add(c);
					System.out.println("carta presa da mazzo degli scarti: " + c);
					giocaCarta(mazzoCoperto, mazzoScarti);
					cartaTrovataInMazzoScarti = true;
					break;
				}
			}
			if(!(cartaTrovataInMazzoScarti)) {
				mano.add(mazzoCoperto.pescaCarta());
				System.out.println("carte mano: "+mano);
				giocaCarta(mazzoCoperto, mazzoScarti);
			}
			if(mazzoCoperto.isVuoto()) {
				assert (mano.size() == 4): "Se il mazzo coperto è vuoto la mano deve avere 4 carte";
			} else {
				assert (mano.size() == 3): "Se il mazzo coperto non è vuoto la mano deve avere 3 carte";
			}
		}
	}

	public ArrayList<Carta> distribuisciCarte(MazzoCoperto mazzoCoperto) {
		assert (mano.size() == 0): "La mano deve essere vuota";

		for(int i=0; i<3; i++) {
			mano.add(mazzoCoperto.pescaCarta());
		}
		System.out.println("mano dopo distribuzione carte:"+ mano + " " + "dimensione mano: "+mano.size());

		assert (mano.size() == 3): "La mano deve essere di 3 carte";
		return mano;
	}

	public void scartaCarta(MazzoCoperto mazzoCoperto, MazzoScarti mazzoScarti) { 	
		assert (mano.size() == 4): "La mano deve avere 4 carte"; 

		if(!(mazzoCoperto.isVuoto())) {
			for(int i = 0; i < mano.size(); i++) {
				if(!(isGiocabile(mano.get(i)))) {
					mazzoScarti.aggiungiCarta(mano.get(i));
					System.out.println("carta scartata: "+mano.get(i));
					mano.remove(mano.get(i));
					break;
				}
			}
		}
		assert (mano.size() == 3): "La mano deve essere di 3 carte";
	}

	public void giocaCarta(MazzoCoperto mazzoCoperto, MazzoScarti mazzoScarti) { 
		assert (mano.size()==4): "La mano prima di giocare deve avere 4 carte";

		System.out.println("torri giocatore: " + insTorri2);
		if(!(mazzoCoperto.isVuoto())) {
			Carta cartaDaGiocare = decidiCartaDaGiocare(mano);
			System.out.println("carta scelta: " + cartaDaGiocare);
			if(cartaDaGiocare == null) {
				scartaCarta(mazzoCoperto, mazzoScarti);
			} else {
				aggiungiCartaATorre(cartaDaGiocare);
			}
			mano.remove(cartaDaGiocare);
		} else {
			return;
		}
		assert (mano.size() == 3): "La mano deve essere di 3 carte";
	}

	public abstract Carta decidiCartaDaGiocare(ArrayList<Carta> mano);
	public abstract void giocaTurnoUmano();

	public int calcolaPunteggio() {
		return getPunteggioTotale();
	}

	@Override
	public String toString() {
		return "Giocatore [nome=" + nome + "]";
	}

}