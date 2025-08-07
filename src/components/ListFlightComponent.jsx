import React, {useEffect, useState} from 'react'
import { listFlights } from '../services/flightService';

const ListFlightComponent = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    listFlights()
      .then((response) => {
        setFlights(response.data);
      })
      .catch((error) => {
        console.error("Error fetching flights:", error);
      });
  }, []);

  return (
    <div>
      <h2>Flights</h2>
      <table>
        <thead>
          <tr>
            <th>Flight #</th>
            <th>Status</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Airline</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.flightNumber}</td>
              <td>{flight.status}</td>
              <td>{flight.departureTime}</td>
              <td>{flight.arrivalTime}</td>
              <td>{flight.airline?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListFlightComponent;