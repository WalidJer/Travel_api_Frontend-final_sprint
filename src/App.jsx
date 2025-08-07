import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ArrivalsPage from "./pages/ArrivalsPage";
import DeparturesPage from "./pages/DeparturesPage";
import AdminPage from "./pages/AdminPage";
import Navbar from './components/Navbar';
import FlightAdminPage from "./pages/FlightAdminPage";
import AirlineAdminPage from './pages/AirlineAdminPage';
import AircraftAdminPage from './pages/AircraftAdminPage';
import GateAdminPage from './pages/GateAdminPage';
import AirportAdminPage from './pages/AirportAdminPage';
import CityAdminPage from './pages/CityAdminPage';
import PassengerAdminPage from './pages/PassengerAdminPage';

const App = () => {
  return (
    
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/airport/:id/arrivals" element={<ArrivalsPage />} />
        <Route path="/airport/:id/departures" element={<DeparturesPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/flights" element={<FlightAdminPage />} />
        <Route path="/admin/airlines" element={<AirlineAdminPage />} />
        <Route path="/admin/aircrafts" element={<AircraftAdminPage />} />
        <Route path="/admin/gates" element={<GateAdminPage />} />
        <Route path="/admin/airports" element={<AirportAdminPage />} />
        <Route path="/admin/cities" element={<CityAdminPage />} />
        <Route path="/admin/passengers" element={<PassengerAdminPage />} />

      
      </Routes>
    </Router>
    
  )
}

export default App
