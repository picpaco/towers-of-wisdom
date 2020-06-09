package com.primas.angularspringbootdemo.entity;


public class MazzoScarti extends Mazzo {

	public void aggiungiCarta(Carta carta) {
		assert (carta != null): "La carta non deve essere null";


		int vecchiaDimensione = getListaCarte().size();
		boolean isCartaPescata = getListaCarte().add(carta);

		assert (getListaCarte().size() == vecchiaDimensione+1): "Il mazzo deve avere una carta in meno";		
		assert (!getListaCarte().isEmpty()): "La lista carta non deve essere vuota dopo aver aggiunto una carta";
		assert isCartaPescata: "La carta pescata deve essere stata pescata correttamente";
	}

	/**
	 * elimina dal mazzo degli scarti la carta da pescare precedentemente scelta
	 * @param carta carta da pescare dal mazzo degli scarti
	 * 
	 * @return carta pescata
	 */
	public Carta pescaCarta(Carta carta) { 
		assert (carta != null): "La carta non deve essere null";
		assert (!getListaCarte().isEmpty()): "La lista carte non deve essere vuota prima di aver rimosso la carta";

		int vecchiaDimensione = getListaCarte().size();
		boolean isCartaPescata = getListaCarte().remove(carta);

		assert (getListaCarte().size() == vecchiaDimensione-1): "Il mazzo deve avere una carta in meno";

		if(isCartaPescata) {
			return carta;
		} else {
			throw new IllegalStateException("La carta non è stata pescata correttamente");
		}
	}

}
