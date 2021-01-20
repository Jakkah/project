import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";
import {
  Jumbotron,
  Button,
  ListGroup,
  ListGroupItem,
  CardImg,
  Input,
  Form,
} from "reactstrap";
import "./Dashboard.css";

const createHistory = require("history").createBrowserHistory;
const history = createHistory();

const Dashboard = () => {
  const currentUser = AuthService.getCurrentUser().user;
  const API_URL = "http://localhost:5000/api/users/" + currentUser._id;
  if (!currentUser) {
    history.push("/");
    window.location.reload();
  }

  const [image, ChangeImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [showIt, setShowIt] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [data, setData] = useState();
  const [Loading, setLoading] = useState(true);
  const [ListSkill, setListSkill] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(API_URL);
      setData(result.data);
      setListSkill(Object.values(result.data.skills));
      console.log(Loading);
      setLoading(false);
    };
    fetchData();
  }, [Loading]);

  const update = () => {
    setShowIt(!showIt);
    console.log(showIt);
  };

  const handleNewSkill = (e) => {
    setNewSkill(e.target.value);
  };

  const AddSkill = (e) => {
    e.preventDefault();
    ListSkill.push(newSkill);
    console.log(ListSkill);
    setLoading(true);
  };
  const Render = () => {
    return (
      <div>
        <h1>Tableau de bord</h1>
        <Jumbotron>
          <CardImg
            top
            src={image}
            className="pull-right float-right img-fluid d-none d-sm-block image"
            alt="profil_image"
          />
          <div>
            <h3>{data.username}</h3>
            <h6>{data.job}</h6>
          </div>
          <p>{data.email}</p>
          <p>{data.type}</p>
        </Jumbotron>

        <Button className="update float-right" onClick={update}>
          Update
        </Button>
        <ListGroup>
          <h4>Compétences</h4>
          {ListSkill.map((skill, index) => {
            return <ListGroupItem key={index}>{skill}</ListGroupItem>;
          })}
        </ListGroup>
        <Form className="col-12" onSubmit={AddSkill}>
          <Input
            type="text"
            name="newSkill"
            id="newSkill"
            placeholder="Ajouter une compétence"
            onChange={handleNewSkill}
          />
          <Button> Ajouter </Button>
        </Form>
      </div>
    );
  };

  return (
    <div className="container">{Loading ? <h1>Loading</h1> : <Render />}</div>
  );
};

export default Dashboard;
