import React from 'react';
import { ListGroup, FormControl } from 'react-bootstrap';
import './CrimerList.css';

const CrimerList = ({ crimers, setSelectedCrimer }) => {
 
  return (
    <div className="crimer-list">
      <ListGroup className="crimer-list-group">
        {crimers.map((crimer, index) => (
          <ListGroup.Item
            key={index}
            className="crimer-list-item"
            onClick={() => setSelectedCrimer(crimer)}
          >
            {crimer.suspects_name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default CrimerList;
