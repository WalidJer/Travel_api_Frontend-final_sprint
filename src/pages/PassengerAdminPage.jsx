import React, { useEffect, useState } from "react";
import { listPassengers, createPassenger } from "../services/passengerService";
import { listCities } from "../services/cityService";
import { listFlights } from "../services/flightService";
import BackButton from "../components/BackButton";
import BackButtonAdmin from "../components/BackButtonAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserTie } from "@fortawesome/free-solid-svg-icons";


const PassengerAdminPage = () => {
  const [passengers, setPassengers] = useState([]);
  const [cities, setCities] = useState([]);
  const [flights, setFlights] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    passportNumber: "",
    cityId: "",
    flightIds: []
  });

  useEffect(() => {
    listPassengers().then(res => setPassengers(res.data));
    listCities().then(res => setCities(res.data));
    listFlights().then(res => setFlights(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "flightIds") {
      const selected = Array.from(e.target.selectedOptions, option => option.value);
      setFormData(prev => ({ ...prev, flightIds: selected }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      passportNumber: formData.passportNumber,
      city: { id: formData.cityId },
      flights: formData.flightIds.map(id => ({ id }))
    };

    createPassenger(payload).then(res => {
      setPassengers(prev => [...prev, res.data]);
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        passportNumber: "",
        cityId: "",
        flightIds: []
      });
    });
  };

  return (
    <div className="admin-container">
    <h2 className="admin-title">
      <FontAwesomeIcon icon={faUserTie} className="mr-2 text-indigo-800" />
      Manage Passengers
    </h2>

    <form className="passenger-form" onSubmit={handleSubmit}>
        <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
        <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
        <input name="passportNumber" value={formData.passportNumber} onChange={handleChange} placeholder="Passport Number" required />

        <select name="cityId" value={formData.cityId} onChange={handleChange} required>
            <option value="">-- Select City --</option>
            {cities.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
            ))}
        </select>

        <select
            name="flightIds"
            value={formData.flightIds}
            onChange={handleChange}
            multiple
            required
        >
            {flights.map(f => (
            <option key={f.id} value={f.id}>
                {f.flightNumber}
            </option>
            ))}
        </select>

        <button type="submit">
          <FontAwesomeIcon icon={faUserPlus} className="mr-1" />
          Add Passenger
        </button>
    </form>

      <table className="passenger-table">
        <thead>
          <tr>
            <th>Name</th><th>Phone</th><th>Passport</th><th>City</th><th>Flights</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map(p => (
            <tr key={p.id}>
              <td>{p.firstName} {p.lastName}</td>
              <td>{p.phoneNumber}</td>
              <td>{p.passportNumber}</td>
              <td>{p.city?.name}</td>
              <td>{p.flights?.map(f => f.flightNumber).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "50px" }}>
        <BackButton />
        <BackButtonAdmin />
      </div>
    </div>
  );
};

export default PassengerAdminPage;