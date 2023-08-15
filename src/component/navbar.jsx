import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = props.isLoggedIn;
  const handleLogout = props.handleLogout;

  const handleBurgerClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="Navbar">
      <div className="BurgerMenu" onClick={handleBurgerClick}>
        <div className="BurgerMenuLine" />
        <div className="BurgerMenuLine" />
        <div className="BurgerMenuLine" />
      </div>
      <ul className={`NavbarLinks ${isOpen ? "isOpen" : ""}`}>
        <li>
          <Link to="/" onClick={handleBurgerClick}>
            Accueil
          </Link>
        </li>
        <li>
          <Link to="/menu" onClick={handleBurgerClick}>
            Menu
          </Link>
        </li>
        <li>
          <Link to="/reservation" onClick={handleBurgerClick}>
            Réservation
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={handleBurgerClick}>
            Contact
          </Link>
        </li>
        {isLoggedIn ? (
          <li>
            <Link to="/" onClick={handleLogout}>
              Déconnexion
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/connexion" onClick={handleBurgerClick}>
              Connexion
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
