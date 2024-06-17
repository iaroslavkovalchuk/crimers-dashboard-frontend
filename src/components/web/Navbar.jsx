import React, { useState, useEffect} from 'react';
import Select from 'react-select';
import { Countries, usStates } from '../common/CountryStates';
import {  unAuthorized } from "../../store/authSlice"
import { useDispatch } from 'react-redux';


const rewardAmountOptions = [
  { value: '<2500', label: 'Less than $2,500' },
  { value: '2500-10000', label: '$2,500 - $10,000' },
  { value: '10000-500000', label: '$10,000 - $500,000' },
  { value: '500000-1000000', label: '$500,000 - $1 Million' },
  { value: '>1000000', label: 'More than $1 Million' },
];

const NavbarComponent = ({ name, setName, location, setLocation, rewardAmount, setRewardAmount, handleSearch }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);


  const dispatch = useDispatch();


  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedState(null); // Reset the selected state when the country changes
    setLocation(selectedOption ? selectedOption : {});
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setLocation(selectedOption ? selectedOption : selectedCountry);
  };

  const handleRewardAmountChange = (selectedOption) => {
    setRewardAmount(selectedOption);
  };

  const handleSignOut = () => {
    localStorage.clear('access_token')
    dispatch(unAuthorized());
  }


  return (
    <nav className="bg-white p-1 rounded-full shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <img src="Favicon.png" alt="Logo" className="mr-3" style={{height: "100px", width: "100px"}}/>
          <h2 className="text-3xl text-gray-400 font-bold">
            Flowers
            <br />
            <span className="ml-12">by Irene</span>
          </h2>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Name"
            className="form-input mx-1 border"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{padding:"6px", borderColor: "aquamarine", borderRadius: "0.3rem"}}
          />
          <Select
            className='mx-1'
            placeholder="Select Country"
            value={selectedCountry}
            onChange={handleCountryChange}
            options={Countries}
            isSearchable={true}
            isClearable={true}
            styles={{
              control: (provided) => ({
                ...provided,
                width: 220, // Set a fixed width or use 'w-full' for full width
              }),
            }}
          />
          {selectedCountry && selectedCountry.value === 'US' && (
            <Select
              className='mx-1'
              placeholder="Select State"
              value={selectedState}
              onChange={handleStateChange}
              options={usStates}
              isSearchable={true}
              isClearable={true}
              isDisabled={!selectedCountry || selectedCountry.value !== 'US'}
              styles={{
                control: (provided) => ({
                  ...provided,
                  width: 220, // Set a fixed width or use 'w-full' for full width
                }),
              }}
            />
          )}
          <Select
            className='mx-1'
            placeholder="Reward Amount"
            value={rewardAmount}
            onChange={handleRewardAmountChange}
            options={rewardAmountOptions}
            isSearchable={false}
            isClearable={true}
            styles={{
              control: (provided) => ({
                ...provided,
                width: 220, // Set a fixed width or use 'w-full' for full width
              }),
            }}
          />
          <button
            className="text-white ml-3 active:bg-green-600 font-bold uppercase px-6 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1"
            type="button"
            style={{ transition: "all .15s ease", borderColor: "gray", borderWidth: "1px" }}
            onClick={handleSearch}
          >
            <img src={'search.svg'} alt="image" 
              className="cursor-pointer"
              style={{width: "30px", height: "30px"}}
            />
          </button>
          <button
            className="text-white ml-16 active:bg-green-600 font-bold uppercase px-6 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1"
            type="button"
            style={{ transition: "all .15s ease", borderColor: "gray", borderWidth: "1px" }}
            onClick={handleSignOut}
          >
            <img src={'signout.svg'} alt="image" 
              className="cursor-pointer"
              style={{width: "30px", height: "30px"}}
            />
          </button>
          
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
