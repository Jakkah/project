import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getCandidatBoard = () => {
  return axios.get(API_URL + "candidat", { headers: authHeader() });
};

const getClientBoard = () => {
  return axios.get(API_URL + "client", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getCandidatBoard,
  getClientBoard,
  getAdminBoard,
};
