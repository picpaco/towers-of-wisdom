

import java.util.Scanner;
import java.util.concurrent.ThreadLocalRandom;

public class TorriDiSaggezza { //test unitari


	private Giocatore[] giocatori = new Giocatore[2];
	private MazzoCoperto mazzoCoperto = new MazzoCoperto();
	private MazzoScarti mazzoScarti = new MazzoScarti();

	public TorriDiSaggezza() {

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
		String nomeGiocatore = ottieniNomeGiocatore();
		giocatori[0] = new GiocatoreUmano(nomeGiocatore);
//		giocatori[0] = new GiocatoreBot("BOT 0");
//		giocatori[1] = new GiocatoreBot("BOT 1");
		String tipologiaAvversario = scegliAvversario();
		System.out.println("tipologia avversario:"+tipologiaAvversario);
		if(tipologiaAvversario.equals("BOT")) {
			giocatori[1] = new GiocatoreBot(tipologiaAvversario);
		} else {
			giocatori[1] = new GiocatoreUmano(tipologiaAvversario);
		}	
		giocatori[0].setMazzoCoperto(mazzoCoperto);
		giocatori[0].setMazzoScarti(mazzoScarti);
		giocatori[1].setMazzoCoperto(mazzoCoperto);
		giocatori[1].setMazzoScarti(mazzoScarti);

		System.out.println("giocatore 1: " + giocatori[0].getNome());
		System.out.println("giocatore 2: " + giocatori[1].getNome());
		if(tipologiaAvversario.equals("BOT")) {
			giocaPartitaConBot();
		} else {
			if(tipologiaAvversario.equals("AMICO")) {
				giocaPartitaConUmano();
			} else {
				throw new GiocatoreException("Giocatore non valido");
			}
		}

	}

	private String ottieniNomeGiocatore() {
		// il nome del giocatore verrà dal login
		return "Marco";
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
		Giocatore giocatoreCorrente = null;


		giocatori[0].distribuisciCarte();
		giocatori[1].distribuisciCarte();

		System.out.println(mazzoCoperto);
		System.out.println("Il mazzo ha "+mazzoCoperto.dimensione()+" carte");
		while(!(mazzoCoperto.isVuoto())) {

			giocatoreCorrente = giocatori[turnoCorrente];
			System.out.println("turno: " + giocatoreCorrente.getNome());
			if(giocatoreCorrente.equals(giocatori[0])) {
				giocatoreCorrente.giocaTurnoUmano();
			} else {
				giocatoreCorrente.giocaTurno();
			}
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

		giocatori[0].distribuisciCarte();
		giocatori[1].distribuisciCarte();

		System.out.println(mazzoCoperto);
		System.out.println("Il mazzo ha "+mazzoCoperto.dimensione()+" carte");
		while(!(mazzoCoperto.isVuoto())) {

			giocatoreCorrente = giocatori[turnoCorrente];
			System.out.println("turno: " + giocatoreCorrente.getNome());
			giocatoreCorrente.giocaTurnoUmano();
			turnoCorrente = (turnoCorrente+1)%2;
			System.out.println("Il mazzo ha "+mazzoCoperto.dimensione()+" carte");
		}
		calcolaVincitore();
		
		assert (mazzoCoperto.dimensione() == 0): "Il mazzo non dovrebbe essere pieno";
	}
}