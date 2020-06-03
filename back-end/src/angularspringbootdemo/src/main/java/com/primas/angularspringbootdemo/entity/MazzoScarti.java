package towers_of_wisdom;


public class MazzoScarti extends Mazzo {

	public void aggiungiCarta(Carta carta) {
		assert (carta != null): "La carta non deve essere null";


		int vecchiaDimensione = getListaCarte().size();
		boolean isCartaPescata = getListaCarte().add(carta);

		assert (getListaCarte().size() == vecchiaDimensione+1): "Il mazzo deve avere una carta in meno";		
		assert (!getListaCarte().isEmpty()): "La lista carta non deve essere vuota dopo aver aggiunto una carta";
		assert isCartaPescata: "La carta pescata deve essere stata pescata correttamente";
	}

	public boolean rimuoviCarta(Carta carta) {
		assert (carta != null): "La carta non deve essere null";
		assert (!getListaCarte().isEmpty()): "La lista carte non deve essere vuota prima di aver rimosso la carta";

		int vecchiaDimensione = getListaCarte().size();
		boolean cartaPescata = getListaCarte().remove(carta);

		assert (getListaCarte().size() == vecchiaDimensione-1): "Il mazzo deve avere una carta in meno";

		return cartaPescata;
	}

}
