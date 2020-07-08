package com.primas.angularspringbootdemo.entity;

import java.util.ArrayList;

import org.json.JSONObject;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import com.primas.angularspringbootdemo.entity.TorriDiSaggezza;
import com.primas.angularspringbootdemo.repository.ClassificaRepository;

public class DatiPartitaInCorso implements ApplicationContextAware {

//	Informazione nomi dei giocatori e turno giocatore iniziale,
//	mano del giocatore umano (3 carte), 
//	se turno Bot: carta giocata dal Bot e dove è stata giocata 

	@Autowired
	private ClassificaRepository repositoryClassifica;
	private ApplicationContext context;
	private String nomeGiocatore;
	private String nomeAvversario;
	private Carta cartaGiocataBot;
	private Carta cartaPescataDaMazzoScartiBot;
	private ArrayList<Carta> manoGiocatore = new ArrayList<Carta>();
	private ArrayList<Carta> manoAvversario = new ArrayList<Carta>();
	private boolean isCartaAvversarioGiocataSuTorre;
	private boolean isCartaAvversarioGiocataSuScarti;
	private boolean ilBotHaPescatoDalMazzoCoperto;
	private boolean isTurnoBot;
	private TorriDiSaggezza tow;

	public DatiPartitaInCorso() {

	}

	public Carta getCartaPescataDaMazzoScartiBot() {
		return cartaPescataDaMazzoScartiBot;
	}

	public void setCartaPescataDaMazzoScartiBot(Carta cartaPescataDaMazzoScartiBot) {
		this.cartaPescataDaMazzoScartiBot = cartaPescataDaMazzoScartiBot;
	}

	public boolean isIlBotHaPescatoDalMazzoCoperto() {
		return ilBotHaPescatoDalMazzoCoperto;
	}

	public void setIlBotHaPescatoDalMazzoCoperto(boolean ilBotHaPescatoDalMazzoCoperto) {
		this.ilBotHaPescatoDalMazzoCoperto = ilBotHaPescatoDalMazzoCoperto;
	}

	public Carta getCartaGiocataBot() {
		return cartaGiocataBot;
	}

	public void setCartaGiocataBot(Carta cartaGiocataBot) {
		this.cartaGiocataBot = cartaGiocataBot;
	}

	public boolean isCartaAvversarioGiocataSuTorre() {
		return isCartaAvversarioGiocataSuTorre;
	}

	public void setCartaAvversarioGiocataSuTorre(boolean isCartaAvversarioGiocataSuTorre) {
		this.isCartaAvversarioGiocataSuTorre = isCartaAvversarioGiocataSuTorre;
	}

	public boolean isCartaAvversarioGiocataSuScarti() {
		return isCartaAvversarioGiocataSuScarti;
	}

	public void setCartaAvversarioGiocataSuScarti(boolean isCartaAvversarioGiocataSuScarti) {
		this.isCartaAvversarioGiocataSuScarti = isCartaAvversarioGiocataSuScarti;
	}

	public Carta pescaMazzoCoperto() {

		
		assert (tow.getGiocatori()[0].getMano().size() == 3) : "La mano del giocatore deve avere 3 carte in mano";

//		System.out.println(
//				"\r Mano del giocatore prima che lui peschi dal mazzo coperto" + tow.getGiocatori()[0].getMano());
		MazzoCoperto mc = tow.getMazzoCoperto();

		Carta cartaPescata = mc.pescaCarta();
		if(tow.getMazzoCoperto().isVuoto()) {
			cartaPescata.setUltima(true);
		}
		System.out.println("\r Il giocatore ha pescato un: " + cartaPescata);
		tow.getGiocatori()[0].getMano().add(cartaPescata);

		System.out.println("\r Carte rimaste nel mazzo coperto: " + tow.getMazzoCoperto().dimensione());
		System.out.println("\r Carte presenti nel mazzo scarti: " + tow.getMazzoScarti().getListaCarte()
				+ "\r Numero carte scartate: " + tow.getMazzoScarti().dimensione());
		System.out.println("\r Mano del giocatore: " + tow.getGiocatori()[0].getMano());

		assert (tow.getGiocatori()[0].getMano()
				.size() == 4) : "La mano del giocatore ora deve essere di 4 carte dopo aver pescato dal mazzo coperto";

		return cartaPescata;
	}

	public ArrayList<Carta> aggiungiCartaAlMazzoScarti(Carta carta) {
		int dimensionePrimaDiScartareCarta = tow.getMazzoScarti().dimensione();

		assert (tow.getGiocatori()[0].getMano().size() == 4) : "La mano del giocatore deve essere di 4 carte";
		assert (tow.getGiocatori()[0].getMano()
				.contains(carta)) : "La mano del giocatore deve contenere la carta da scartare";

		MazzoScarti ms = tow.getMazzoScarti();

		boolean tr = tow.getGiocatori()[0].getMano().remove(carta);
		System.out.println("\r  Ha riosso la carta: " + tr);
		ms.aggiungiCarta(carta);
		int dimensioneDopoAverScartatoLaCarta = tow.getMazzoScarti().dimensione();

		System.out.println("\r Carte rimaste nel mazzo coperto: " + tow.getMazzoCoperto().dimensione());
		System.out.println("\r Carte presenti nel mazzo scarti: " + tow.getMazzoScarti().getListaCarte()
				+ "\r Numero carte scartate: " + tow.getMazzoScarti().dimensione());
		System.out.println("\r Mano del giocatore: " + manoGiocatore);

		assert (tow.getGiocatori()[0].getMano()
				.size() == 3) : "La mano del giocatore ora deve essere di 3 carte dopo aver scartato la carta dalla mano";

		assert (dimensioneDopoAverScartatoLaCarta == dimensionePrimaDiScartareCarta
				+ 1) : "Al mazzo degli scarti dovrebbe essere stata aggiunta una carta";
		assert (tow.getMazzoScarti()
				.contiene(carta)) : "Il mazzo degli scarti dovrebbe contenere la carta scartata dev'essere corretta";
		return tow.getGiocatori()[0].getMano();

	}

	public Carta creaCartaDaJson(String cartaJson) {
		JSONObject jsonCarta = new JSONObject(cartaJson);
		Simbolo simbolo = null;
		Valore valore = null;

		switch (jsonCarta.getString("symbol")) {
		case "Quadrato":
			simbolo = Simbolo.Q;
			break;

		case "Triangolo":
			simbolo = Simbolo.T;
			break;

		case "Cerchio":
			simbolo = Simbolo.C;
			break;
		case "Ancora":
			simbolo = Simbolo.A;
			break;
		}
		switch (jsonCarta.getString("value")) {
		case "X2":
			valore = Valore.CIMA;
			break;
		case "7":
			valore = Valore.SETTE;
			break;
		case "6":
			valore = Valore.SEI;
			break;
		case "5":
			valore = Valore.CINQUE;
			break;
		case "4":
			valore = Valore.QUATTRO;
			break;
		case "3":
			valore = Valore.TRE;
			break;
		case "2":
			valore = Valore.DUE;
			break;
		case "1":
			valore = Valore.UNO;
			break;

		}
		// System.out.println("\r" + cartaJson + "Carta da giocare ricreata");

		return new Carta(valore, simbolo);

	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		context = applicationContext;

	}

	public void inizializzaPartita() {
		tow = (TorriDiSaggezza) context.getBean("tow");
		System.out.println("\r Inizia partita con bot");
		nomeGiocatore = tow.getNomeGiocatore();
		nomeAvversario = tow.getNomeAvversario();
		Giocatore[] giocatori = new Giocatore[2];
		giocatori[0] = new GiocatoreUmano();
		giocatori[1] = new GiocatoreBot();

		giocatori[1].setApplicationContext(context);
		giocatori[0].setApplicationContext(context);

		tow.setGiocatori(giocatori);
		tow.getGiocatori()[0].setNome(nomeGiocatore);
		tow.getGiocatori()[1].setNome(nomeAvversario);
		tow.setMazzoCoperto(new MazzoCoperto());
		tow.setMazzoScarti(new MazzoScarti());
		System.out.println("\r Mazzo coperto prima di essere distribuite " + tow.getMazzoCoperto().getListaCarte());
		tow.getGiocatori()[0].distribuisciCarte(tow.getMazzoCoperto());
		tow.getGiocatori()[1].distribuisciCarte(tow.getMazzoCoperto());
		tow.stabilisciPrimoTurno();

		manoGiocatore = tow.getGiocatori()[0].getMano();
		manoAvversario = tow.getGiocatori()[1].getMano();
		System.out.println("\r Mano del giocatore: " + manoGiocatore);
		System.out.println("\r Mano del bot: " + manoAvversario);

		iniziaTurno();

	}

	void iniziaTurno() {

		int primoTurno = tow.getIndiceGiocatorePrimoTurno();

		System.out.println("\r Inizia prima: " + tow.getGiocatori()[primoTurno].getNome());

		if (primoTurno == 1) {
			isTurnoBot = true;
			cartaGiocataBot = tow.getGiocatori()[1].giocaTurno(tow.getMazzoCoperto(), tow.getMazzoScarti());
			System.out.println("\r Carte rimaste nel mazzo coperto: " + tow.getMazzoCoperto().dimensione());
			System.out.println("\r Carte presenti nel mazzo scarti: " + tow.getMazzoScarti().getListaCarte()
					+ "\r Numero carte scartate: " + tow.getMazzoScarti().dimensione());

		} else {
			isTurnoBot = false;
			isCartaAvversarioGiocataSuScarti = false;
			isCartaAvversarioGiocataSuTorre = false;
			cartaGiocataBot = null;
			ilBotHaPescatoDalMazzoCoperto = false;
		}
		System.out.println("\r Mazzo scarti contiene: " + tow.getMazzoScarti());
	}

	public void giocaBot() {
		isTurnoBot = true;
		isCartaAvversarioGiocataSuScarti = false;
		isCartaAvversarioGiocataSuTorre = false;
		cartaGiocataBot = null;
		cartaPescataDaMazzoScartiBot = null;
		ilBotHaPescatoDalMazzoCoperto = false;
		// int turnoCorrente = turnoSuccessivo(tow.getIndiceGiocatorePrimoTurno());
		System.out.println("\r ----Il turno passa al " + tow.getGiocatori()[1].getNome() + "----");

		tow.getGiocatori()[1].giocaTurno(tow.getMazzoCoperto(), tow.getMazzoScarti());

		System.out.println("\r Carte rimaste nel mazzo coperto: " + tow.getMazzoCoperto().dimensione());
		System.out.println("\r Carte presenti nel mazzo scarti: " + tow.getMazzoScarti().getListaCarte()
				+ "\r Numero carte scartate: " + tow.getMazzoScarti().dimensione());
		System.out.println("\r Mano del bot: " + manoAvversario);

		System.out.println("\r ----Terminato il turno del bot----");
	}

	public boolean isTurnoBot() {
		return isTurnoBot;
	}

	public int turnoSuccessivo(int primoTurno) {
		int turnoCorrente = primoTurno;

		return ((turnoCorrente + 1) % 2);
	}

	public Carta pescaMazzoScarti(Carta carta) {
		assert (tow.getGiocatori()[0].getMano()
				.size() == 3) : "La mano del giocatore deve essere di 3 carte per pescare dal mazzo scarti!";
		assert (tow.getMazzoScarti()
				.dimensione() > 0) : "Il mazzo degli scarti deve contenere almeno una carta per essere pescata!";

		if (tow.getMazzoScarti().contiene(carta)) {
			tow.getGiocatori()[0].getMano().add(tow.getMazzoScarti().pescaCarta(carta));
		}

		System.out.println("\r Mazzo scarti contiene: " + tow.getMazzoScarti());

		assert (tow.getGiocatori()[0].getMano()
				.size() == 4) : "Dopo aver pescato dal mazzo degli scarti la mano deve contenere una carta in più!";

		return carta;
	}

	public void giocatoreGiocaSuTorre(Carta cartaGiocata) {
		assert (tow.getGiocatori()[0].getMano()
				.size() == 4) : "La mano del giocatore deve avere 4 carte prima di giocare!";
		tow.getGiocatori()[0].aggiungiCartaATorre(cartaGiocata);
		tow.getGiocatori()[0].getMano().remove(cartaGiocata);
		System.out.println("\r Carte rimaste nel mazzo coperto: " + tow.getMazzoCoperto().dimensione());
		System.out.println("\r Carte presenti nel mazzo scarti: " + tow.getMazzoScarti().getListaCarte()
				+ "\r Numero carte scartate: " + tow.getMazzoScarti().dimensione());
		System.out.println("\r Mano del giocatore: " + manoGiocatore);

	}

	public void salvaRisultatiPartita(String nome, String result) {

		int numeroPartiteGiocate = 0;
		int numeroPartiteVinte = 0;
		int numeroPartitePerse = 0;
		LeaderboardEntry leaderboardEntryAggiornata = null;
		boolean trovato = false;

		Iterable<LeaderboardEntry> righe = repositoryClassifica.findAll();

		for (LeaderboardEntry riga : righe) {
			if (riga.getNome().equals(nome)) {
				trovato = true;
				numeroPartiteGiocate = riga.getNumeroPartiteTotali() + 1;
				numeroPartiteVinte = riga.getNumeroVittorie();
				numeroPartitePerse = riga.getNumeroSconfitte();

				if (result.substring(0, 1).equals("1") && !result.equals("1/2")) {
					numeroPartiteVinte++;
				} 
				if(result.substring(0, 1).equals("0")) {
					numeroPartitePerse++;
				}

				leaderboardEntryAggiornata = new LeaderboardEntry(nome, numeroPartiteGiocate, numeroPartiteVinte, numeroPartitePerse);
				System.out.println("\r Nome: "+
						leaderboardEntryAggiornata.getNome() +"\r PartiteTotali: "+ leaderboardEntryAggiornata.getNumeroPartiteTotali()
								+"\r Vittorie: "+ leaderboardEntryAggiornata.getNumeroVittorie()+ "\r Sconfitte: " + leaderboardEntryAggiornata.getNumeroSconfitte());
			}
		}
		if (!trovato) {
			if (result.substring(0, 1).equals("1") && !result.equals("1/2")) {
				numeroPartiteVinte++;
			} 
			if(result.substring(0, 1).equals("0")) {
				numeroPartitePerse++;
			}
			
			leaderboardEntryAggiornata = new LeaderboardEntry(nome, 1, numeroPartiteVinte, numeroPartitePerse);
			System.out.println("\r Nome: "+
					leaderboardEntryAggiornata.getNome() +"\r PartiteTotali: "+ leaderboardEntryAggiornata.getNumeroPartiteTotali()
							+"\r Vittorie: "+ leaderboardEntryAggiornata.getNumeroVittorie() + "\r Sconfitte: " + leaderboardEntryAggiornata.getNumeroSconfitte());
		}
		repositoryClassifica.save(leaderboardEntryAggiornata);
	}

	public String getNomeGiocatore() {
		return nomeGiocatore;
	}

	public String getNomeAvversario() {
		return nomeAvversario;
	}

	public ArrayList<Carta> getManoGiocatore() {
		return manoGiocatore;
	}

	public ArrayList<Carta> getManoAvversario() {
		return manoAvversario;
	}

	@Override
	public String toString() {
		return "DatiPartitaInCorso [nomeGiocatore=" + nomeGiocatore + ", nomeAvversario=" + nomeAvversario
				+ ", isTurnoBot=" + isTurnoBot + ", cartaGiocataBot=" + cartaGiocataBot + ", manoGiocatore="
				+ manoGiocatore + ", manoAvversario=" + manoAvversario + ", isCartaAvversarioGiocataSuTorre="
				+ isCartaAvversarioGiocataSuTorre + ", isCartaAvversarioGiocataSuScarti="
				+ isCartaAvversarioGiocataSuScarti + "]";
	}

}
