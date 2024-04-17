// render a track component
// receive a track as props from Tracklist: const Track = ({ track }) => {
const Track = ({ track, addClicked, isPlaylist, deleteClicked }) => {
    // pass to App the id of the track that was clicked

    const addTrack = (e) => {
        addClicked(track.id);
    };

    const deleteTrack = (e) => {
        deleteClicked(track.id);
    };

    // return the track with the proper button: "+" if the track is in search results, "-" if the track is in the playlist
    if (isPlaylist === true) {
        return (
            <div className="track" key={track.id}>
                {track.name}
                {track.artists[0].name} {}
                {track.album.name}
                <button className="button" onClick={deleteTrack}>
                    -
                </button>
            </div>
        );
    }
    return (
        <div className="track" key={track.id}>
            {track.name} {}
            {track.artists[0].name} {}
            {track.album.name}
            <button className="button" onClick={addTrack}>
                +
            </button>
        </div>
    );
};

export default Track;
