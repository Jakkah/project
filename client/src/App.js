import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import "holderjs";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";

import Menu from "./components/Menu";
import Offre from "./components/Offre";
import Login from "./components/Login";
import Profil from "./components/Profil";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Formulaire from "./components/Formulaire";

function App() {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(`${user.type}`);
      setShowAdminBoard(user.type.includes("admin"));
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
            <Offre />
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
