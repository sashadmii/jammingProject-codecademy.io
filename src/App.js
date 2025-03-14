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
  const [search, setSearch] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [trackList, setTracklist] = useState([]);

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

  const addTrack = (clickedTrack) => {
    const track = trackList.find((e) => e.id === clickedTrack);

    if (playlist.some((e) => e.id === clickedTrack)) {
      return playlist;
    }
    setPlaylist((prev) => {
      return [track, ...prev];
    });
  };

  const deleteTrack = (clickedTrack) => {
    setPlaylist((playlist) => {
      return playlist.filter((track) => track.id !== clickedTrack);
    });
  };

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

  return (
    <div className="App">
      <div className="header">
        <img alt="spotify icon" src="./images/spotify.svg" />
        <span>Jamming</span>
      </div>
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
