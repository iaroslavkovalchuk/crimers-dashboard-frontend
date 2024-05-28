import React from 'react';
import { Navbar, Container, Nav, Form, FormControl, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import './Navbar.css';

const NavbarComponent = ({ name, setName, location, setLocation, rewardAmount, setRewardAmount, handleSearch}) => {

  return (
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#" className="brand-logo">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto search-nav">
            <Form inline className="search-form">
              <FormControl
                type="text"
                placeholder="Name"
                className="search-bar"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormControl
                type="text"
                placeholder="Location"
                className="search-bar"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <FormControl
                type="text"
                placeholder="Reward Amount"
                className="search-bar"
                value={rewardAmount}
                onChange={(e) => setRewardAmount(e.target.value)}
              />
              <Button onClick={handleSearch}>
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
