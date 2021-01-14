import { useState } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';




const Competences = (props) => {
    const [skill, changeSkill] = useState([
        'Skill 1', 'Skill 2', 'Skill 3'
    ])

    return (
      <Row className="m-3">
        <Col sm="6">
          <Card body>
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <Button>Supprimer</Button>
          </Card>
        </Col>
        <Col sm="6">
          <Card body>
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <Button>Supprimer</Button>
          </Card>
        </Col>
      </Row>
    );
  };
  
  export default Competences;