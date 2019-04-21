package fitbuds.dbutil;

import java.sql.*;
import javax.servlet.*;

public class DBListener implements ServletContextListener{
	@Override
	public void contextInitialized(ServletContextEvent evt) {
		ServletContext c = evt.getServletContext();
		String driver = c.getInitParameter("driverName").trim();
		String url = c.getInitParameter("jdbc:mysql://localhost:3306/fitbuds").trim();
		String username = c.getInitParameter("root").trim();
		String password = c.getInitParameter("sahaj231197").trim();
		Connection conn = null;
		try {
			Class.forName(driver);
			conn = DriverManager.getConnection(url, username, password);
			DBConnection.setConnection(conn);
			System.out.println("Context initialized");
		}
		catch(ClassNotFoundException ex) {
			System.out.println("Exception in ContextInitialization");
			ex.printStackTrace();
		} catch (SQLException ex) {
			System.out.println("Exception in ContextInitialization");
			ex.printStackTrace();
		}
		finally {
			c.setAttribute("Connection", conn);
		}
	}
	@Override
	public void contextDestroyed(ServletContextEvent evt) {
		ServletContext c = evt.getServletContext();
		Connection conn = (Connection)c.getAttribute("Connection");
		if(conn != null)
			try {
				conn.close();
				System.out.println("ContextDestroyed");
			} catch(SQLException ex) {
				ex.printStackTrace();
				System.out.println("Exception in ContextDestroy");
			}
	}
}
