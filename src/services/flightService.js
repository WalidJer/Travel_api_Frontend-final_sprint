import axios from "axios";
const BASE_URL = "http://localhost:8080";

export const listFlights = () => axios.get(`${BASE_URL}/flights`);
export const getArrivalsByAirport = (id) =>
  axios.get(`${BASE_URL}/flights/arrivals/${id}`);
export const getDeparturesByAirport = (id) =>
  axios.get(`${BASE_URL}/flights/departures/${id}`);
export const getAllFlights = () => {
  return axios.get(`${BASE_URL}/flights`);
};

export const createFlight = (flightData) => {
  return axios.post(`${BASE_URL}/flights`, flightData);
};