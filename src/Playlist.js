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

    // function, that sets the playlist name equal to the user input
    const addPlaylistName = (e) => {
        savedPlaylistName(playListName);
    };

    // event handlerr function for "Save Playlist" button
    const handleClick = (e) => {
        saveUserPlaylist(playListName, playlist);
    };

    // render a Playlist component
    // set the Playlist name = the user's input
    return (
        <div className="playlist">
            <label htmlFor="playlist">Create your playlist</label>
            <input
                id="playlist"
                name="playlist"
                type="text"
                value={playListName}
                onChange={(e) => setPlaylistName(e.target.value)}
                onKeyDown={addPlaylistName}
            />
            <Tracklist
                trackList={playlist}
                isPlaylist={true}
                deleteClicked={deleteClicked}
            />
            <button onClick={handleClick}>Save Playlist</button>
        </div>
    );
};

export default Playlist;
