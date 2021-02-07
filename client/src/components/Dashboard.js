import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";
import {
  Jumbotron,
  Spinner,
  Button,
  ListGroup,
  ListGroupItem,
  CardImg,
  Input,
  Form,
  Container,
  Row,
  Col,
} from "reactstrap";
import "./Dashboard.css";

const createHistory = require("history").createBrowserHistory;
const history = createHistory();

const Dashboard = () => {
  const currentUser = AuthService.getCurrentUser();
  const API_URL = "http://localhost:5000/api/users/" + currentUser.id;
  if (!currentUser) {
    history.push("/");
    window.location.reload();
  }

  const [image, ChangeImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [showIt, setShowIt] = useState(false);
  const [newElement, setNewElement] = useState("");
  const [data, setData] = useState();
  const [Loading, setLoading] = useState(true);
  const [ListSkill, setListSkill] = useState([]);
  const [ListExp, setListExp] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(API_URL);
      setData(result.data);
      setListSkill(result.data.skills);
      setListExp(result.data.exp);
      setLoading(false);
    };
    fetchData();
  }, [Loading]);

  const update = () => {
    setShowIt(!showIt);
    console.log(showIt);
  };

  const handleNewElement = (e) => {
    setNewElement(e.target.value);
  };

  const AddSkill = async (e) => {
    e.preventDefault();
    let skills = [];
    try {
      skills = [...ListSkill, newElement];
    } catch (error) {
    } finally {
      return await axios
        .patch(API_URL + "/update", { skills })
        .then((response) => {
          if (response.status === 200) {
            setLoading(true);
          }
          return response;
        });
    }
  };
  const AddExp = async (e) => {
    e.preventDefault();
    let exp = [];
    try {
      exp = [...ListExp, newElement];
    } catch (error) {
    } finally {
      return await axios
        .patch(API_URL + "/update", { exp })
        .then((response) => {
          if (response.status === 200) {
            setLoading(true);
          }
          return response;
        });
    }
  };

  return (
    <div className="container">
      {!Loading ? (
        <Container>
          <Jumbotron>
            <CardImg
              src={image}
              className="pull-right float-right img-fluid d-none d-sm-block image"
              alt="profil_image"
            />
            <div>
              <h3>{data.username}</h3>
              <h6>{data.job}</h6>
            </div>
            <p>{data.email}</p>
          </Jumbotron>
        </Container>
      ) : (
        <Spinner color="primary" />
      )}
      <Container>
        <row>
          <ListGroup>
            <h4>Compétences</h4>
            {!Loading ? (
              ListSkill.map((skill, index) => {
                return <ListGroupItem key={index}>{skill}</ListGroupItem>;
              })
            ) : (
              <Spinner color="primary" />
            )}
          </ListGroup>

          <Form className="col-12" onSubmit={AddSkill}>
            <Input
              type="text"
              name="newSkill"
              id="newSkill"
              placeholder="Ajouter une compétence"
              value={newElement}
              onChange={handleNewElement}
            />
            <Button> Ajouter </Button>
          </Form>
        </row>
        <row>
          <ListGroup>
            <h4>Expériences</h4>
            {!Loading ? (
              ListExp.map((exp, index) => {
                return <ListGroupItem key={index}>{exp}</ListGroupItem>;
              })
            ) : (
              <Spinner color="primary" />
            )}
          </ListGroup>

          <Form className="col-12" onSubmit={AddExp}>
            <Input
              type="text"
              name="newSkill"
              id="newSkill"
              placeholder="Ajouter une expérience"
              value={newElement}
              onChange={handleNewElement}
            />
            <Button> Ajouter </Button>
          </Form>
        </row>
      </Container>
    </div>
  );
};

export default Dashboard;
