import { useState, useEffect } from "react";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import axios from "axios";

const Client = () => {
  const [Clients, setClients] = useState();
  const [Loading, setLoading] = useState(true);
  const API_URL = "http://localhost:5000/api/users/";

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(API_URL + "client");
      setClients(result.data);
      setLoading(false);
    };
    fetchData();
  }, [Loading]);

  const HandleDelete = (e) => {
    e.preventDefault();
    const id = e.target.id;

    const DeleteClient = async () => {
      try {
        await axios.delete(API_URL + id);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(true);
      }
    };
    DeleteClient();
  };

  const ClientCard = () => {
    return Clients.map((client, index) => (
      <Col sm="6">
        <Card body key={index}>
          <Button
            close
            className="close_btn"
            onClick={HandleDelete}
            id={client._id}
          >
            X
          </Button>
          <CardTitle tag="h5">{client.username}</CardTitle>
          <CardText>{client.description}</CardText>
          <Button>Détails</Button>
        </Card>
      </Col>
    ));
  };

  return (
    <Row className="m-3">
      {!Loading ? <ClientCard /> : <Spinner color="primary" />}
    </Row>
  );
};

export default Client;
