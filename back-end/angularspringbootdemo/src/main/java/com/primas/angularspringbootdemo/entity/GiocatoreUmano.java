package com.primas.angularspringbootdemo.entity;

import java.util.ArrayList;
import java.util.Scanner;


public class GiocatoreUmano extends Giocatore {

//	public GiocatoreUmano(String nome) {
//		super(nome);
//	}

	private String scegliMossa() {
		boolean inputNok = true;
		@SuppressWarnings("resource")
		Scanner scan = new Scanner(System.in);
		scan.useDelimiter(System.lineSeparator());
		String mossa = null;
		while (inputNok) {
			System.out.println("Premi 1 per pescare dal mazzo coperto o premi 2 per pescare dal mazzo scarti");
			mossa = scan.nextLine();
			switch(mossa) {
			case "1":
				inputNok = false;
				return "mazzoC";
			case "2":
				inputNok = false;
				return "mazzoS";
			default:
				System.out.println("Devi selezionare 1 o 2!!!"); 
			}
		}
		assert (mossa != null): "La mossa non deve essere null";

		return mossa;
	}


	private int scegliCartaDaMazzoScarti(MazzoCoperto mazzoCoperto, MazzoScarti mazzoScarti) {
		assert (!mazzoScarti.isVuoto()): "Il  mazzo scarti non deve essere vuoto";

		System.out.println("mazzo scarti: " +  mazzoScarti);
		boolean inputNok = true;
		int cartaSelezionata = 0;
		@SuppressWarnings("resource")
		Scanner scan = new Scanner(System.in);
		scan.useDelimiter(System.lineSeparator());
		cartaSelezionata = mazzoScarti.dimensione();

		assert (cartaSelezionata >= 0): "L'indice della carta selezionata deve essere maggiore uguale a 0";

		while (inputNok) {
			System.out.println("Digita il numero corrispondente alla carta che vuoi selezionare: ");
			cartaSelezionata = scan.nextInt();
			for(int i=0; i<mazzoScarti.dimensione(); i++) {
				if(cartaSelezionata == mazzoScarti.getListaCarte().indexOf(mazzoScarti.getListaCarte().get(i))) {
					inputNok = false;
					break;
				}
			}
		}
		return cartaSelezionata;
	}

	private Carta pescaCartaDaMazzoScarti(int cartaSelezionata, MazzoCoperto mazzoCoperto, MazzoScarti mazzoScarti) {
		assert (mazzoScarti.dimensione() != 0): "Il mazzo degli scarti non può essere vuoto";
		assert (getMano().size() == 3): "La mano deve avere 3 carte";
		assert (cartaSelezionata >= 0): "La carta selezionata deve avere indice maggiore o uguale a 0";
		assert (cartaSelezionata <= mazzoScarti.getListaCarte().size()): "La carta selezionata deve avere un indice minore o uguale del mazzo degli scarti";

		Carta c = mazzoScarti.getListaCarte().get(cartaSelezionata);
		mazzoScarti.pescaCarta(c);
		getMano().add(c);
		System.out.println("carta pescata dal mazzo degli scarti: " + c);
		System.out.println("carte mano dopo aver pescato dal mazzo degli scarti: " + getMano());

		assert (c != null): "La carta non deve essere null";
		assert (getMano().size() == 4): "La mano deve essere di 4 carte";
		return c;
	}

	private String scegliSeGiocareOScartare() {
		boolean inputNok = true;
		@SuppressWarnings("resource")
		Scanner scan = new Scanner(System.in);
		scan.useDelimiter(System.lineSeparator());
		String scelta = null;
		while (inputNok) {
			System.out.println("Digita 1 se vuoi giocare la carta e 2 se vuoi scartarla");
			scelta = scan.nextLine();
			switch(scelta) {
			case "1":
				inputNok = false;
				return "gioca";
			case "2":
				inputNok = false;
				return "scarta";
			default:
				System.out.println("Devi selezionare 1 o 2!"); 
			}
		}
		assert (scelta != null): "La scelta non deve essere null";
		assert (scelta == "gioca" || scelta == "scarta"): "La scelta deve essere o gioca o scarta";
		assert (getMano().size() == 4): "La mano deve essere di 4 carte";

		return scelta;
	}


	private String selezionaCarta() {
		boolean inputNok = true;
		Scanner scan = new Scanner(System.in);
		scan.useDelimiter(System.lineSeparator());
		String cartaSelezionata = null;
		while (inputNok) {
			System.out.println("Digita un numero da 1 a 4 per selezionare una carta");
			cartaSelezionata = scan.nextLine();
			switch(cartaSelezionata) {
			case "1":
				inputNok = false;
				return "carta1";
			case "2":
				inputNok = false;
				return "carta2";
			case "3":
				inputNok = false;
				return "carta3";
			case "4":
				inputNok = false;
				return "carta4";
			default:
				System.out.println("Devi selezionare 1, 2, 3 o 4!!!"); 
			}
		}
		scan.close();

		assert (cartaSelezionata != null): "La carta selezionata non deve essere null";

		return cartaSelezionata;
	}

	public int calcolaPunteggio() {
		return getPunteggioTotale();
	}

	@Override
	public Carta decidiCartaDaGiocare(ArrayList<Carta> mano) {
		return null;
	}

	@Override
	public void pescaCarta(MazzoCoperto mazzoCoperto, MazzoScarti mazzoScarti) {
		String mossaScelta = scegliMossa();
		assert (mossaScelta != null): "La mossa scelta non deve essere null";
		assert (getMano().size() == 3): "La mano deve avere 3 carte";

		if(mossaScelta.equals("mazzoC")) {
			System.out.println("carte mano prima di pescare: " + getMano());
			getMano().add(mazzoCoperto.pescaCarta());
			System.out.println("carte mano dopo aver pescato dal mazzo coperto: " + getMano());
		} 
		if(mossaScelta.equals("mazzoS")) {
			System.out.println("mazzo scarti: " +  mazzoScarti);
			if(!(mazzoScarti.isVuoto())) {
				pescaCartaDaMazzoScarti(scegliCartaDaMazzoScarti(mazzoCoperto, mazzoScarti), mazzoCoperto, mazzoScarti);
			} else {
				System.out.println("Il mazzo degli scarti è vuoto, non si può pescare da qui!");
				System.out.println("Pescherai dal mazzo coperto.");
				System.out.println("carte mano prima di pescare: " + getMano());
				getMano().add(mazzoCoperto.pescaCarta());
				System.out.println("carte mano dopo aver pescato dal mazzo coperto: " + getMano());
			}
		}
		assert (getMano().size() == 4): "La mano deve avere 4 carte";
	}

	@Override
	public void giocaCarta(MazzoScarti mazzoScarti) {
		assert (mazzoScarti != null): "Il mazzo scarti non deve essere null";
		assert (getMano().size()==4): "La mano deve contenere 4 carte";

		String cartaSelezionata = selezionaCarta(); 
		String scelta = scegliSeGiocareOScartare();


		if(scelta.equals("gioca")) {
			if(cartaSelezionata.equals("carta1")) {
				if(isGiocabile(getMano().get(0))) {
					aggiungiCartaATorre(getMano().get(0));
					System.out.println("carta giocata: " + getMano().get(0));
					getMano().remove(getMano().get(0));
				} else {
					System.out.println("Non è possibile giocare questa carta");
					giocaCarta(mazzoScarti);
				}
			}
			if(cartaSelezionata.equals("carta2")) {
				if(isGiocabile(getMano().get(1))) {
					aggiungiCartaATorre(getMano().get(1));
					System.out.println("carta giocata: " + getMano().get(1));
					getMano().remove(getMano().get(1));
				} else {
					System.out.println("Non è possibile giocare questa carta");
					giocaCarta(mazzoScarti);
				}
			}
			if(cartaSelezionata.equals("carta3")) {
				if(isGiocabile(getMano().get(2))) {
					aggiungiCartaATorre(getMano().get(2));
					System.out.println("carta giocata: " + getMano().get(2));
					getMano().remove(getMano().get(2));
				} else {
					System.out.println("Non è possibile giocare questa carta");
					giocaCarta(mazzoScarti);
				}
			}
			if(cartaSelezionata.equals("carta4")) {
				if(isGiocabile(getMano().get(3))) {
					aggiungiCartaATorre(getMano().get(3));
					System.out.println("carta giocata: " + getMano().get(3));
					getMano().remove(getMano().get(3));
				} else {
					System.out.println("Non è possibile giocare questa carta");
					giocaCarta(mazzoScarti);
				}
			}
		}	
		if(scelta.equals("scarta")) {
			if(cartaSelezionata.equals("carta1")) {
				mazzoScarti.aggiungiCarta(getMano().get(0));
				System.out.println("carta rimossa: " + getMano().get(0));
				getMano().remove(getMano().get(0));	
			}
			if(cartaSelezionata.equals("carta2")) {
				mazzoScarti.aggiungiCarta(getMano().get(1));
				System.out.println("carta rimossa: " + getMano().get(1));
				getMano().remove(getMano().get(1));
			}
			if(cartaSelezionata.equals("carta3")) {
				mazzoScarti.aggiungiCarta(getMano().get(2));
				System.out.println("carta rimossa: " + getMano().get(2));
				getMano().remove(getMano().get(2));
			}
			if(cartaSelezionata.equals("carta4")) {
				mazzoScarti.aggiungiCarta(getMano().get(3));
				System.out.println("carta rimossa: " + getMano().get(3));
				getMano().remove(getMano().get(3));
			}
		}
		System.out.println("carte mano dopo aver giocato: " + getMano());
		System.out.println("torri giocatore: " + getInsTorri2());
		System.out.println("mazzo scarti: " +  mazzoScarti);

		assert (getMano().size() == 3): "La mano deve contenere 3 carte";
	}


}
