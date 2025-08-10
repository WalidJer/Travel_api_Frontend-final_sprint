import axios from "axios";
// const BASE_URL = "http://localhost:8080";
const BASE_URL = "http://54.86.3.244:8080";

export const listAircraft= () => axios.get(`${BASE_URL}/aircrafts`);
export const createAircraft = (AircraftData) => axios.post(`${BASE_URL}/aircrafts`, AircraftData);