import React, { useState } from 'react';
import './App.css';

const SearchBar = ({ mainSearch }) => {
  const [search, setSearch] = useState(''); // state of the search input field

  const handleSearch = (e) => {
    mainSearch(search);
    setSearch('');
  };

  return (
    <div className="searchBar">
      <input
        id="search"
        name="search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="flashBtn searchBtn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
