import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDeparturesByAirport } from "../services/flightService";
import { getAirportById } from "../services/airportService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlaneDeparture} from '@fortawesome/free-solid-svg-icons';
import BackButton from "../components/BackButton";


const DeparturesPage = () => {
  const { id } = useParams();
  const [departures, setDepartures] = useState([]);
  const [airportName, setAirportName] = useState([]);

  useEffect(() => {
    getDeparturesByAirport(id)
      .then((res) => setDepartures(res.data))
      .catch((err) => console.error("Error fetching departures", err));

    getAirportById(id)
      .then((res) => setAirportName(`${res.data.name} (${res.data.code})`))
      .catch((err) => console.error("Error fetching airport info", err));
  }, [id]);

  return (
    <div className="departures-container">
      
      <h2> <FontAwesomeIcon icon={faPlaneDeparture} />  &nbsp;  Departures for {airportName}</h2>
      <table className="departures-table">
        <thead>
          <tr>
            <th>Flight #</th>
            <th>Status</th>
            <th>Departure Time</th>
            <th>To</th>
            <th>Airline</th>
          </tr>
        </thead>
        <tbody>
          {departures.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.flightNumber}</td>
              <td>{flight.status}</td>
              <td>{flight.departureTime}</td>
              <td>{flight.arrivalAirport?.name}</td>
              <td>{flight.airline?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BackButton style={{ marginTop: "50px", marginLeft: "550px"}}/>
    </div>
  );
};

export default DeparturesPage;