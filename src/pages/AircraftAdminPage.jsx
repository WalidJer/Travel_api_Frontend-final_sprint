import React, { useEffect, useState } from "react";
import {createAircraft, listAircraft } from "../services/aircraftService";
import { listAirlines } from "../services/airlineService";
import BackButton from "../components/BackButton";
import BackButtonAdmin from "../components/BackButtonAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneUp, faPlusCircle } from "@fortawesome/free-solid-svg-icons";


const AircraftAdminPage = () => {
  const [aircrafts, setAircrafts] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [formData, setFormData] = useState({
    model: "",
    capacity: "",
    airlineId: "",
  });

  useEffect(() => {
    listAircraft().then((res) => setAircrafts(res.data));
    listAirlines().then((res) => setAirlines(res.data));
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
      model: formData.model,
      capacity: parseInt(formData.capacity),
      airline: { id: formData.airlineId },
    };

    createAircraft(payload).then((res) => {
      setAircrafts((prev) => [...prev, res.data]);
      setFormData({ model: "", capacity: "", airlineId: "" });
    });
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">
        <FontAwesomeIcon icon={faPlaneUp} style={{ marginRight: "10px" }} />
        Manage Aircrafts
      </h2>

      <form onSubmit={handleSubmit} className="aircraft-form">
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />
        <select
          name="airlineId"
          value={formData.airlineId}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Airline --</option>
          {airlines.map((airline) => (
            <option key={airline.id} value={airline.id}>
              {airline.name}
            </option>
          ))}
        </select>
        
        <button type="submit">
          <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: "6px" }} />
          Add Aircraft
        </button>
      </form>

      <table className="aircraft-table">
        <thead>
          <tr>
            <th>Model</th>
            <th>Capacity</th>
            <th>Airline</th>
          </tr>
        </thead>
        <tbody>
          {aircrafts.map((aircraft) => (
            <tr key={aircraft.id}>
              <td>{aircraft.model}</td>
              <td>{aircraft.capacity}</td>
              <td>{aircraft.airline?.name}</td>
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

export default AircraftAdminPage;