import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Directly get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload(); // optional but safe
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar border-bottom border-body fixed-top">
      <div className="nav-container">
        
        <Link to="/" className="navbar-brand">
          <h2>CineFlex</h2>
        </Link>

        <div className="hamburger" onClick={toggleMenu}>
          <i className={isOpen ? "fa-solid fa-times" : "fa-solid fa-bars"}></i>
        </div>

        <div className={isOpen ? "nav-menu active" : "nav-menu"}>
          
          <ul className="nav-links">
            <li><Link to="/" className="nav-item-link">Home</Link></li>
            <li><Link to="/movies" className="nav-item-link">Movies</Link></li>
            <li><Link to="/webseries" className="nav-item-link">Webseries</Link></li>
            <li><Link to="/kids" className="nav-item-link">Kids</Link></li>
          </ul>

          <div className="auth-section">
            {user ? (
              <button className="btn btn-logout" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="btn btn-login">
                  <i className="fa-solid fa-user"></i> Login
                </button>
              </Link>
            )}
          </div>

          {/* ✅ Admin Link */}
          {user?.isAdmin && (
            <Link to="/admin" className="nav-item-link admin-link">
              Admin
            </Link>
          )}

          <Link to="/favorites" className="favorites-link">
            ❤️
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
