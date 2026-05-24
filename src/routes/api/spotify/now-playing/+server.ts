import {
  SPOTIFY_REFRESH_TOKEN,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} from '$env/static/private';
import { getCurrentlyPlaying } from '$lib/spotify/currently.playing';
import { json } from '@sveltejs/kit';

export const GET = async () => {
  const { access_token } = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
      redirect_uri: 'http://localhost:5173',
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET,
    }),
  }).then((res) => res.json());

  const song = await getCurrentlyPlaying(access_token);

  return json(song, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
};
