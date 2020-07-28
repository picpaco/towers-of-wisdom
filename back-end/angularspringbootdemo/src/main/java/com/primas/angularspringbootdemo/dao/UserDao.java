package com.primas.angularspringbootdemo.dao;

import org.springframework.data.repository.CrudRepository;


import com.primas.angularspringbootdemo.entity.DAOUser;

public interface UserDao extends CrudRepository<DAOUser, Integer> {
	
	DAOUser findByUsername(String username);

}
