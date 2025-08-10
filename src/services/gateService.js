import axios from "axios";
// const BASE_URL = "http://localhost:8080";
const BASE_URL = "http://54.86.3.244:8080";

export const listGates = () => axios.get(`${BASE_URL}/gates`);
export const createGate = (gateData) => axios.post(`${BASE_URL}/gates`, gateData);