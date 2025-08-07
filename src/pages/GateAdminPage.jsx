import React, { useEffect, useState } from "react";
import { createGate, listGates } from "../services/gateService";
import { listAirports } from "../services/airportService";
import BackButton from "../components/BackButton";
import BackButtonAdmin from "../components/BackButtonAdmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faPlusCircle } from "@fortawesome/free-solid-svg-icons";


const GateAdminPage = () => {
  const [gates, setGates] = useState([]);
  const [airports, setAirports] = useState([]);
  const [formData, setFormData] = useState({
    gateNumber: "",
    terminal: "",
    airportId: ""
  });

  useEffect(() => {
    listGates().then((res) => setGates(res.data));
    listAirports().then((res) => setAirports(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      gateNumber: formData.gateNumber,
      terminal: formData.terminal,
      airport: { id: formData.airportId }
    };

    createGate(payload).then((res) => {
      setGates((prev) => [...prev, res.data]);
      setFormData({
        gateNumber: "",
        terminal: "",
        airportId: ""
      });
    });
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">
        <FontAwesomeIcon icon={faDoorOpen} className="icon-left" />
        Manage Gates
      </h2>

      <form onSubmit={handleSubmit} className="gate-form">
        <input
          name="gateNumber"
          placeholder="Gate Number"
          value={formData.gateNumber}
          onChange={handleChange}
          required
        />
        <input
          name="terminal"
          placeholder="Terminal"
          value={formData.terminal}
          onChange={handleChange}
          required
        />
        <select
          name="airportId"
          value={formData.airportId}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Airport --</option>
          {airports.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <button type="submit">
          <FontAwesomeIcon icon={faPlusCircle} className="icon-left" />
          Add Gate
        </button>
      </form>

      <table className="gate-table">
        <thead>
          <tr>
            <th>Gate #</th>
            <th>Terminal</th>
            <th>Airport</th>
          </tr>
        </thead>
        <tbody>
          {gates.map((g) => (
            <tr key={g.id}>
              <td>{g.gateNumber}</td>
              <td>{g.terminal}</td>
              <td>{g.airport?.name}</td>
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

export default GateAdminPage;