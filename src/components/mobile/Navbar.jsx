import React, { useState, useEffect} from 'react';
import Select from 'react-select';
import { Countries, usStates } from '../common/CountryStates';
import { useDispatch } from 'react-redux';
import {  unAuthorized } from "../../store/authSlice"


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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="absolute w-[100%] bg-white p-3 rounded-3xl shadow-md" style={{zIndex: "100"}}>
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center flex-shrink-0 text-black mr-6">
          <img src="Favicon.png" alt="Logo" className="mr-3" height={"90px"} width={"90px"}/>
          <span className="font-semibold text-xl tracking-tight">Flowers by Irene</span>
        </div>
        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400">
            {/* Icon for mobile menu */}
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z"/></svg>
          </button>
        </div>
        <div className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="lg:flex-grow"></div>
          <div>
            {/* Search input and buttons */}
            <div className="flex flex-col lg:flex-row items-center">
              <input
                type="text"
                placeholder="Name"
                className="form-input mx-2 my-1 border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Select
                className="mx-2 my-1 w-full"
                placeholder="Select Country"
                value={selectedCountry}
                onChange={handleCountryChange}
                options={Countries}
                isSearchable={true}
                isClearable={true}
              />
              {selectedCountry && selectedCountry.value === 'US' && (
                <Select
                  className="mx-2 my-1 w-full"
                  placeholder="Select State"
                  value={selectedState}
                  onChange={handleStateChange}
                  options={usStates}
                  isSearchable={true}
                  isClearable={true}
                  isDisabled={!selectedCountry}
                />
              )}
              <Select
                className="mx-2 my-1 w-full"
                placeholder="Reward Amount"
                value={rewardAmount}
                onChange={handleRewardAmountChange}
                options={rewardAmountOptions}
                isSearchable={false}
                isClearable={true}
              />
              <button
                onClick={() => {handleSearch(); setIsMenuOpen(!isMenuOpen)}}
                className="hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-1 w-full lg:w-auto"
                style={{ transition: "all .15s ease", borderColor: "gray", borderWidth: "1px" }}
              >
                <img src={'search.svg'} alt="image" 
                  className="cursor-pointer mx-auto"
                  style={{width: "25px", height: "25px"}}
                />
              </button>
              <button
                className="hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-1 w-full lg:w-auto"
                type="button"
                style={{ transition: "all .15s ease", borderColor: "gray", borderWidth: "1px" }}
                onClick={handleSignOut}
              >
                <img src={'signout.svg'} alt="image" 
                  className="cursor-pointer mx-auto"
                  style={{width: "25px", height: "25px"}}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
