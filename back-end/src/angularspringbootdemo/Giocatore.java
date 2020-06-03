

import java.util.ArrayList;

public abstract class Giocatore {  

	private String nome;
	private MazzoScarti mazzoScarti = new MazzoScarti();
	private MazzoCoperto mazzoCoperto = new MazzoCoperto();
	private InsiemeTorri insTorri = new InsiemeTorri();
	private ArrayList<Carta> mano = new ArrayList<>(4);



	public Giocatore(String nome) {
		this.nome = nome;
	}

	public String getNome() {
		return nome;
	}

	public ArrayList<Carta> getMano() {
		return mano;
	}

	protected MazzoScarti getMazzoScarti() {
		return mazzoScarti;
	}

	public void setMazzoScarti(MazzoScarti mazzoScarti) {
		this.mazzoScarti = mazzoScarti;
	}

	protected MazzoCoperto getMazzoCoperto() {
		return mazzoCoperto;
	}

	public void setMazzoCoperto(MazzoCoperto mazzoCoperto) {
		this.mazzoCoperto = mazzoCoperto;
	}

	public void setMano(ArrayList<Carta> mano) {
		this.mano = mano;
	}

	public void giocaTurno() { 
		assert (mano.size() == 3): "La mano deve avere 3 carte";

		boolean cartaTrovataInMazzoScarti = false;
		if(mazzoScarti.isVuoto()) {
			System.out.println("carte mano prima di pescare: " + mano);
			mano.add(mazzoCoperto.pescaCarta());
			System.out.println("carte mano dopo aver pescato: " + mano);
			giocaCarta();
			System.out.println("carte mano dopo aver giocato: " + mano);
		} else {
			Carta c = null;
			for(int i = 0; i<mazzoScarti.dimensione(); i++) {
				c = mazzoScarti.getListaCarte().get(i);
				if(insTorri.isGiocabile(c)) {		
					mazzoScarti.rimuoviCarta(c);
					mano.add(c);
					System.out.println("carta presa da mazzo degli scarti: " + c);
					giocaCarta();
					cartaTrovataInMazzoScarti = true;
					break;
				}
			}
			if(!(cartaTrovataInMazzoScarti)) {
				mano.add(mazzoCoperto.pescaCarta());
				System.out.println("carte mano: "+mano);
				giocaCarta();
			}
			if(mazzoCoperto.isVuoto()) {
				assert (mano.size() == 4): "Se il mazzo coperto è vuoto la mano deve avere 4 carte";
			} else {
				assert (mano.size() == 3): "Se il mazzo coperto non è vuoto la mano deve avere 3 carte";
			}
		}
	}

	public ArrayList<Carta> distribuisciCarte() {
		assert (mano.size() == 0): "La mano deve essere vuota";

		for(int i=0; i<3; i++) {
			mano.add(mazzoCoperto.pescaCarta());
		}
		System.out.println("mano dopo distribuzione carte:"+ mano + " " + "dimensione mano: "+mano.size());

		assert (mano.size() == 3): "La mano deve essere di 3 carte";
		return mano;
	}

	public void scartaCarta() { 	
		assert (mano.size() == 4): "La mano deve avere 4 carte"; 

		if(!(mazzoCoperto.isVuoto())) {
			for(int i = 0; i < mano.size(); i++) {
				if(!(insTorri.isGiocabile(mano.get(i)))) {
					mazzoScarti.aggiungiCarta(mano.get(i));
					System.out.println("carta scartata: "+mano.get(i));
					mano.remove(mano.get(i));
					break;
				}
			}
		}
		assert (mano.size() == 3): "La mano deve essere di 3 carte";
	}

	public void giocaCarta() { 
		assert (mano.size()==4): "La mano prima di giocare deve avere 4 carte";

		System.out.println("torri giocatore: " + insTorri.getTorriCarte().values());
		if(!(mazzoCoperto.isVuoto())) {
			Carta cartaDaGiocare = decidiCartaDaGiocare(mano, insTorri);
			System.out.println("carta scelta: " + cartaDaGiocare);
			if(cartaDaGiocare == null) {
				scartaCarta();
			} else {
				insTorri.aggiungiCartaATorre(cartaDaGiocare);
			}
			mano.remove(cartaDaGiocare);
		} else {
			return;
		}
		assert (mano.size() == 3): "La mano deve essere di 3 carte";
	}

	public abstract Carta decidiCartaDaGiocare(ArrayList<Carta> mano, InsiemeTorri insTorri);
	public abstract void giocaTurnoUmano();

	public int calcolaPunteggio() {
		return insTorri.getPunteggioTotale();
	}

	@Override
	public String toString() {
		return "Giocatore [nome=" + nome + "]";
	}

}