const clientId = '1c0d97be741c4095838d7d26922b785c';
const redirectUri = 'http://localhost:3000/';
let token;

// request authorization
export const getAuth = async () => {
    let state = 'a7554d212K345678';
    let stateKey = 'lskdidb8765dy';

    localStorage.setItem(stateKey, state);
    let scope =
        'user-read-private user-read-email playlist-modify-private playlist-modify-public';

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(clientId);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirectUri);
    url += '&state=' + encodeURIComponent(state);

    window.location.href = url;
};

// get the token and the expire date, save this data to the local storage
export const getTokenFromString = () => {
    let hash = window.location.hash.substr(1);
    console.info(hash);

    var result = hash.split('&').reduce(function (res, item) {
        var parts = item.split('=');
        res[parts[0]] = parts[1];
        return res;
    }, {});

    token = result.access_token;

    const expires = Date.now() + result.expires_in * 1000;

    localStorage.setItem('token', token);
    localStorage.setItem('expires', expires);

    window.location.href = redirectUri;
};

// send serch GET request
export const searchSpotify = async (search) => {
    const baseUrl = 'https://api.spotify.com/v1/search';
    const requestParam = `?q=${search}&type=track`;
    const searchEndpoint = `${baseUrl}${requestParam}`;
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(searchEndpoint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            const tracks = jsonResponse.tracks.items;
            return tracks;
        }
    } catch (error) {
        console.log('search bar GET request error>>>', error);
    }
};

// get user id from Spotify
const getId = async () => {
    const idEndpoint = 'https://api.spotify.com/v1/me';
    const token = localStorage.getItem('token');

    try {
        const userId = await fetch(idEndpoint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (userId.ok) {
            const jsonUserId = await userId.json();
            const id = jsonUserId.id;
            return id;
        }
    } catch (error) {
        console.log('getUserId error >>>', error);
    }
};

// create empty Spotify playlist
export const createPlaylist = async (playlistName) => {
    const id = await getId();
    const token = localStorage.getItem('token');

    const newPlaylistEndpoint = `https://api.spotify.com/v1/users/${id}/playlists`;

    try {
        const response = await fetch(newPlaylistEndpoint, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application / json',
            },
            body: JSON.stringify({
                name: `${playlistName}`,
                description: 'My playlist description',
                public: false,
            }),
        });
        if (response.ok) {
            console.log('create playlist success');
            const jsonResponse = await response.json();
            const playlistId = jsonResponse.id;
            return playlistId;
        }
    } catch (error) {
        console.log('create playlist error >>>', error);
    }
};

// save tracks to the created playlist
export const savePlaylistToSpotify = async (playlistName, savedPlaylist) => {
    const id = await createPlaylist(playlistName);
    const token = localStorage.getItem('token');
    const uris = savedPlaylist[1];

    const savePlaylistEndpoint = `https://api.spotify.com/v1/playlists/${id}/tracks`;

    try {
        const response = await fetch(savePlaylistEndpoint, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application / json',
            },
            body: JSON.stringify({
                uris: uris,
                position: 0,
            }),
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log('create playlist error >>>', error);
    }
};
