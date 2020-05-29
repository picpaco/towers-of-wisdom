package towers_of_wisdom;

import java.util.ArrayList;

public class GiocatoreBot extends Giocatore {

	public GiocatoreBot(String nome) {
		super(nome);
	}

	@Override
	public Carta decidiCartaDaGiocare(ArrayList<Carta> mano, InsiemeTorri insTorri) {
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
