//package com.primas.angularspringbootdemo.jdbc;
//
//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.ResultSet;
//import java.sql.SQLException;
//import java.sql.Statement;
//import java.util.ArrayList;
//import java.util.List;
//
//import com.primas.angularspringbootdemo.entity.User;
//
//public class GestoreDatabase {
//
//	Connection con = null;
//
//	try
//	{
//		Class.forName("com.mysql.cj.jdbc.Driver");
//		System.out.println("driver jdbc caricato");
//		con = DriverManager.getConnection("jdbc:mysql://localhost:3306/tow", "root", "primas");
//		System.out.println("siamo connessi con il database");
//		Statement stmt = con.createStatement();
//		String selectSql = "SELECT * FROM utenti";
//		ResultSet resultSet = stmt.executeQuery(selectSql);
//		List<User> listaImpiegati = new ArrayList<>();
//		while (resultSet.next()) {
//			User usr = new User(resultSet.getString("userName"), resultSet.getString("password"));
//			listaImpiegati.add(usr);
//		}
//
//	}catch(
//	ClassNotFoundException e1)
//	{
//		e1.printStackTrace();
//	}catch(
//	SQLException e)
//	{
//		e1.printStackTrace();
//	}finally
//	{
//		try {
//			con.close();
//		} catch (SQLException e) {
//			RuntimeException e1 = new RuntimeException();
//			e1.initCause(e);
//			throw e1;
//		}
//	}
//}}
