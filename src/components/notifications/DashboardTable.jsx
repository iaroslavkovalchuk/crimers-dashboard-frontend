import React, { useEffect, useState } from 'react';
import NavbarComponent from '../web/Navbar';
import CrimerList from '../web/CrimerList';
import CrimerProfile from '../web/CrimerProfile';
import { getCrimers } from '../../services/criminals';

import { useDispatch, useSelector } from 'react-redux';
import { loadingOff, loadingOn } from '../../store/authSlice';

const DashboardTable = () => {
  const [crimersData, setCrimersData] = useState([]);
  const [selectedCrimer, setSelectedCrimer] = useState();
  const [name, setName] = useState("");
  const [location, setLocation] = useState();
  const [rewardAmount, setRewardAmount] = useState();

  const dispatch = useDispatch()

  const handleSearch = async () => {
    const data = {
      location: location,
      name: name,
      rewardAmount: rewardAmount
    };
    dispatch(loadingOn())
    getCrimers(data)
      .then(response => response.json())
      .then(result => {
        setCrimersData(result);
        })
      .finally(() => {
          dispatch(loadingOff())
        }
      )
  };

  
  useEffect(() => {
    const data = {
      location: null,
      name: "",
      rewardAmount: null
    }
    dispatch(loadingOn())
    getCrimers(data)
      .then(response => response.json())
      .then(result => {
          console.log(result)
          setCrimersData(result);
      })
      .finally(() => {
          dispatch(loadingOff())
        }
      )
    
  }, [dispatch])


  return (
    <div style={{paddingTop: "10px"}}>
      <NavbarComponent
        name={name}
        setName={setName}
        location={location}
        setLocation={setLocation}
        rewardAmount={rewardAmount}
        setRewardAmount={setRewardAmount}
        handleSearch={handleSearch}
      />
      <div className="flex p-5">
        <CrimerList crimers={crimersData} setSelectedCrimer={setSelectedCrimer} />
        <div className="flex-1">
          {selectedCrimer && <CrimerProfile crimer={selectedCrimer} />}
        </div>
      </div>
    </div>
  );
}

export default DashboardTable;