import React, { useState } from "react";
import { Form, FormGroup, Label, Input, FormText, Button } from "reactstrap";

const Formulaire = (props) => {
  return (
    <Form className="pt-5 mx-auto" style={{ width: "500px" }}>
      <FormGroup>
        <Label for="Objet" hidden>
          Select
        </Label>
        <Input type="select" name="Objet" id="Objet">
          <option>Problème technique</option>
          <option>Demande d'information</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="Text" hidden>
          Text Area
        </Label>
        <Input
          type="textarea"
          name="text"
          id="Text"
          placeholder="En quoi puis-je vous aider ?"
        />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
};
export default Formulaire;
