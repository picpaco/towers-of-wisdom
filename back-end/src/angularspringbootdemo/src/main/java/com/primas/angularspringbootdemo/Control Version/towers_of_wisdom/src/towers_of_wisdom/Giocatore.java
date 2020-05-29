package towers_of_wisdom;

import java.util.ArrayList;

public abstract class Giocatore {  

	private String nome;
	private MazzoScarti mazzoScarti = new MazzoScarti();
	private MazzoCoperto mazzoCoperto = new MazzoCoperto();
	private InsiemeTorri insTorri = new InsiemeTorri();
	private ArrayList<Carta> mano = new ArrayList<>(4);
	//private Torre torre;


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

	protected void setMazzoScarti(MazzoScarti mazzoScarti) {
		this.mazzoScarti = mazzoScarti;
	}

	protected MazzoCoperto getMazzoCoperto() {
		return mazzoCoperto;
	}

	protected void setMazzoCoperto(MazzoCoperto mazzoCoperto) {
		this.mazzoCoperto = mazzoCoperto;
	}

	public void setMano(ArrayList<Carta> mano) {
		this.mano = mano;
	}

	public void giocaTurno() { 
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
					mano.add(c);
					System.out.println("carta presa da mazzo degli scarti: " + c);
					mazzoScarti.rimuoviCarta(c);
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
		}
	}

	public ArrayList<Carta> distribuisciCarte() {
		for(int i=0; i<3; i++) {
			mano.add(mazzoCoperto.pescaCarta());
		}
		System.out.println("mano dopo distribuzione carte:"+ mano + " " + "dimensione mano: "+mano.size());
		return mano;
	}

	public void scartaCarta() { 	
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
	}

	public void giocaCarta() { 
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
	}

	public abstract Carta decidiCartaDaGiocare(ArrayList<Carta> mano, InsiemeTorri insTorri);
	public abstract void giocaTurnoUmano();

	public int calcolaPunteggio() {
		return insTorri.getPunteggio();
	}

	@Override
	public String toString() {
		return "Giocatore [nome=" + nome + "]";
	}

}