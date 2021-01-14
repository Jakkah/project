import React from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Formulaire = (props) => {
    return (
        <Form className="pt-5 mx-auto" style={{ width: "500px" }}>
            <FormGroup>
                <Label for="Objet" hidden>Select</Label>
                <Input type="select" name="Objet" id="Objet">
                    <option>Problème technique</option>
                    <option>Demande d'information</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleText" hidden>Text Area</Label>
                <Input type="textarea" name="text" id="exampleText" />
            </FormGroup>
            <FormGroup>
                <Label for="exampleFile" hidden>File</Label>
                <Input type="file" name="file" id="exampleFile" />
                <FormText color="muted">
                    This is some placeholder block-level help text for the above input.
                    It's a bit lighter and easily wraps to a new line.
                </FormText>
            </FormGroup>
        </Form>
    )
}
export default Formulaire;