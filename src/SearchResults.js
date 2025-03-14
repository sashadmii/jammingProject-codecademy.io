import Tracklist from './Tracklist';

const SearchResults = ({ receivedData, addClicked }) => {
  return (
    <div className="results">
      <h1>Results:</h1>
      <Tracklist trackList={receivedData} addClicked={addClicked} />
    </div>
  );
};

export default SearchResults;
