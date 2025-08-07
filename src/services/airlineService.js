import axios from "axios";
const BASE_URL = "http://localhost:8080";

export const listAirlines = () => axios.get(`${BASE_URL}/airlines`);
export const createAirline = (airlineData) => axios.post(`${BASE_URL}/airlines`, airlineData);