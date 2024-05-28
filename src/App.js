import React, { useEffect, useState } from 'react'; // Remove useEffect
import NavbarComponent from './components/Navbar';
import CrimerList from './components/CrimerList';
import CrimerProfile from './components/CrimerProfile';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { sendRequest } from './utils/Requests'

const App = () => {
  const [crimersData, setCrimersData] = useState([])
  const [selectedCrimer, setSelectedCrimer] = useState();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");
  
  const handleSearch = () => {
    const data = {
      location: location,
      name: name,
      rewardAmount: rewardAmount
    }
    sendRequest('get-crimers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        setCrimersData(result);
      })
  }

  useEffect(() => {
    console.log("ddd")
    const data = {
      location: "",
      name: "",
      rewardAmount: ""
    }
    sendRequest('get-crimers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        setCrimersData(result);
      })
  }, [])

  return (
    <div>
      <NavbarComponent
        name={name}
        setName={setName}
        location={location}
        setLocation={setLocation}
        rewardAmount={rewardAmount}
        setRewardAmount={setRewardAmount}
        handleSearch={handleSearch}
      />
      <div style={{ display: 'flex', padding: '20px' }}>
        <CrimerList crimers={crimersData} setSelectedCrimer={setSelectedCrimer} />
        <div style={{ flex: 1}}>
          {selectedCrimer && <CrimerProfile crimer={selectedCrimer} />}
        </div>
      </div>
    </div>
  );
}

export default App;