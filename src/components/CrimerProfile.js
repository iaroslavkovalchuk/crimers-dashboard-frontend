import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './CrimerProfile.css';

const CrimerProfile = ({ crimer }) => {
  return (
    <Container className='profile-container'>
      <Row className='justify-content-center align-items-center' style={{paddingTop: "35px"}}>
        <Col lg='9' xl='7'>
          <Card className='profile-card'>
            <div className='profile-header'>
              <div className='header-image'>
                { crimer.image_url ? <img src={crimer.image_url} alt='Avatar' className='avatar-img img-thumbnail' /> : null }
                <div>
                  <h6>{crimer.suspects_name} {crimer.image_url}</h6>
                </div>
              </div>
            </div>
            <hr />
            <Card.Body className='profile-body' style={{height:"62vh"}}>
              <div style={{ maxHeight: "20vh", overflow: "auto", border: "1px solid #ccc", padding: "10px", margin: "10px", marginTop: '-5px'}}>
                <h6 style={{ fontFamily: "Arial, sans-serif", color: "#333", fontWeight: "bold", marginBottom: "8px" }}>
                  Description
                </h6>
                <pre style={{ fontSize: "15px", fontFamily: "'Times New Roman', serif", color: "#555" }}>
                  {crimer.description}
                </pre>
              </div>

              <hr />
              <div style={{ maxHeight: "8vh", overflow: "auto", padding: "10px", margin: "10px", border: "1px solid #ccc" }}>
                <h6 style={{ fontFamily: "Arial, sans-serif", color: "#333", fontWeight: "bold", marginBottom: "8px" }}>
                  Suspected Crimes:
                </h6>
                <p style={{ fontFamily: "'Times New Roman', serif", color: "#555" }}>
                  {crimer.suspected_crimes}
                </p>
              </div>
              <hr />
              <div style={{ maxHeight: "8vh", overflow: "auto", padding: "10px", margin: "10px", border: "1px solid #ccc" }}>
                <h6 style={{ fontFamily: "Arial, sans-serif", color: "#333", fontWeight: "bold", marginBottom: "8px" }}>
                  Possible Location:
                </h6>
                <p style={{ fontFamily: "'Times New Roman', serif", color: "#555" }}>
                  {crimer.possible_location}
                </p>
              </div>
              <hr />
              <div style={{ maxHeight: "8vh", overflow: "auto", padding: "10px", margin: "10px", border: "1px solid #ccc" }}>
                <h6 style={{ fontFamily: "Arial, sans-serif", color: "#333", fontWeight: "bold", marginBottom: "8px" }}>
                  Agency Text
                </h6>
                <p style={{ fontFamily: "'Times New Roman', serif", color: "#555" }}>
                  {crimer.agency_text}
                </p>
              </div>
              <hr />
              <div style={{ maxHeight: "8vh", overflow: "auto", padding: "10px", margin: "10px", border: "1px solid #ccc" }}>
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
