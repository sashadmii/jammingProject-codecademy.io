const Track = ({ track, addClicked, isPlaylist, deleteClicked }) => {
  const addTrack = (e) => {
    addClicked(track.id);
  };

  const deleteTrack = (e) => {
    deleteClicked(track.id);
  };

  if (isPlaylist === true) {
    return (
      <div className="track">
        <img
          className="trackImg"
          src={track.album.images[2].url}
          alt={track.name}
        />
        {track.artists[0].name} - {track.name}
        <button className="trackButton" onClick={deleteTrack}>
          <img alt="remove button" src="./images/remove.svg" />
        </button>
      </div>
    );
  }
  return (
    <div className="track" key={track.id}>
      <img
        className="trackImg"
        src={track.album.images[2].url}
        alt={track.name}
      />
      {track.artists[0].name} - {track.name}
      <button className="trackButton" onClick={addTrack}>
        <img alt="add button" src="./images/add.svg" />
      </button>
    </div>
  );
};

export default Track;
