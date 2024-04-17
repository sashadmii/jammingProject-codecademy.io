import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import {
    getAuth,
    getTokenFromString,
    searchSpotify,
    savePlaylistToSpotify,
} from './Spotify';

function App() {
    const [search, setSearch] = useState(''); // outer state of the SearchBar
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [trackList, setTracklist] = useState([]);

    // calling the auth function if: the URL has no token (window.location.hash === '') or if the token is expired
    useEffect(() => {
        if (window.location.hash === '') {
            const expiration = localStorage.getItem('expires');
            if (expiration < Date.now()) {
                getAuth();
            }
        } else {
            getTokenFromString();
        }
    }, []);

    useEffect(() => {
        async function fetchData() {
            const tracks = await searchSpotify(search);
            setTracklist(tracks);
        }
        if (search) {
            fetchData();
        }
    }, [search]);

    // add the track to the user playlist only if the track ISN'T already added
    const addTrack = (clickedTrack) => {
        const track = trackList.find((e) => e.id === clickedTrack);

        if (playlist.some((e) => e.id === clickedTrack)) {
            return playlist;
        }
        setPlaylist((prev) => {
            return [track, ...prev];
        });
    };

    // delete the track from the user playlist
    const deleteTrack = (clickedTrack) => {
        setPlaylist((playlist) => {
            return playlist.filter((track) => track.id !== clickedTrack);
        });
    };

    // save playlist name with track uris in array
    const savePlaylist = (playlistName, playlist) => {
        let savedPlaylist = [];
        const itemUri = playlist.map((track) => {
            return track.uri;
        });

        if (playlistName && playlist.length === 0) {
            alert('You need to add tracks');
        } else if (playlistName === '' && playlist) {
            alert('You need to add title');
        } else if (playlistName !== '' && playlist.length !== 0) {
            savedPlaylist.push(playlistName, itemUri);

            savePlaylistToSpotify(playlistName, savedPlaylist);
        }
        setPlaylist([]);
        setPlaylistName('');
    };

    // save the playlist to the user's spotify account

    // pass the search result to SearchResults component as props: <SearchResults receivedData={trakList} />
    // pass the state of the SearchBar as props to Searchbar: <SearchBar onSearch={setSearch}/> - to search the data based on the user input
    // pass the state of the Track as props to Track component: onTrackClicked={setClickedTrack}
    // pass the addTrack function as props to Track addClicked={addTrack}
    //pass the deleteTrack function as props to Track deleteClicked={deleteTrack}
    return (
        <div className="App">
            <SearchBar mainSearch={setSearch} />
            <div className="container">
                <SearchResults receivedData={trackList} addClicked={addTrack} />
                <Playlist
                    playlist={playlist}
                    deleteClicked={deleteTrack}
                    savedPlaylistName={setPlaylistName}
                    saveUserPlaylist={savePlaylist}
                />
            </div>
        </div>
    );
}

export default App;
