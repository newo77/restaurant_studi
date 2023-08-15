import React, { useState, useEffect } from "react";
import axios from "axios";

//TODO permettre que le restaurant puisser fermer les réservations

const ReservationForm = () => {
  const [num_guests, setNumGuests] = useState(0);
  const [reservation_date, setDate] = useState("");
  const [reservation_time, setTime] = useState("");
  const [allergies, setAllergies] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [maxGuests, setMaxGuests] = useState(0);
  const [totalGuests, setTotalGuests] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchTimeSlots = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/open_hours/${reservation_date}`
      );
      setTimeSlots(response.data);
      setIsAvailable(true);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des heures d'ouverture :",
        error
      );
      setIsAvailable(false);
    }
  };
  // Maitenant manque plus que la réservation du restaurant 1 heure avant fermeture c mort!
  const fetchUserClient = async () => {
    try {
      const userId = localStorage.getItem("userId");

      // vérifier si userId est défini
      const response = await axios.get(`http://localhost:3001/users/${userId}`);
      const { convives, allergies } = response.data;
      setNumGuests(convives);
      setAllergies(allergies);
    } catch (error) {
      console.error("erreur lors du get:", error);
    }
  };

  const fetchMaxGuests = async () => {
    try {
      const response = await axios.get("http://localhost:3001/settings");
      setMaxGuests(response.data.max_convives);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de max_convives depuis la base de données :",
        error
      );
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await axios.get("http://localhost:3001/reservations");
      const additionnalGuests = response.data.reduce(
        (acc, reservation) => acc + reservation.num_guests,
        0
      );
      setTotalGuests(additionnalGuests);
      setReservations(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations :", error);
    }
  };

  useEffect(() => {
    fetchUserClient();
    fetchMaxGuests();
    fetchReservations();

    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, []);

  useEffect(() => {
    setIsAvailable(false);
    setTimeSlots([]);
    if (reservation_date) {
      fetchTimeSlots();
    }
  }, [reservation_date]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      if (num_guests > maxGuests) {
        alert(
          `Le nombre de convives doit être inférieur ou égal à ${maxGuests}.`
        );
        setIsSubmitting(false);
        return;
      }
      if (totalGuests + num_guests > maxGuests) {
        alert(
          `Le nombre maximal de convives a été atteint. Veuillez réduire le nombre de convives ou choisir une autre date/heure.`
        );
        setIsSubmitting(false);
        return;
      }
      await axios.post("http://localhost:3001/reservation-register", {
        num_guests,
        reservation_date,
        reservation_time,
        allergies,
      });
      alert("La réservation a été enregistrée avec succès !");
      setNumGuests(1);
      setDate("");
      setTime("");
      setAllergies("");
      setIsSubmitting(false);
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement de la réservation :",
        error
      );
      alert(
        "Erreur lors de l'enregistrement de la réservation. Veuillez réessayer."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container_form_reservation">
          <h2>Réservation</h2>
          <div className="form_reservation">
            <div className="container_input_form">
              <label htmlFor="num_guests">Nombre de convives :</label>
              <input
                type="number"
                id="num_guests"
                name="num_guests"
                value={num_guests}
                onChange={(e) => setNumGuests(parseInt(e.target.value))}
                min="1"
                max={maxGuests}
              />
            </div>
            <div className="container_input_form mt15px">
              <label htmlFor="reservation_date">Date :</label>
              <input
                type="date"
                id="reservation_date"
                name="reservation_date"
                value={reservation_date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().slice(0, 10)}
              />
            </div>
            <div className="container_input_form mt15px">
              <label htmlFor="reservation_time">Heure :</label>
              <select
                id="reservation_time"
                name="reservation_time"
                value={reservation_time}
                defaultValue={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setTime(e.target.value)}
                disabled={!isAvailable}
              >
                <option value="">--Choisir une heure--</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            <div className="container_input_form mt15px">
              <label htmlFor="allergies">Allergies :</label>
              <input
                type="text"
                id="allergies"
                name="allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
              />
            </div>
            <div className="container_btn_multiple_tasks mt15px">
              <button type="submit" disabled={isSubmitting}>
                Réserver
              </button>
              {isAdmin && (
                <button className="mt15px">
                  <a href="/restaurant-settings">Dashboard</a>
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ReservationForm;
