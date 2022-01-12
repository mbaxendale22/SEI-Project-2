import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Navbar = () => {
  const history = useHistory();

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      history.push({ pathname: '/searchresults', state: searchTerm });
    }
  };
  return (
    <nav className="navbar is-dark is-flex is-justify-content-space-">
      <div className="container">
        <div className="navbar-brand">
          <span
            role="img"
            aria-label="logo"
            className="title is-flex is-align-content-center"
          >
            <Link className="ear has-text-white" to="/">
              👂 Poddy
            </Link>
          </span>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <Link to="/randompodcast">
              <a className=" has-text-black button is-warning is-rounded">
                Find me a Random Podcast
              </a>
            </Link>
          </div>
          <div className="navbar-item w-4">
            <input
              onChange={handleChange}
              onKeyUp={handleSearch}
              placeholder="Search for podcasts..."
              type="text"
              className="input is-rounded"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
