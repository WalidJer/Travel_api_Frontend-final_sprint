import React, { useEffect, useState } from 'react'
import { listAirports } from '../services/airportService';
import{ useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {

  const [airports , setAirpots]= useState([])
  const [selectedAirport, setSelectedAirport] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    listAirports()
      .then((response) => {
        setAirpots(response.data);
      })
      .catch((error) => {
        console.error("error fetching airports:", error);
      });
  }, []);

    
  const handleView = (type) => {
    if (selectedAirport) {
      navigate(`/airport/${selectedAirport}/` + type);
    }
  };
  return (

    <div className="hero">

      <div className="home-container">
        <h1 className="home-title"><FontAwesomeIcon icon={faPlane} />Welcome to the Flight Tracker<FontAwesomeIcon icon={faPlane}  flip="horizontal" /></h1>

        <div className="form-group">
          <label htmlFor="airport-select">Select Airport:</label>
          <select
            id="airport-select"
            value={selectedAirport}
            onChange={(e) => setSelectedAirport(e.target.value)}
          >
            <option value="">-- Choose an airport --</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.name} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        <div className="button-group">
          <button
            disabled={!selectedAirport}
            onClick={() => handleView("arrivals")}
          >
            View Arrivals
          </button>
          <button
            disabled={!selectedAirport}
            onClick={() => handleView("departures")}
          >
            View Departures
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage