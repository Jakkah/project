import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";
import { Jumbotron, Button, ListGroup, ListGroupItem } from "reactstrap";
import "./Dashboard.css";

const createHistory = require("history").createBrowserHistory;
const history = createHistory();

const Dashboard = () => {
  const currentUser = AuthService.getCurrentUser().user;
  const [showIt, setShowIt] = useState(false);
  const update = () => {
    setShowIt(!showIt);
    console.log(showIt);
  };
  if (!currentUser) {
    history.push("/");
    window.location.reload();
  }
  const liste = Object.values(currentUser.skills);
  // useEffect(() => {
  //   const API_URL = "http://localhost:5000/api/users/" + currentUser.id;

  //   const fetchData = async () => {
  //     const result = await axios(API_URL);

  //     setData(result.data);
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="container">
      <h1>Tableau de bord</h1>
      <Jumbotron>
        <Button className="update" onClick={update}>
          X
        </Button>
        {showIt ? (
          <div>
            <input value={currentUser.username} />
          </div>
        ) : (
          <h3>{currentUser.username}</h3>
        )}
        {showIt ? (
          <div>
            <input value={currentUser.email} />
          </div>
        ) : (
          <p>{currentUser.email}</p>
        )}
        {showIt ? (
          <div>
            <input value={currentUser.type} />
          </div>
        ) : (
          <p>{currentUser.type}</p>
        )}
      </Jumbotron>
      <ListGroup>
        <h4>Compétences</h4>
        {liste.map((skill, index) => {
          return <ListGroupItem key={index}>{skill}</ListGroupItem>;
        })}
      </ListGroup>
    </div>
  );
};

export default Dashboard;
