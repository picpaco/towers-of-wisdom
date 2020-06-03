package com.primas.angularspringbootdemo.entity;

import java.util.HashMap;

public class InsiemeTorri {

	private HashMap<Simbolo, Torre> torriCarte = new HashMap<>(4);

	public InsiemeTorri() {
		torriCarte.put(Simbolo.Q, new Torre(Simbolo.Q));
		torriCarte.put(Simbolo.C, new Torre(Simbolo.C));
		torriCarte.put(Simbolo.T, new Torre(Simbolo.T));
		torriCarte.put(Simbolo.A, new Torre(Simbolo.A));
	}

	public boolean isGiocabile(Carta carta) {
		assert (carta!=null): "La carta non dovrebbe essere null!";

		Torre torre = torriCarte.get(carta.getSimbolo());
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

		Torre vecchiaTorre = torriCarte.get(carta.getSimbolo());
		vecchiaTorre.aggiungiCartaInCima(carta);
		System.out.println("punteggio carta: " + carta.getValore().getVal());

		aggiornaPunteggioParziale(carta);

		System.out.println("punteggio totale: " + getPunteggioTotale());
		System.out.println("carta appena aggiunta alla torre: " + vecchiaTorre.guardaLaCartaInCima());
	}

	public void aggiornaPunteggioParziale(Carta carta) {
		assert (carta != null): "La carta non deve essere null";

		Torre torreDiSimboli = torriCarte.get(carta.getSimbolo());
		torreDiSimboli.aggiornaValore(carta.getValore().getVal());
	}

	public int getPunteggioTotale() {
		int somma = 0;
		for(Torre t : torriCarte.values()) {
			somma = somma + t.getValoreTorre();
		}
		assert (somma != 0): "Il punteggio non deve essere 0";
		return somma;
	}

	public HashMap<Simbolo, Torre> getTorriCarte() {
		HashMap<Simbolo, Torre> copia = new HashMap<Simbolo, Torre>();
		copia.putAll(torriCarte);
		return copia;
	}

	@Override
	public String toString() {
		return "InsiemeTorri [torriCarte=" + torriCarte + "]";
	}

}