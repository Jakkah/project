import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Label, Button } from "reactstrap";

import "./Register.css";
import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vUsername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, mail, password, password2, type).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  const handleName = (e) => {
    setUsername(e.target.value);
  };
  const handleMail = (e) => {
    setMail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
  };
  const handleType = (e) => {
    setType(e.target.value);
  };

  const user = AuthService.getCurrentUser();
  if (user.type !== "admin") {
    return <h2>Vous n'avez pas les droits pour consulter ce contenu !</h2>;
  }
  return (
    <div className="register">
      <Form noValidate onSubmit={handleSubmit} ref={form}>
        {!successful && (
          <div>
            <div className="form-group">
              <Label htmlFor="name">Nom</Label>
              <Input
                type="text"
                className="form-control"
                name="name"
                value={username}
                onChange={handleName}
                id="name"
                validations={[required, vUsername]}
              />
            </div>
            <div className="form-group">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={handleMail}
                value={mail}
                className="form-control"
                name="email"
                id="email"
                type="email"
                validations={[required, vEmail]}
              />
            </div>
            <div className="form-group">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                onChange={handlePassword}
                value={password}
                className="form-control"
                name="password"
                id="password"
                type="password"
                validations={[required, vpassword]}
              />
            </div>
            <div className="form-group">
              <Label htmlFor="password2">Confirmer mot de passe</Label>
              <Input
                onChange={handlePassword2}
                value={password2}
                className="form-control"
                name="password2"
                id="password2"
                type="password"
              />
            </div>
            <div className="form-group">
              <Label htmlFor="type">Type</Label>
              <Select
                onChange={handleType}
                value={type}
                id="type"
                className="form-control"
                name="type"
              >
                <option value=""></option>
                <option value="Client">Client</option>
                <option value="Candidat">Candidat</option>
              </Select>
            </div>
            <div className="form-group">
              <Button className="mt-2 form-control">Sign up</Button>
            </div>
          </div>
        )}
        {message && (
          <div className="form-group">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  );
};

export default Register;
