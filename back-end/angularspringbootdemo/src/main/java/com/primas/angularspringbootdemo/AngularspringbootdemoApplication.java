package com.primas.angularspringbootdemo;


import org.springframework.beans.BeansException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

@SpringBootApplication
public class AngularspringbootdemoApplication implements ApplicationContextAware{
	private ApplicationContext context;
//	@SuppressWarnings("unchecked")
	public static void main(String[] args) {
		SpringApplication.run(AngularspringbootdemoApplication.class, args);
	
	}
	
//	@Bean
//	CommandLineRunner init(RepositoryUser userRepository) {
//		return args -> {
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
