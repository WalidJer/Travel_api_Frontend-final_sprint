import axios from "axios";
// const BASE_URL = "http://localhost:8080";
const BASE_URL = "http://54.86.3.244:8080";

export const listPassengers = () => axios.get(`${BASE_URL}/passengers`);

export const createPassenger = (passengerData) => axios.post(`${BASE_URL}/passengers`, passengerData);