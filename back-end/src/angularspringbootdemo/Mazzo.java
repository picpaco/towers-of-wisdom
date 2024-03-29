

import java.util.ArrayList;

public abstract class Mazzo {
	
	private ArrayList<Carta> listaCarte = new ArrayList<>();


	protected ArrayList<Carta> getListaCarte() {
		return listaCarte;
	}

	public boolean isVuoto() {
		return listaCarte.isEmpty();
	}

	@Override
	public String toString() {
		return listaCarte.toString();
	}

	public int dimensione() {
		return listaCarte.size();
	}

}
