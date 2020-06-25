package com.primas.angularspringbootdemo.entity;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.context.ApplicationContextAware;




<<<<<<< HEAD
//@Entity
public abstract class Giocatore {  
=======
@Entity
public abstract class Giocatore implements ApplicationContextAware{  
>>>>>>> f41992863c4efda20d2c06d4e932ab74784b85f5

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String nome;
	private ArrayList<Torre> insTorri2 = new ArrayList<>();
	private ArrayList<Carta> mano = new ArrayList<>(4);
	

	public Giocatore() {
		insTorri2.add(new Torre(Simbolo.Q));
		insTorri2.add(new Torre(Simbolo.C));
		insTorri2.add(new Torre(Simbolo.T));
		insTorri2.add(new Torre(Simbolo.A));
	}

//	public Giocatore(String nome) {
//		this.nome = nome;
//		insTorri2.add(new Torre(Simbolo.Q));
//		insTorri2.add(new Torre(Simbolo.C));
//		insTorri2.add(new Torre(Simbolo.T));
//		insTorri2.add(new Torre(Simbolo.A));
//	}
	
	

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
	
	public void setNome(String nome) {
		this.nome = nome;
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

	public Carta giocaTurno(MazzoCoperto mazzoCoperto, MazzoScarti mazzoScarti) { 
		assert (mano.size() == 3): "La mano deve avere 3 carte";
		assert (!mazzoCoperto.isVuoto()): "Il mazzo coperto non deve essere vuoto";

		pescaCarta(mazzoCoperto, mazzoScarti);
		Carta c=giocaCarta(mazzoScarti);

		assert (mano.size() == 3 || mano.size() == 4 && mazzoCoperto.isVuoto()): "La mano deve avere 3 carte oppure 4 se il mazzo è finito";
		return c;
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

		Torre torreCorrente = getTorre(carta.getSimbolo());
		int vecchiaDimTorre = torreCorrente.numeroCarte();
		torreCorrente.aggiungiCartaInCima(carta);
		System.out.println("punteggio carta: " + carta.getValore().getVal());

		aggiornaPunteggioParziale(carta);
		int dimTorreCorrente = torreCorrente.numeroCarte();

		System.out.println("\rpunteggio totale: " + getPunteggioTotale());
		System.out.println("\r carta appena aggiunta alla torre: " + torreCorrente.guardaLaCartaInCima());

		assert (dimTorreCorrente == vecchiaDimTorre+1): "La torre deve avere una carta in più";
	}

	public void aggiornaPunteggioParziale(Carta carta) {
		assert (carta != null): "La carta non deve essere null";

		Torre torreCorrente = getTorre(carta.getSimbolo());
		torreCorrente.aggiornaValore(carta.getValore().getVal());
	}

	public int getPunteggioTotale() {
		int somma = 0;
		for(Torre t : insTorri2) {
			somma = somma + t.getValoreTorre();
		}
		assert (somma != 0): "Il punteggio non deve essere 0";

		return somma;
	}

	public ArrayList<Carta> distribuisciCarte(MazzoCoperto mazzoCoperto) {
		assert (mano.size() == 0): "La mano deve essere vuota"; 
		
		for(int i=0; i<3; i++) {
			mano.add(mazzoCoperto.pescaCarta());
		}
		System.out.println("\r mano dopo distribuzione carte:"+ mano + " " + "dimensione mano: "+mano.size());

		assert (mano.size() == 3): "La mano deve essere di 3 carte";
		return mano;
	}

	public Carta scartaCarta(MazzoScarti mazzoScarti) { 	
		assert (mano.size() == 4): "La mano deve avere 4 carte"; 

		Carta cartaScartata=null;
		
		for(int i = 0; i < mano.size(); i++) {
			if(!(isGiocabile(mano.get(i)))) {
				cartaScartata =mano.get(i);
				mazzoScarti.aggiungiCarta(cartaScartata);
				System.out.println("\r carta scartata: "+mano.get(i));
				 mano.remove(cartaScartata);
				 break;
			}
		}
		assert (mano.size() == 3): "La mano deve essere di 3 carte";
		return cartaScartata;

		
	}

	public abstract void pescaCarta(MazzoCoperto mazzoCoperto, MazzoScarti mazzoScarti);


	public abstract Carta giocaCarta(MazzoScarti mazzoScarti);


	public abstract Carta decidiCartaDaGiocare(ArrayList<Carta> mano);


	public int calcolaPunteggio() {
		return getPunteggioTotale();
	}



	public void decidiCartaDaGiocareSeMazzoNonVuoto(ArrayList<Carta> mano, MazzoCoperto mazzoCoperto,
			MazzoScarti mazzoScarti) {
	}

	@Override
	public String toString() {
		return "Giocatore [id=" + id + "\r nome=" + nome + "\r insTorri2=" + insTorri2 + "\r mano=" + mano + "]\r";
	}

}