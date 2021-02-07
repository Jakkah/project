import React, { useState, useEffect } from "react";

import axios from "axios";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
  Container,
  Button,
  Spinner,
} from "reactstrap";

const Offre = (props) => {
  const [Clients, setClients] = useState();
  const [Loading, setLoading] = useState(true);
  const [Title, setTitle] = useState();
  const [SelectedCient, setSelectedClient] = useState();
  const API_URL = "http://localhost:5000/api/users/client";

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(API_URL);
      setClients(result.data);
      setLoading(false);
    };
    fetchData();
  }, [Loading]);

  const ClientSelect = () => {
    return (
      <>
        {Clients.map((client, index) => (
          <option id={index} key={client.id} value={client.userame}>
            {client.username}
          </option>
        ))}
        ;
      </>
    );
  };

  const HandleTitle = (e) => {
    setTitle(e.target.value);
  };

  const HandleSelectedClient = (e) => {
    setSelectedClient(e.target.value);
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    console.log(SelectedCient, Title);
  };

  return (
    <Container fluid="xl">
      <Form
        inline
        className="pt-5 mx-auto"
        style={{ width: "500px" }}
        onSubmit={HandleSubmit}
      >
        <FormGroup>
          <Input
            type="text"
            name="text"
            id="Text"
            value={Title}
            placeholder="Intitulé"
            onChange={HandleTitle}
          />
          <Input
            type="select"
            name="Objet"
            id="Objet"
            onChange={HandleSelectedClient}
          >
            {!Loading ? (
              <>
                <option></option>
                <ClientSelect />
              </>
            ) : (
              <Spinner color="primary" />
            )}
          </Input>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </Container>
  );
};
export default Offre;
