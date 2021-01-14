import "./App.css";
import React, { useState, useEffect } from "react";
import Menu from "./components/Menu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profil from "./components/Profil";
import Formulaire from "./components/Formulaire";
import "holderjs";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";

import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

// import BoardCandidat from "./components/BoardCandidat";
// import BoardClient from "./components/BoardClient";
// import BoardAdmin from "./components/BoardAdmin";

function App() {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(`${user.type}`);
      console.log(currentUser);
      setShowAdminBoard(user.type.includes("admin"));
      console.log(showAdminBoard);
    }
  }, [currentUser]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Menu AccountType={currentUser} />
            <Dashboard />
          </Route>
          <Route path="/profil">
            <Menu AccountType={currentUser} />
            <Profil />
          </Route>
          <Route path="/offres">
            <Menu AccountType={currentUser} />
            <h2>Offres</h2>
          </Route>
          <Route path="/contact">
            <Menu AccountType={currentUser} />
            <Formulaire />
          </Route>
          <Route path="/register">
            <Menu AccountType={currentUser} />
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
