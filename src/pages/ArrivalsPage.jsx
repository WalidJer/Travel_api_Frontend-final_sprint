import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArrivalsByAirport } from "../services/flightService";
import { getAirportById } from "../services/airportService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlaneArrival} from '@fortawesome/free-solid-svg-icons';
import BackButton from "../components/BackButton";
import BackButtonAdmin from "../components/BackButtonAdmin";


const ArrivalsPage = () => {
  const { id } = useParams();
  const [arrivals, setArrivals] = useState([]);
    const [airportName, setAirportName] = useState("");

  useEffect(() => {
    getArrivalsByAirport(id)
      .then((res) => setArrivals(res.data))
      .catch((err) => console.error("Error fetching arrivals", err));

    getAirportById(id)
      .then((res) => setAirportName(`${res.data.name} (${res.data.code})`))
      .catch((err) => console.error("Error fetching airport info", err));
  
  }, [id]);

  

  return (
    <div className="arrivals-container">
      
      <h2><FontAwesomeIcon icon={faPlaneArrival} /> &nbsp; Arrivals for {airportName}</h2>
      <table className="arrivals-table">
        <thead>
          <tr>
            <th>Flight #</th>
            <th>Status</th>
            <th>Arrival Time</th>
            <th>From</th>
            <th>Airline</th>
          </tr>
        </thead>
        <tbody>
          {arrivals.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.flightNumber}</td>
              <td>{flight.status}</td>
              <td>{flight.arrivalTime}</td>
              <td>{flight.departureAirport?.name}</td>
              <td>{flight.airline?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BackButton style={{ marginTop: "50px", marginLeft: "550px"}}/>
      
    </div>
  );
};

export default ArrivalsPage;