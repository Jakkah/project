import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button,
} from "reactstrap";

const createHistory = require("history").createBrowserHistory;
const history = createHistory();
const deconnecter = () => {
  localStorage.removeItem("user");
  history.push("/");
  window.location.reload();
};

const Menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const AccountType = props.AccountType;
  if (AccountType !== "admin") {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/dashboard">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/contact"> Contact </NavLink>
              </NavItem>
            </Nav>
            <NavbarText>
              <Button onClick={deconnecter}>Déconnexion</Button>
            </NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/profil">Profil</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Offres">Offres</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>
              <Button onClick={deconnecter}>Déconnexion</Button>
            </NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
};

export default Menu;
