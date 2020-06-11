package com.primas.angularspringbootdemo.controller;

import java.util.ArrayList;


import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.primas.angularspringbootdemo.entity.Carta;



@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class MazzoController implements BeanFactoryAware {

	private BeanFactory bf;
	
	 public void setBeanFactory(BeanFactory context) {
	        bf = context;
	     }
	
	@SuppressWarnings("unchecked")
	@GetMapping("/mano")
	public ArrayList<Carta> getManoGiocatore() {
		
		System.out.println("BeanFactory" + bf.getBean("manoGiocatore"));
		return (ArrayList<Carta>) bf.getBean("manoGiocatore");
	}
	
	

}
