package towers_of_wisdom;

public class Carta {
	
	private Simbolo simbolo;
	private Valore valore;

	public Carta(Valore valore, Simbolo simbolo) {
		this.simbolo = simbolo;
		this.valore = valore ;
	}

	public Simbolo getSimbolo() {
		return simbolo;
	}


	public Valore getValore() {
		return valore;
	}

	@Override
	public String toString() {
		return "[" + simbolo + " " + valore + "]";
	}

}
