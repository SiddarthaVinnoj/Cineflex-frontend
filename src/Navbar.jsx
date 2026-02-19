import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Update user state when localStorage changes
  useEffect(() => {
    const updateUser = () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
    };
    
    updateUser(); // Initial load
    
    // Force update every 500ms to catch login changes
    const interval = setInterval(updateUser, 500);
    
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="navbar border-bottom border-body fixed-top">
      <div className="nav-container">
        <Link to="/" className="navbar-brand"><h2>CineFlex</h2></Link>
        
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

          <div className='auth-section'>
            {user ? (
              <button className='btn btn-logout' onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className='btn btn-login'>
                  <i className="fa-solid fa-user"></i>Login
                </button>
              </Link>
            )}
          </div>
          {user && user.isAdmin && (

            
            <Link to="/admin" className="nav-item-link admin-link">Admin</Link>
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
