import React, { useState } from 'react';
import './App.css';

const SearchBar = ({ mainSearch }) => {
    const [search, setSearch] = useState(''); // state of the search input field
    // console.info('search>>>', search);

    // function, that sets the search equal to the user input and after the button is clicked clears the input
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
            <button className="button" onClick={handleSearch}>
                SEARCH
            </button>
        </div>
    );
};

export default SearchBar;
