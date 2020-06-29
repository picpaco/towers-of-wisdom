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

			repositoryClassifica.save(new LeaderboardEntry("Maurizio", 1, 1));
			repositoryClassifica.save(new LeaderboardEntry("Maurizio", 2, 2));
			repositoryClassifica.save(new LeaderboardEntry("Gennara", 3, 3));
			repositoryClassifica.save(new LeaderboardEntry("Gennara", 4, 3));
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
