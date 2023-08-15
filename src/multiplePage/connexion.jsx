import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Connexion = (props) => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [mot_de_passe, setMotDePasse] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectToInscription, setRedirectToInscription] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/users/connexion", { email, mot_de_passe })
      .then((response) => {
        // Stockage de la variable d'authentification et du nom d'utilisateur dans localStorage
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("role", response.data.role);

        setIsLoggedIn(true);
        props.setIsLoggedIn(true);
        return navigate("/");
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion à l'API :", error);
        setRedirectToInscription(true);
      });
  };

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedEmail = localStorage.getItem("email");
    const storedId = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("role");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
      props.setIsLoggedIn(true);
      setEmail(storedEmail);
      setRole(storedRole);
    }
    if (storedId) {
      setUserId(storedId);
    }
  }, [props]);

  const handleGoToInscription = () => {
    setRedirectToInscription(true);
  };

  if (redirectToInscription) {
    return navigate("/inscription");
  }

  return (
    <>
      {isLoggedIn ? (
        <p>Bonjour {role} ! Vous êtes connecté.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="container_form_connexion">
            <h2>Connexion</h2>
            <div className="form_connexion">
              <div className="container_input_form">
                <label htmlFor="email">Email :</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="container_input_form mt15px">
                <label htmlFor="motDePasse">Mot de passe :</label>
                <input
                  type="password"
                  id="motDePasse"
                  required
                  value={mot_de_passe}
                  onChange={(event) => setMotDePasse(event.target.value)}
                />
              </div>
              <div className="container_btn_multiple_tasks">
                <button type="submit">Se connecter</button>
                <button className="mt15px" type="button" onClick={handleGoToInscription}>
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Connexion;
