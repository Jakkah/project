import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

const register = (username, email, password, password2, type) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
    password2,
    type,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  console.log("rest");
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default { register, login, logout, getCurrentUser };
