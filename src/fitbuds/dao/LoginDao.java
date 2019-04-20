package fitbuds.dao;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.mysql.cj.xdevapi.Statement;

import fitbuds.dbutil.DBConnection;
import fitbuds.dto.User;

public class LoginDao {
	private static PreparedStatement ps;
	private static Statement st;
	
	public static boolean login(User user) throws SQLException {
		ps = DBConnection.getConnection().prepareStatement("Select * from user_details where email = ? and password = ?");
		ps.setString(1, user.getEmail());
		ps.setString(2, user.getPassword());
		return ps.executeQuery().next();
	}
	
}
