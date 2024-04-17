import React, { useState } from 'react';
import styles from './App.css';
// import SearchBar from './SearchBar';
import Tracklist from './Tracklist';

// receive the search result as props from App: const SearchResults = ({ receiveData }) => {
const SearchResults = ({ receivedData, addClicked }) => {
    // render a SearchResults component, that includes Tracklist component
    // pass tracklist as props to Tracklist component: <Tracklist trackList={receivedData} />
    return (
        <div className="results">
            <h2>Results:</h2>
            <Tracklist trackList={receivedData} addClicked={addClicked} />
        </div>
    );
};

export default SearchResults;
