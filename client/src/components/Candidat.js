import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Spinner,
} from "reactstrap";

function Candidat() {
  const [image, ChangeImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [Candidats, setCandidats] = useState();
  const [Loading, setLoading] = useState(true);
  const API_URL = "http://localhost:5000/api/users/candidat";
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(API_URL);
      setCandidats(result.data);
      setLoading(false);
    };
    fetchData();
  }, [Loading]);
  function CardCandidat({ candidat }) {
    return (
      <Card className="col-lg-3 ml-1 my-2" key={candidat.id}>
        <CardImg
          top
          style={{ width: "200px" }}
          src={image}
          className="mx-auto mt-1 img-fluid d-none d-sm-block"
          alt="profil_image"
        />
        <CardBody className="text-center">
          <CardTitle className="mx-auto" tag="h5">
            {candidat.username}
          </CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted mx-auto">
            {candidat.job}
          </CardSubtitle>
          <CardText className="d-none d-md-block">
            Sint incididunt proident incididunt anim do et veniam deserunt
            culpa.
          </CardText>
          <Button className="mx-auto btn">Détails</Button>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="col-12 d-lg-flex flex-lg-row justify-content-around flex-wrap">
      {!Loading ? (
        Candidats.map((candidat, index) => (
          <CardCandidat index={index} candidat={candidat} />
        ))
      ) : (
        <Spinner color="primary" />
      )}
    </div>
  );
}

export default Candidat;
