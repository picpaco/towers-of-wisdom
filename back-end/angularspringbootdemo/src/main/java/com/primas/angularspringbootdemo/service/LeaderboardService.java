package com.primas.angularspringbootdemo.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.primas.angularspringbootdemo.entity.LeaderboardEntry;
import com.primas.angularspringbootdemo.repository.ClassificaRepository;

@Service
@Transactional
public class LeaderboardService {
	
	@Autowired
	private ClassificaRepository repo;

	public List<LeaderboardEntry> listAll() {
		return (List<LeaderboardEntry>) repo.findAll();
	}

	public void save(LeaderboardEntry classifica) {
		repo.save(classifica);
	}

	public LeaderboardEntry get(long id) {
		return repo.findById(id).get();
	}

	public void delete(long id) {
		repo.deleteById(id);
	}
}
