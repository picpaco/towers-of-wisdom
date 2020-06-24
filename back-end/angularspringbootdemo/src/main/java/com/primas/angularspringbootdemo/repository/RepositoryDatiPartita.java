package com.primas.angularspringbootdemo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.primas.angularspringbootdemo.entity.User;

@Repository
public interface RepositoryDatiPartita extends CrudRepository<User, Long>{

}
