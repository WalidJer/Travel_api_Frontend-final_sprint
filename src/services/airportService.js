import axios from "axios";

// const BASE_URL = "http://localhost:8080";
const BASE_URL = "http://54.86.3.244:8080";

export const listAirports = () => {
  return axios.get(`${BASE_URL}/airports`);
};

export const createAirport = (DataAirport) => axios.post(`${BASE_URL}/airports`, DataAirport);

export const getAirportById = (id) => axios.get(`${BASE_URL}/airports/${id}`);