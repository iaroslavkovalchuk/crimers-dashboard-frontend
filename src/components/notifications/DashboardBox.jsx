import React, { useEffect, useState } from 'react';
import NavbarComponent from '../mobile/Navbar';
import CrimerList from '../mobile/CrimerList';
import CrimerProfile from '../mobile/CrimerProfile';
import { getCrimers } from '../../services/criminals';

import { useDispatch, useSelector } from 'react-redux';
import { loadingOff, loadingOn } from '../../store/authSlice';
import useSwipe from '../../hooks/useSwipe';

const DashboardBox = () => {
  const [crimersData, setCrimersData] = useState([]);
  const [selectedCrimer, setSelectedCrimer] = useState();
  const [name, setName] = useState("");
  const [location, setLocation] = useState();
  const [rewardAmount, setRewardAmount] = useState();
  const [showCriminalsList, setShowCriminalsList] = useState(false);

  const handlers = useSwipe ({
    onSwipedLeft: () => setShowCriminalsList(false),
    onSwipedRight: () => setShowCriminalsList(true),
  });

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
    dispatch(loadingOff())
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
        .finally(
          dispatch(loadingOff())
        )
    
    
  }, [dispatch])


  return (
    <div className="pt-4 h-screen rounded-3xl" {...handlers} >
        <div className="inset-x-0 top-0">
            <NavbarComponent
                name={name}
                setName={setName}
                location={location}
                setLocation={setLocation}
                rewardAmount={rewardAmount}
                setRewardAmount={setRewardAmount}
                handleSearch={handleSearch}
            />
        </div>
        <div className="flex rounded-3xl" style={{paddingTop: "130px"}}>
            
            <div className={`absolute z-20 p-5 bg-white rounded-3xl w-[100%] transition-transform duration-300 ${showCriminalsList ? 'translate-x-0' : '-translate-x-full'}`} >
                <CrimerList crimers={crimersData} setSelectedCrimer={setSelectedCrimer} setShowCriminalsList={setShowCriminalsList} />
            </div>
            <div className="flex-1">
                {selectedCrimer && <CrimerProfile crimer={selectedCrimer} />}
            </div>
        </div>
    </div>
  );
}

export default DashboardBox;