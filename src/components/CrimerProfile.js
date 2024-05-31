import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './CrimerProfile.css';

const process_image_url = (url) => {
  if (url.includes('Fugitive/GetImage')) {
      let parts = url.split('/');

      let lastElement = parts[parts.length - 1];

      console.log(lastElement); // Output: 1084191
      return process.env.REACT_APP_DATA_HOST + lastElement
  } else {
      console.log("URL does not contain 'Fugitive/GetImage'");
      return url
  }
}

const CrimerProfile = ({ crimer }) => {
  return (
    <Container className='profile-container'>
      <Row className='justify-content-center align-items-center' style={{paddingTop: "35px"}}>
        <Col lg='9' xl='7'>
          <Card className='profile-card'>
            <div className='profile-header'>
              <div className='header-image'>
                { crimer.image_url ? <img src={process_image_url(crimer.image_url)} alt='Avatar' className='avatar-img img-thumbnail' /> : null }
                <div>
                  <h6>{crimer.suspects_name} </h6>
                </div>
              </div>
            </div>
            <hr />
            <Card.Body className='profile-body' style={{height:"62vh"}}>
              <Row style={{margin: '1px'}}>
                <Col md={6} style={{ padding: '10px' }}>
                  <div style={{ overflow: 'auto', border: '1px solid #ccc', padding: '10px', height: '200px' }}>
                    <h6 style={{ fontFamily: 'Arial, sans-serif', color: '#333', fontWeight: 'bold', marginBottom: '8px' }}>
                      Description
                    </h6>
                    <pre style={{ fontSize: '15px', fontFamily: "'Times New Roman', serif", color: '#555' }}>
                      {crimer.description}
                    </pre>
                  </div>
                </Col>
                <Col md={6} style={{ padding: '10px' }}>
                  <div style={{ overflow: 'auto', border: '1px solid #ccc', padding: '10px', height: '200px' }}>
                    <h6 style={{ fontFamily: 'Arial, sans-serif', color: '#333', fontWeight: 'bold', marginBottom: '8px' }}>
                      Suspected Crimes
                    </h6>
                    <p style={{ fontFamily: "'Times New Roman', serif", color: '#555' }}>
                      {crimer.suspected_crimes}
                    </p>
                  </div>
                </Col>
              </Row>
              <hr />
              <div style={{ height: "8.5vh", overflow: "auto", padding: "10px", margin: "10px", border: "1px solid #ccc" }}>
                <h6 style={{ fontFamily: "Arial, sans-serif", color: "#333", fontWeight: "bold", marginBottom: "8px" }}>
                  Possible Location
                </h6>
                <p style={{ fontFamily: "'Times New Roman', serif", color: "#555" }}>
                  {crimer.possible_location}
                </p>
              </div>
              <hr />
              <div style={{ height: "12vh", overflow: "auto", padding: "10px", margin: "10px", border: "1px solid #ccc" }}>
                <h6 style={{ fontFamily: "Arial, sans-serif", color: "#333", fontWeight: "bold", marginBottom: "8px" }}>
                  Agency Text
                </h6>
                <p style={{ fontFamily: "'Times New Roman', serif", color: "#555" }}>
                  {crimer.agency_text}
                </p>
              </div>
              <hr />
              <div style={{ height: "8.5vh", overflow: "auto", padding: "10px", margin: "10px", border: "1px solid #ccc" }}>
                <h6 style={{ fontFamily: "Arial, sans-serif", color: "#333", fontWeight: "bold", marginBottom: "8px" }}>
                  Reward Amount
                </h6>
                <p style={{ fontFamily: "'Times New Roman', serif", color: "#555" }}>
                  {crimer.reward_amount}
                </p>
              </div>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CrimerProfile;
