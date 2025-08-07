import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCity,
  faPlaneDeparture,
  faBuilding,
  faPlane,
  faSignInAlt,
  faPlaneArrival,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import BackButton from "../components/BackButton";

const AdminPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (section) => {
    navigate(`/admin/${section}`);
  };

  return (
    <div className="admin-container">
      
      <h1>Admin Dashboard</h1>
      <p>Select a section to manage:</p>
      <div className="admin-buttons">
        <button onClick={() => handleNavigate("cities")}>
          <FontAwesomeIcon icon={faCity} /> Cities
        </button>
        <button onClick={() => handleNavigate("airports")}>
          <FontAwesomeIcon icon={faPlaneDeparture} /> Airports
        </button>
        <button onClick={() => handleNavigate("airlines")}>
          <FontAwesomeIcon icon={faBuilding} /> Airlines
        </button>
        <button onClick={() => handleNavigate("aircrafts")}>
          <FontAwesomeIcon icon={faPlane} /> Aircrafts
        </button>
        <button onClick={() => handleNavigate("gates")}>
          <FontAwesomeIcon icon={faSignInAlt} /> Gates
        </button>
        <button onClick={() => handleNavigate("flights")}>
          <FontAwesomeIcon icon={faPlaneArrival} /> Flights
        </button>
        <button onClick={() => handleNavigate("passengers")}>
          <FontAwesomeIcon icon={faUser} /> Passengers
        </button>
      </div>
      <BackButton style={{ marginTop: "50px", marginLeft: "400px"}} />
    </div>
    
  );
};

export default AdminPage;