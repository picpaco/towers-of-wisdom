package towers_of_wisdom;

import java.util.ArrayList;
import java.util.Scanner;

public class GiocatoreUmano extends Giocatore {

	private InsiemeTorri insTorri = new InsiemeTorri();


	public GiocatoreUmano(String nome) {
		super(nome);
	}

	public void giocaTurnoUmano() {
		if(!(getMazzoCoperto().isVuoto())) {
			scegliDaCheMazzoPescare(scegliMossa());
			giocaOScarta(selezionaCarta(), scegliSeGiocareOScartare());
		} else {
			return;
		}
	}

	public String scegliMossa() {
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
		return mossa;
	}


	public String scegliDaCheMazzoPescare(String mossaScelta) {
		if(mossaScelta.equals("mazzoC")) {
			System.out.println("carte mano prima di pescare: " + getMano());
			getMano().add(getMazzoCoperto().pescaCarta());
			System.out.println("carte mano dopo aver pescato dal mazzo coperto: " + getMano());
		} 
		if(mossaScelta.equals("mazzoS")) {
			System.out.println("mazzo scarti: " +  getMazzoScarti());
			if(!(getMazzoScarti().isVuoto())) {
				pescaCartaDaMazzoScarti(scegliCartaDaMazzoScarti());
			} else {
				System.out.println("Il mazzo degli scarti è vuoto, non si può pescare da qui!");
				System.out.println("Pescherai dal mazzo coperto.");
				System.out.println("carte mano prima di pescare: " + getMano());
				getMano().add(getMazzoCoperto().pescaCarta());
				System.out.println("carte mano dopo aver pescato dal mazzo coperto: " + getMano());
			}
		}
		return mossaScelta;
	}

	public int scegliCartaDaMazzoScarti() {
		System.out.println("mazzo scarti: " +  getMazzoScarti());
		boolean inputNok = true;
		int cartaSelezionata = 0;
		@SuppressWarnings("resource")
		Scanner scan = new Scanner(System.in);
		scan.useDelimiter(System.lineSeparator());
		cartaSelezionata = getMazzoScarti().dimensione();
		while (inputNok) {
			System.out.println("Digita il numero corrispondente alla carta che vuoi selezionare: ");
			cartaSelezionata = scan.nextInt();
			for(int i=0; i<getMazzoScarti().dimensione(); i++) {
				if(cartaSelezionata == getMazzoScarti().getListaCarte().indexOf(getMazzoScarti().getListaCarte().get(i))) {
					inputNok = false;
					break;
				}
			}
		}
		return cartaSelezionata;
	}

	public Carta pescaCartaDaMazzoScarti(int cartaSelezionata) {
		Carta c = getMazzoScarti().getListaCarte().get(cartaSelezionata);
		getMano().add(c);
		getMazzoScarti().rimuoviCarta(c);
		System.out.println("carta pescata dal mazzo degli scarti: " + c);
		System.out.println("carte mano dopo aver pescato dal mazzo degli scarti: " + getMano());
		return c;
	}

	public String scegliSeGiocareOScartare() {
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
		return scelta;
	}


	public String selezionaCarta() {
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
		return cartaSelezionata;
	}


	public String giocaOScarta(String cartaSelezionata, String scelta) {
		if(scelta.equals("gioca")) {
			if(cartaSelezionata.equals("carta1")) {
				if(insTorri.isGiocabile(getMano().get(0))) {
					insTorri.aggiungiCartaATorre(getMano().get(0));
					System.out.println("carta giocata: " + getMano().get(0));
					getMano().remove(getMano().get(0));
				} else {
					System.out.println("Non è possibile giocare questa carta");
					giocaOScarta(selezionaCarta(), scegliSeGiocareOScartare());
				}
			}
			if(cartaSelezionata.equals("carta2")) {
				if(insTorri.isGiocabile(getMano().get(1))) {
					insTorri.aggiungiCartaATorre(getMano().get(1));
					System.out.println("carta giocata: " + getMano().get(1));
					getMano().remove(getMano().get(1));
				} else {
					System.out.println("Non è possibile giocare questa carta");
					giocaOScarta(selezionaCarta(), scegliSeGiocareOScartare());
				}
			}
			if(cartaSelezionata.equals("carta3")) {
				if(insTorri.isGiocabile(getMano().get(2))) {
					insTorri.aggiungiCartaATorre(getMano().get(2));
					System.out.println("carta giocata: " + getMano().get(2));
					getMano().remove(getMano().get(2));
				} else {
					System.out.println("Non è possibile giocare questa carta");
					giocaOScarta(selezionaCarta(), scegliSeGiocareOScartare());
				}
			}
			if(cartaSelezionata.equals("carta4")) {
				if(insTorri.isGiocabile(getMano().get(3))) {
					insTorri.aggiungiCartaATorre(getMano().get(3));
					System.out.println("carta giocata: " + getMano().get(3));
					getMano().remove(getMano().get(3));
				} else {
					System.out.println("Non è possibile giocare questa carta");
					giocaOScarta(selezionaCarta(), scegliSeGiocareOScartare());
				}
			}
		}	
		if(scelta.equals("scarta")) {
			if(cartaSelezionata.equals("carta1")) {
				getMazzoScarti().aggiungiCarta(getMano().get(0));
				System.out.println("carta rimossa: " + getMano().get(0));
				getMano().remove(getMano().get(0));	
			}
			if(cartaSelezionata.equals("carta2")) {
				getMazzoScarti().aggiungiCarta(getMano().get(1));
				System.out.println("carta rimossa: " + getMano().get(1));
				getMano().remove(getMano().get(1));
			}
			if(cartaSelezionata.equals("carta3")) {
				getMazzoScarti().aggiungiCarta(getMano().get(2));
				System.out.println("carta rimossa: " + getMano().get(2));
				getMano().remove(getMano().get(2));
			}
			if(cartaSelezionata.equals("carta4")) {
				getMazzoScarti().aggiungiCarta(getMano().get(3));
				System.out.println("carta rimossa: " + getMano().get(3));
				getMano().remove(getMano().get(3));
			}
		}
		System.out.println("carte mano dopo aver giocato: " + getMano());
		System.out.println("torri giocatore: " + insTorri.getTorriCarte().values());
		System.out.println("mazzo scarti: " +  getMazzoScarti());
		
		insTorri.getPunteggio();
		return cartaSelezionata;
	}


	@Override
	public Carta decidiCartaDaGiocare(ArrayList<Carta> mano, InsiemeTorri insTorri) {
		return null;
	}

}
