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
public class MazzoScartiController implements BeanFactoryAware {

	private BeanFactory bff;

	 public void setBeanFactory(BeanFactory context) {
	        bff = context;
	     }
	
	@SuppressWarnings("unchecked")
	@GetMapping("/scarti")
	public ArrayList<Carta> getMazzoScarti() {
		
		System.out.println("BeanFactory" + bff.getBean("scarti"));
		
		return (ArrayList<Carta>) bff.getBean("scarti");
	}

}
