import axios from "axios";
const BASE_URL = "http://localhost:8080";

export const listCities= () => axios.get(`${BASE_URL}/cities`);
export const createCity = (cityData) => axios.post(`${BASE_URL}/cities`, cityData);