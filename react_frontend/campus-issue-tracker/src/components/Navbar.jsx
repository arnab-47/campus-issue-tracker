import { NavLink , useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";



function Navbar() {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/signin");
  }

  
  return (
    <header>
      <nav className="navbar">
        <NavLink to="/" className="brand">
          Campus Issue Tracker
        </NavLink>
        <div className="nav-links">
          {user ? (
            <>
              <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                Dashboard
              </NavLink>
              <NavLink to="/report" className={({ isActive }) => (isActive ? "active" : "")}>
                Report Issue
              </NavLink>
              <span className="nav-user">
                {user.username} <span className="role-tag">{user.role}</span>
              </span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/signin" className={({ isActive }) => (isActive ? "active" : "")}>
                Sign In
              </NavLink>
              <NavLink to="/signup" className={({ isActive }) => (isActive ? "active" : "")}>
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;