import React, { useState } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap'



function CardCandidat({ candidat }) {
    const [image, ChangeImage] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')

    return (
            <Card className="col-lg-3 ml-1 my-2">
                <CardImg  top style={{ width: "200px" }} src={image} className="mx-auto mt-1 img-fluid d-none d-sm-block" alt="profil_image" />
                <CardBody className="text-center">
                    <CardTitle className="mx-auto" tag="h5">{candidat.nom}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted mx-auto">{candidat.metier}</CardSubtitle>
                    <CardText  className="d-none d-md-block">Sint incididunt proident incididunt anim do et veniam deserunt culpa.</CardText>
                    <Button className="mx-auto btn">More</Button>
                </CardBody>
            </Card>
    );
  };
  
  function Candidat() {
    const [candidats, setCandidats] = useState([
      { nom: "Victor", metier: "Chef de Projet" },
      { nom: "Yanis", metier: "Responsable Achat" },
      { nom: "Charly", metier: "Infirmier" },
      { nom: "Yassir",  metier : "Stagiaire" },
      { nom: "Chakir", metier: "Développeur" },
      { nom: "Mina",  metier : "Boss" }
    ]);
  
    return (
      <div className="col-12 d-lg-flex flex-lg-row justify-content-around flex-wrap">
          {candidats.map((candidat, index) => (
            <CardCandidat
              index={index}
              candidat={candidat}
            />
          ))}
      </div>
    );
  }
  
export default Candidat;