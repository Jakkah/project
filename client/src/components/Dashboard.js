import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";

const createHistory = require("history").createBrowserHistory;
const history = createHistory();

const Dashboard = () => {
  const currentUser = AuthService.getCurrentUser();
  const [data, setData] = useState({});

  if (!currentUser) {
    history.push("/");
    window.location.reload();
  }
  useEffect(() => {
    const API_URL = "http://localhost:5000/api/users/" + currentUser.id;

    const fetchData = async () => {
      const result = await axios(API_URL);

      setData(result.data);
    };

    fetchData();
  }, []);
  console.log(data);
  return (
    <div className="container">
      <h1>DashBoard</h1>
      <header className="jumbotron">
        <h3>
          <strong>{data.username}</strong>
        </h3>
        <p>{data.type}</p>
      </header>
      <h4>Metier</h4>
      <button>X</button>
      <h4>Compétences: {data.skills}</h4>
    </div>
  );
};

export default Dashboard;
