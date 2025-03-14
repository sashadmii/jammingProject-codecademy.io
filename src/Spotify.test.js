import { url, getId } from './Spotify';
const assert = require('assert');

describe('url', () => {
  it('returns a complete URL', () => {
    //setup
    const expected =
      'https://accounts.spotify.com/authorize?response_type=token&client_id=1c0d97be741c4095838d7d26922b785c&scope=user-read-private user-read-email playlist-modify-private playlist-modify-public&redirect_uri=http://localhost:3000/&state=a7554d212K345678';
    //exercise
    const result = url();
    // verify
    assert.ok(result === expected);
  });
});
