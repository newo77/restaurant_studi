import React, { useState, useEffect } from "react";
import axios from "axios";

function Footer() {
  const [editing, setEditing] = useState(false);
  const [openHours, setOpenHours] = useState([]);
  const isAdmin = localStorage.getItem("role") === "admin";

  useEffect(() => {
    axios
      .get("http://localhost:3001/open_hours")
      .then((response) => {
        setOpenHours(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEdit = (index) => {
    setEditing(true);
    setCurrentOpenHours(openHours[index]);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:3001/open_hours", {
        id: currentOpenHours.id,
        hours_open: currentOpenHours.hours_open,
        hours_close: currentOpenHours.hours_close,
      })
      .then((response) => {
        setOpenHours(false);
        setEditing(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        axios
          .get("http://localhost:3001/open_hours")
          .then((response) => {
            setOpenHours(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentOpenHours((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [currentOpenHours, setCurrentOpenHours] = useState({});

  return (
    <footer>
      <div id="opening-hours">
        <h3 className="title_opening_hours">Horaires d'ouverture</h3>
        {!editing ? (
          <ul isAdmin className="container_hours_footer">
            {Array.isArray(openHours) &&
              openHours.map((hours, index) => (
                <li key={index}>
                  {hours.day}: {hours.hours_open} - {hours.hours_close}
                  {isAdmin && (
                    <button onClick={() => handleEdit(index)}>Modifier</button>
                  )}
                </li>
              ))}
          </ul>
        ) : (
          <form className="container_footer_edit" onSubmit={handleSave}>
            <label className="text_edit_label">
              Heure d'ouverture:
              <input className="edit_time"
                type="time"
                name="hours_open"
                value={currentOpenHours.hours_open || ""}
                onChange={handleChange}
              />
            </label>
            <label className="text_edit_label">
              Heure de fermeture:
              <input className="edit_time"
                type="time"
                name="hours_close"
                value={currentOpenHours.hours_close || ""}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={handleCancel}>
              Annuler
            </button>
          </form>
        )}
      </div>
    </footer>
  );
}

export default Footer;
