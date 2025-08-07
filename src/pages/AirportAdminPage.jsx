import React, { useEffect, useState } from "react";
import { listCities } from "../services/cityService";
import { createAirport, listAirports } from "../services/airportService";
import BackButton from "../components/BackButton";
import BackButtonAdmin from "../components/BackButtonAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture, faPlusCircle } from "@fortawesome/free-solid-svg-icons";


const AirportAdminPage = () => {
  const [airports, setAirports] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    cityId: "",
  });

  useEffect(() => {
    listAirports().then((res) => setAirports(res.data));
    listCities().then((res) => setCities(res.data));
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
      name: formData.name,
      code: formData.code,
      city: { id: formData.cityId },
    };

    createAirport(payload).then((res) => {
      setAirports((prev) => [...prev, res.data]);
      setFormData({ name: "", code: "", cityId: "" });
    });
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">
        <FontAwesomeIcon icon={faPlaneDeparture} className="mr-2 text-sky-700" />
        Manage Airports
      </h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          name="name"
          placeholder="Airport Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="code"
          placeholder="Airport Code"
          value={formData.code}
          onChange={handleChange}
          required
        />
        <select name="cityId" value={formData.cityId} onChange={handleChange} required>
          <option value="">-- Select City --</option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button type="submit">
          <FontAwesomeIcon icon={faPlusCircle} className="mr-1" />
          Add Airport
        </button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {airports.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.code}</td>
              <td>{a.city?.name}</td>
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

export default AirportAdminPage;