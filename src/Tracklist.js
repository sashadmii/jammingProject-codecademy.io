import React from 'react';
import Track from './Track';

const Tracklist = ({ trackList, addClicked, isPlaylist, deleteClicked }) => {
  return (
    <div className="trackList">
      {trackList.map((track) => (
        <Track
          key={track.id}
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
