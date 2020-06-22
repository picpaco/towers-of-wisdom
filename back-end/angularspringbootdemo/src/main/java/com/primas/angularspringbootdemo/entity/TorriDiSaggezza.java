package com.primas.angularspringbootdemo.entity;

import java.util.Scanner;
import java.util.concurrent.ThreadLocalRandom;

public class TorriDiSaggezza { 


	private Giocatore[] giocatori = new Giocatore[2];
	private MazzoCoperto mazzoCoperto;
	private MazzoScarti mazzoScarti;
	private Giocatore giocatoreCorrente;
	private String nomeGiocatore;
	private String nomeAvversario="BOT";//dipenderà quale modalità sceglie il giocatore
	

	public TorriDiSaggezza() {

	}
	
	public void setNomeGiocatore(String nomeGiocatore) {
		this.nomeGiocatore = nomeGiocatore;
	}

	public void setNomeAvversario(String nomeAvversario) {
		this.nomeAvversario = nomeAvversario;
	}

	String getNomeGiocatore() {
		return nomeGiocatore;
	}

	public String getNomeAvversario() {
		return nomeAvversario;
	}

	public Giocatore[] getGiocatori() {
		return giocatori;
	}
	
	public void setGiocatori(Giocatore[] giocatori) {
		this.giocatori = giocatori;
	}

	public MazzoCoperto getMazzoCoperto() {
		return mazzoCoperto;
	}	


	protected void setMazzoCoperto(MazzoCoperto mazzoCoperto) {
		this.mazzoCoperto = mazzoCoperto;
	}

	public MazzoScarti getMazzoScarti() {
		return mazzoScarti;
	}

	protected void setMazzoScarti(MazzoScarti mazzoScarti) {
		this.mazzoScarti = mazzoScarti;
	}

	public Giocatore getGiocatoreCorrente() {
		return giocatoreCorrente;
	}
	
	
	

	public String scegliAvversario() {
		boolean inputNok = true;
		String avversario = "";
		@SuppressWarnings("resource")
		Scanner scan = new Scanner(System.in);
		scan.useDelimiter(System.lineSeparator());
		while (inputNok) {
			System.out.println("Premi 1 per giocare con un BOT o premi 2 per giocare con un AMICO");
			if (scan.hasNextLine()) {
				avversario = scan.nextLine();
				switch(avversario) {
				case "1":
					inputNok = false;
					return "BOT";
				case "2":
					inputNok = false;
					return "AMICO";
				default:
					System.out.println("Devi selezionare 1 o 2!!!"); 
				}
			}
			else{
				System.out.println("L'oggetto scan non ha trovato la successiva riga da leggere!");
			}
		}
		System.out.println("avversario: "+avversario);
		
		assert (avversario != null): "L'avversario non deve essere null";
		
		return avversario;
	}

	public void giocaPartita() {
		System.out.println("sono in gioca partita");
	
		String nomeGiocatore = getNomeGiocatore();
		giocatori[0] = new GiocatoreUmano();
		//giocatori[0] = new GiocatoreBot("BOT 0");
		giocatori[1] = new GiocatoreBot();
		//String tipologiaAvversario = scegliAvversario();
		//System.out.println("tipologia avversario:"+tipologiaAvversario);
//		if(tipologiaAvversario.equals("BOT")) {
//			giocatori[1] = new GiocatoreBot(tipologiaAvversario);
//		} else {
//			giocatori[1] = new GiocatoreUmano(tipologiaAvversario);
//		}	

		System.out.println("giocatore 1: " + giocatori[0].getNome());
		System.out.println("giocatore 2: " + giocatori[1].getNome());
//		if(tipologiaAvversario.equals("BOT")) {
			giocaPartitaConBot();
//		} else {
//			if(tipologiaAvversario.equals("AMICO")) {
//				giocaPartitaConUmano();
//			} else {
//				throw new GiocatoreException("Giocatore non valido");
//			}
//		}

	}


	public int stabilisciPrimoTurno() {
		int risultato = ThreadLocalRandom.current().nextInt(0, 2);
		
		assert(risultato == 0 || risultato == 1): "Il turno deve essere 0 o 1";
		
		return risultato;
	}


	public void giocaPartitaConBot() { 
		System.out.println("sono in gioca con bot");
		int turnoIniziale = stabilisciPrimoTurno();
		System.out.println("inizia prima: " + giocatori[turnoIniziale]);
		int turnoCorrente = turnoIniziale;


		giocatori[0].distribuisciCarte(mazzoCoperto);
		giocatori[1].distribuisciCarte(mazzoCoperto);

		System.out.println(mazzoCoperto);
		System.out.println("Il mazzo ha "+mazzoCoperto.dimensione()+" carte");
		while(!(mazzoCoperto.isVuoto())) {

			giocatoreCorrente = giocatori[turnoCorrente];
			System.out.println("turno: " + giocatoreCorrente.getNome());
				giocatoreCorrente.giocaTurno(mazzoCoperto, mazzoScarti);
			turnoCorrente = (turnoCorrente+1)%2;
			System.out.println("Il mazzo ha "+mazzoCoperto.dimensione()+" carte");
		}
		calcolaVincitore();
		
		assert (mazzoCoperto.dimensione() == 0): "Il mazzo non dovrebbe essere pieno";
	}

	private void calcolaVincitore() {
		System.out.println("punteggio "+ giocatori[0].getNome() + ": " + giocatori[0].calcolaPunteggio());
		System.out.println("punteggio "+ giocatori[1].getNome() + ": " + giocatori[1].calcolaPunteggio());

		if(giocatori[0].calcolaPunteggio() > giocatori[1].calcolaPunteggio()) {
			System.out.println("Il vincitore è " + giocatori[0].getNome());
		} 
		if(giocatori[0].calcolaPunteggio() < giocatori[1].calcolaPunteggio()) {
			System.out.println("Il vincitore è " + giocatori[1].getNome());
		}
		if(giocatori[0].calcolaPunteggio() == giocatori[1].calcolaPunteggio()) {
			System.out.println("Parità!!!");
		}
	}

	public void giocaPartitaConUmano() {
		assert (stabilisciPrimoTurno()==0 || stabilisciPrimoTurno()==1): "Il turno deve essere 0 o 1";
		System.out.println("sono in gioca con UMANO");
		int turnoIniziale = stabilisciPrimoTurno();
		int turnoCorrente = turnoIniziale;
		Giocatore giocatoreCorrente = null;

		giocatori[0].distribuisciCarte(mazzoCoperto);
		giocatori[1].distribuisciCarte(mazzoCoperto);

		System.out.println(mazzoCoperto);
		System.out.println("Il mazzo ha "+mazzoCoperto.dimensione()+" carte");
		while(!(mazzoCoperto.isVuoto())) {

			giocatoreCorrente = giocatori[turnoCorrente];
			System.out.println("turno: " + giocatoreCorrente.getNome());
			giocatoreCorrente.giocaTurno(mazzoCoperto, mazzoScarti);
			turnoCorrente = (turnoCorrente+1)%2;
			System.out.println("Il mazzo ha "+mazzoCoperto.dimensione()+" carte");
		}
		calcolaVincitore();
		
		assert (mazzoCoperto.dimensione() == 0): "Il mazzo non dovrebbe essere pieno";
	}
}