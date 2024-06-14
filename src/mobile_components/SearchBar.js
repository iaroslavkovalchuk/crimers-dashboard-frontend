import React from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search by name, location, reward amount..." onChange={onSearch} />
    </div>
  );
};

export default SearchBar;
