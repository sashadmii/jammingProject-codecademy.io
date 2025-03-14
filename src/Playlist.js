import React, { useState } from 'react';
import Tracklist from './Tracklist';
import './App.css';

const Playlist = ({
  playlist,
  deleteClicked,
  savedPlaylistName,
  saveUserPlaylist,
}) => {
  const [playListName, setPlaylistName] = useState('');

  const addPlaylistName = (e) => {
    savedPlaylistName(playListName);
  };

  const handleClick = (e) => {
    saveUserPlaylist(playListName, playlist);
  };

  return (
    <div className="playlist">
      <h1>Create your playlist</h1>
      <input
        id="playlist"
        name="playlist"
        type="text"
        placeholder="Name your playlist"
        value={playListName}
        onChange={(e) => setPlaylistName(e.target.value)}
        onKeyDown={addPlaylistName}
      />
      <Tracklist
        trackList={playlist}
        isPlaylist={true}
        deleteClicked={deleteClicked}
      />
      <button className="flashBtn saveBtn" onClick={handleClick}>
        Save Playlist
      </button>
    </div>
  );
};

export default Playlist;
