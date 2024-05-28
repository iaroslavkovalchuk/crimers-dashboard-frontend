import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="header-title">
            <h1>Crimer</h1>
            <p>Urasterto omricanes ony bramatractat coonse and tomgon an ancores.</p>
            <button className="cta-button">COWE DOCE</button>
          </div>
        </div>
        <div className="header-right">
          <ul className="filter-options">
            <li>
              <input type="radio" id="option1" name="filter" />
              <label htmlFor="option1">Bottie: $20/70</label>
            </li>
            <li>
              <input type="radio" id="option2" name="filter" />
              <label htmlFor="option2">Borfie: 19/20</label>
            </li>
            <li>
              <input type="radio" id="option3" name="filter" />
              <label htmlFor="option3">Suavern braga rtris</label>
            </li>
            <li>
              <input type="radio" id="option4" name="filter" />
              <label htmlFor="option4">Eprter Serpto</label>
            </li>
            <li>
              <input type="radio" id="option5" name="filter" />
              <label htmlFor="option5">Kok wers skson</label>
            </li>
          </ul>
          <button className="apply-filters-button">Recies muus</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
