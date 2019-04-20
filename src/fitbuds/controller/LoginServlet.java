package fitbuds.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import fitbuds.dao.LoginDao;
import fitbuds.dto.User;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		
		if(email.isEmpty() && password.isEmpty()) {
			//redirect to register.html
		}
		else if(password.isEmpty()) {
			//gmail login or signup
		}
		else {
			//normal login
			User user = new User(email, password);
			try {
				if(LoginDao.login(user)) {
					response.getWriter().println("Success");
				}
				else {
					response.getWriter().println("Login Failed Fail");
				}
			} catch(SQLException ex) {
				ex.printStackTrace();
			}
		}
	}
}
