import React, { useState } from "react";
import "./App.scss";
import Navbar from "./component/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./multiplePage/Home";
import Menu from "./multiplePage/Menu";
import Reservation from "./multiplePage/reservation";
import Contact from "./multiplePage/contact";
import Connexion from "./multiplePage/connexion";
import Inscription from "./multiplePage/inscription";
import Footer from "./component/footer";
import AdmSettingsPage from "./AdministratorPage/restaurantPageSettings";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") || false
  );
  // const role = useState(localStorage.getItem("role") || false);
  // const userId = useState(localStorage.getItem("id") || false);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("isLoggedIn"); // supprimer la variable d'authentification du localStorage
    setIsLoggedIn(false); // effacer les données de l'utilisateur stockées dans le state de l'application
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          handleLogout={handleLogout}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/connexion"
            element={<Connexion setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/restaurant-settings" element={<AdmSettingsPage />} />
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
