package com.primas.angularspringbootdemo.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	DataSource dataSource;

	@Autowired
	public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
		auth.jdbcAuthentication().dataSource(dataSource);
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/resources/**");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		System.out.println("sto dentro il metodo configure(http)");
//		http
//			.authorizeRequests()
//				.antMatchers("/", "/home").permitAll()
//				.anyRequest().authenticated()
//				.and()
//			.formLogin()
//				.loginPage("/login")
//				.permitAll()
//				.and()
//			.logout()
//				.permitAll();

		http.csrf().disable().
		authorizeRequests().
		antMatchers(HttpMethod.OPTIONS,"/**").
		permitAll().
		anyRequest().
		authenticated()
		.and().httpBasic();

//		http.csrf().disable().authorizeRequests().antMatchers("/").permitAll().antMatchers("/welcome")
//				.hasAnyRole("USER", "ADMIN").antMatchers("/getEmployees").hasAnyRole("USER", "ADMIN")
//				.antMatchers("/addNewEmployee").hasAnyRole("ADMIN").anyRequest().authenticated().and().formLogin()
//				.loginPage("/validateLogin").permitAll().and().logout().permitAll().and().httpBasic();

	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication().withUser("john").password("{noop}test123").roles("USER");
		
	}

//	@Bean
//	@Override
//	public UserDetailsService userDetailsService() {
//		UserDetails user =
//			 User.withDefaultPasswordEncoder()
//				.username("user")
//				.password("password")
//				.roles("USER")
//				.build();
//
//		return new InMemoryUserDetailsManager(user);
//	}
}
