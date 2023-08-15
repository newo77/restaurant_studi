import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [convives, setConvives] = useState("");
  const [allergies, setAllergies] = useState("");
  const [role, setRole] = useState("client");
  const [isAdminPresent, setIsAdminPresent] = useState(false); // variable d'état pour savoir si un admin est présent
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/admin")
      .then((response) => {
        setIsAdminPresent(response.data[0].count > 0);
        //renvoie un boolean si au moin un admin est présent en db
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/users", {
        email,
        mot_de_passe: password,
        convives,
        allergies,
        role,
      })
      .then((response) => {
        navigate("/connexion"); // Redirige vers la page de connexion
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container_form_inscription">
        <h2>Inscription</h2>
        <div className="form_inscription">
          <div className="container_input_form">
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          <div className="container_input_form mt15px">
            <label>
              Mot de passe:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <div className="container_input_form mt15px">
            <label>
              Convives par défaut :
              <input
                type="number"
                value={convives}
                min={"0"}
                onChange={(e) => setConvives(e.target.value)}
              />
            </label>
          </div>

          <div className="container_input_form mt15px">
            <label>
              Allergies :
              <input
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
              />
            </label>
          </div>
          {/* Afficher dynamiquement le select en fonction de la présence d'un admin */}
          {isAdminPresent ? null : (
            <div className="container_btn_multiple_tasks mt15px">
              <label>
                Rôle:
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="client">Client</option>
                  <option value="admin">Administrateur</option>
                </select>
              </label>
            </div>
          )}
          <div className="container_btn_multiple_tasks mt15px">
            <button className="mt15px" type="submit">
              Créer mon compte {role}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default RegistrationForm;
