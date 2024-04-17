import React from 'react';
import Track from './Track';

// render a Tracklist component
// receive a trackList as props from SearchResults: const Tracklist = ({ trackList }) => {
// pass a track as props to Track: track={track}
const Tracklist = ({ trackList, addClicked, isPlaylist, deleteClicked }) => {
    return (
        <div>
            {trackList.map((track) => (
                <Track
                    track={track}
                    addClicked={addClicked}
                    isPlaylist={isPlaylist}
                    deleteClicked={deleteClicked}
                />
            ))}
        </div>
    );
};

export default Tracklist;
