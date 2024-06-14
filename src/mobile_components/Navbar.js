import React, { useState, useEffect} from 'react';
import { Navbar, Container, Nav, Form, Button, FormControl } from 'react-bootstrap';
import Select from 'react-select';
import { Country, State } from 'country-state-city';
import './Navbar.css';


const rewardAmountOptions = [
  { value: '<2500', label: 'Less than $2,500' },
  { value: '2500-10000', label: '$2,500 - $10,000' },
  { value: '10000-500000', label: '$10,000 - $500,000' },
  { value: '500000-1000000', label: '$500,000 - $1 Million' },
  { value: '>1000000', label: 'More than $1 Million' },
];

const NavbarComponent = ({ name, setName, location, setLocation, rewardAmount, setRewardAmount, handleSearch }) => {
  const [locationOptions, setLocationOptions] = useState([]);

  useEffect(() => {
    const countries = Country.getAllCountries();
    const formattedCountries = countries.map((country) => ({
      label: country.name,
      options: State.getStatesOfCountry(country.isoCode).map((state) => ({
        value: state.isoCode,
        label: state.name,
      })),
    }));
    setLocationOptions(formattedCountries);
  }, []);

  const handleLocationChange = (selectedOption) => {
    setLocation(selectedOption);
  };

  const handleRewardAmountChange = (selectedOption) => {
    setRewardAmount(selectedOption);
  };

  console.log("location: ", location)

  return (
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#" className="brand-logo">
          <div className='d-inline mx-3'>
            <img  src="logo.jpg" width={"80px"} height={"80px"} />
          </div>
          <div className='d-inline'>
            <h2
              
              style={{
                fontFamily: "Bradley Hand ITC",
                fontWeight: "bolder",
              }}
            > 
              Flowers 
              <br />
              <span style={{marginLeft: "60px"}}> by Irene </span>
            </h2>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto search-nav" styles={{ width: "100%"}}>
            <Form inline className="search-form">
              <FormControl
                type="text"
                placeholder="Name"
                className="mx-0 search-bar"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Select
                className="location-select mx-3 w-100"
                placeholder="Select Location"
                value={location}
                onChange={handleLocationChange}
                options={locationOptions}
                isSearchable={true}
                isClearable={true}
              />
              <Select
                className="reward-amount-select mx-3 w-100"
                placeholder="Reward Amount"
                value={rewardAmount}
                onChange={handleRewardAmountChange}
                options={rewardAmountOptions}
                isSearchable={false}
                isClearable={true}
              />
              <Button variant="outline-success" onClick={handleSearch}>
                Search
              </Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
