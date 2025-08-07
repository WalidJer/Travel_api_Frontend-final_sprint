import React, { useEffect, useState } from "react";
import { getAllFlights, createFlight } from "../services/flightService";
import { listAirports } from "../services/airportService";
import { listAirlines } from "../services/airlineService";
import { listAircraft } from "../services/aircraftService";
import { listGates } from "../services/gateService";
import BackButton from "../components/BackButton";
import BackButtonAdmin from "../components/BackButtonAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture, faPlusCircle } from "@fortawesome/free-solid-svg-icons";



const FlightAdminPage = () => {
  const [flights, setFlights] = useState([]);
  const [airports, setAirports] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [aircraft, setAircraft] = useState([]);
  const [gates, setGates] = useState([]);

  const [formData, setFormData] = useState({
    flightNumber: "",
    status: "",
    arrivalTime: "",
    departureTime: "",
    departureAirportId: "",
    arrivalAirportId: "",
    gateId: "",
    airlineId: "",
    aircraftId: "",
  });

  useEffect(() => {
    getAllFlights().then((res) => setFlights(res.data));
    listAirports().then((res) => setAirports(res.data));
    listAirlines().then((res) => setAirlines(res.data));
    listAircraft().then((res) => setAircraft(res.data));
    listGates().then((res) => setGates(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      flightNumber: formData.flightNumber,
      status: formData.status,
      arrivalTime: formData.arrivalTime,
      departureTime: formData.departureTime,
      departureAirport: { id: formData.departureAirportId },
      arrivalAirport: { id: formData.arrivalAirportId },
      gate: { id: formData.gateId },
      airline: { id: formData.airlineId },
      aircraft: { id: formData.aircraftId },
    };

    createFlight(payload)
      .then((res) => {
        setFlights((prev) => [...prev, res.data]);
        setFormData({
          flightNumber: "",
          status: "",
          arrivalTime: "",
          departureTime: "",
          departureAirportId: "",
          arrivalAirportId: "",
          gateId: "",
          airlineId: "",
          aircraftId: "",
        });
      })
      .catch((err) => console.error("Error creating flight:", err));
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">
        <FontAwesomeIcon icon={faPlaneDeparture} style={{ marginRight: "10px" }} />
        Manage Flights
      </h2>

      <form onSubmit={handleSubmit} className="flight-form">
        <input name="flightNumber" placeholder="Flight #" value={formData.flightNumber} onChange={handleChange} required />
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="">-- Select Status --</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="ON_TIME">On Time</option>
          <option value="BOARDING">Boarding</option>
          <option value="IN_AIR">In Air</option>
          <option value="LANDED">Landed</option>
          <option value="DELAYED">Delayed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <input name="arrivalTime" placeholder="Arrival Time" value={formData.arrivalTime} onChange={handleChange} />
        <input name="departureTime" placeholder="Departure Time" value={formData.departureTime} onChange={handleChange} />

        <select name="departureAirportId" value={formData.departureAirportId} onChange={handleChange}>
          <option value="">-- Departure Airport --</option>
          {airports.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <select name="arrivalAirportId" value={formData.arrivalAirportId} onChange={handleChange}>
          <option value="">-- Arrival Airport --</option>
          {airports.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <select name="gateId" value={formData.gateId} onChange={handleChange}>
          <option value="">-- Select Gate --</option>
          {gates.map((g) => (
            <option key={g.id} value={g.id}>
              {g.gateNumber}
            </option>
          ))}
        </select>

        <select name="airlineId" value={formData.airlineId} onChange={handleChange}>
          <option value="">-- Select Airline --</option>
          {airlines.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <select name="aircraftId" value={formData.aircraftId} onChange={handleChange}>
          <option value="">-- Select Aircraft --</option>
          {aircraft.map((a) => (
            <option key={a.id} value={a.id}>
              {a.model}
            </option>
          ))}
        </select>

        <button type="submit">
          <FontAwesomeIcon icon={faPlusCircle} className="icon-left" />
          Add Flight
        </button>
      </form>

      <table className="flight-table">
        <thead>
          <tr>
            <th>Flight #</th>
            <th>Status</th>
            <th>Arrival</th>
            <th>Departure</th>
            <th>From</th>
            <th>To</th>
            <th>Airline</th>
            <th>Aircraft</th>
            <th>Gate</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((f) => (
            <tr key={f.id}>
              <td>{f.flightNumber}</td>
              <td>{f.status}</td>
              <td>{f.arrivalTime}</td>
              <td>{f.departureTime}</td>
              <td>{f.departureAirport?.name}</td>
              <td>{f.arrivalAirport?.name}</td>
              <td>{f.airline?.name}</td>
              <td>{f.aircraft?.model}</td>
              <td>{f.gate?.gateNumber}</td>
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

export default FlightAdminPage;