import React from "react";
import AuthService from "../services/auth.service";

const createHistory = require("history").createBrowserHistory;
const history = createHistory();

const Dashboard = () => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) {
    history.push("/");
    window.location.reload();
  }
  return (
    <div className="container">
      <h1>DashBoard</h1>
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Compétences:</strong>
      <ul>{currentUser.skills}</ul>
    </div>
  );
};

export default Dashboard;
