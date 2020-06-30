package com.primas.angularspringbootdemo;


import javax.websocket.Session;

import org.hibernate.SharedSessionContract;
import org.springframework.beans.BeansException;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;

import com.primas.angularspringbootdemo.entity.LeaderboardEntry;
import com.primas.angularspringbootdemo.repository.ClassificaRepository;

@SpringBootApplication
public class AngularspringbootdemoApplication implements ApplicationContextAware{
	private ApplicationContext context;
	//	@SuppressWarnings("unchecked")
	public static void main(String[] args) {

		SpringApplication.run(AngularspringbootdemoApplication.class, args);


	}    


	@Bean
	CommandLineRunner init(ClassificaRepository repositoryClassifica) {
		return args -> {
			
			//---------dati dal front-end:
//			String nomePrimoGiocatore="Maurizio";
//			String nomeSecondoGiocatore = "Gennara";
//			String risultato = "1-0";
//			//---------
//			int numeroPartiteGiocatePrimoGiocatore=0;
//			int numeroPartiteVintePrimoGiocatore=0;
//			LeaderboardEntry leaderboardEntryAggiornata = null;
//			boolean trovato=false;
//			
//			
//			Iterable<LeaderboardEntry> righe = repositoryClassifica.findAll();
//			for(LeaderboardEntry riga : righe) {
//				if(riga.getNome().equals(nomePrimoGiocatore)) {
//					trovato=true;
//					numeroPartiteGiocatePrimoGiocatore = riga.getNumeroPartiteTotali()+1;
//					numeroPartiteVintePrimoGiocatore = riga.getNumeroVittorie();
//					if(risultato.equals("1-0")) {
//						numeroPartiteVintePrimoGiocatore++;
//					}
//					leaderboardEntryAggiornata = new LeaderboardEntry(nomePrimoGiocatore, numeroPartiteGiocatePrimoGiocatore, numeroPartiteVintePrimoGiocatore);
//					
//				} 
//			}
//			if(!trovato) {
//				if(risultato.equals("1-0")) {
//					numeroPartiteVintePrimoGiocatore++;
//				}
//				leaderboardEntryAggiornata = new LeaderboardEntry(nomePrimoGiocatore, 1, numeroPartiteVintePrimoGiocatore);
//			}
//			repositoryClassifica.save(leaderboardEntryAggiornata);
			
//			String nome2 = "Maurizio";
//			
//			boolean isVincitore2=false;	
//			int numeroPartiteGiocate2=0;
//			int numeroPartiteVinte2=0;
//			LeaderboardEntry leaderboardEntryAggiornata2 = null;
//			boolean trovato2=false;
//			
//			
//			Iterable<LeaderboardEntry> righe2 = repositoryClassifica.findAll();
//			for(LeaderboardEntry riga : righe2) {
//				if(riga.getNome().equals(nome2)) {
//					trovato2=true;
//					numeroPartiteGiocate2 = riga.getNumeroPartiteTotali()+1;
//					numeroPartiteVinte2 = riga.getNumeroVittorie();
//					if(isVincitore2) {
//						numeroPartiteVinte2++;
//					}
//					leaderboardEntryAggiornata2 = new LeaderboardEntry(nome2, numeroPartiteGiocate2, numeroPartiteVinte2);
//				} 
//			}
//			if(!trovato2) {
//				leaderboardEntryAggiornata2 = new LeaderboardEntry(nome2, 1, isVincitore2?1:0);
//			}
//			repositoryClassifica.save(leaderboardEntryAggiornata2);
		};
	}
	
	//
	//			//Partita partita = new Partita("Marco", "Tizio");
	//			
	////			partitaRepository.save(partita);
	////			partitaRepository.findAll().forEach(System.out::println);//i giocaotri vanno salvati a partire dall'interfaccia
	//			User ut = userRepository.getUserByUsername("john");
	//			System.out.println("sto dentro il command liner che stampa " +  ut);
	//
	////			Partita partita = new Partita("Marco", "Tizio");
	////			
	////			partitaRepository.save(partita);
	////			partitaRepository.findAll().forEach(System.out::println);//i giocaotri vanno salvati a partire dall'interfaccia 
	//
	//		};
	//		
	//		
	//	}



	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		context = applicationContext;
	}


}
