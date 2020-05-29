package towers_of_wisdom;


public class MazzoScarti extends Mazzo {

	public void aggiungiCarta(Carta carta) {
		getListaCarte().add(carta);
	}
	
	public boolean rimuoviCarta(Carta carta) {
		return getListaCarte().remove(carta);
	}
	
}
