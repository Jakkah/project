import { useState, useEffect } from "react";
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";
import axios from "axios";

const Client = () => {
  const [Clients, setClients] = useState();
  const [Loading, setLoading] = useState(true);
  const API_URL = "http://localhost:5000/api/users/client";

  const ClientCard = () => {
    return Clients.map((client, index) => (
      <Col sm="6">
        <Card body key={index}>
          <CardTitle tag="h5">{client.username}</CardTitle>
          <CardText>{client.description}</CardText>
          <Button>More</Button>
        </Card>
      </Col>
    ));
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(API_URL);
      setClients(result.data);
      setLoading(false);
    };
    fetchData();
  }, [Loading]);

  return (
    <Row className="m-3">{!Loading ? <ClientCard /> : <h1>Loading</h1>}</Row>
  );
};

export default Client;
