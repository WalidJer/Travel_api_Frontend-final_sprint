import React, { useState, useEffect } from "react";
import { listCities, createCity } from "../services/cityService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import BackButtonAdmin from "../components/BackButtonAdmin";
import BackButton from "../components/BackButton";

const CityAdminPage = () => {
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    province: "",
    population: "",
  });

  useEffect(() => {
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
    createCity(formData).then((res) => {
      setCities((prev) => [...prev, res.data]);
      setFormData({
        name: "",
        province: "",
        population: "",
      });
    });
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">
        <FontAwesomeIcon icon={faCity} className="mr-2 text-blue-600" />
        Manage Cities
      </h2>
      <form className="city-form" onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          placeholder="City Name"
          onChange={handleChange}
          required
        />
        <input
          name="province"
          value={formData.province}
          placeholder="Province"
          onChange={handleChange}
        />
        <input
          name="population"
          value={formData.population}
          placeholder="Population"
          type="number"
          onChange={handleChange}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faPlusCircle} className="mr-1" />
          Add City
        </button>
      </form>

      <table className="city-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Province</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.province}</td>
              <td>{c.population}</td>
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

export default CityAdminPage;