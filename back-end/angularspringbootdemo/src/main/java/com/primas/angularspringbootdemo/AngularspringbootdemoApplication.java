package com.primas.angularspringbootdemo;


import java.util.ArrayList;

import org.springframework.beans.BeansException;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;


import com.primas.angularspringbootdemo.entity.Partita;

import com.primas.angularspringbootdemo.repository.RepositoryPartita;

@SpringBootApplication
public class AngularspringbootdemoApplication implements ApplicationContextAware{
	private static ApplicationContext context;
//	@SuppressWarnings("unchecked")
	public static void main(String[] args) {
		SpringApplication.run(AngularspringbootdemoApplication.class, args);
	
	}
	
	@Bean
	CommandLineRunner init(RepositoryPartita partitaRepository) {
		return args -> {
			Partita partita = new Partita("Marco", "Tizio");
			
			partitaRepository.save(partita);
			partitaRepository.findAll().forEach(System.out::println);//i giocaotri vanno salvati a partire dall'interfaccia 
		};
	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		context = applicationContext;
	}
	

}
