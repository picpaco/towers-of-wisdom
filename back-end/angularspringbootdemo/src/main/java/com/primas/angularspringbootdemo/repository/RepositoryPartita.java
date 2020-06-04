package com.primas.angularspringbootdemo.repository;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.primas.angularspringbootdemo.entity.Partita;

public interface RepositoryPartita {

	@Repository
	public interface RepositoryUser extends CrudRepository<Partita, Long> {
	}

}
