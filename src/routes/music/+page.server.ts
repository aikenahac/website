import {
  SPOTIFY_REFRESH_TOKEN,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} from '$env/static/private';
import { getCurrentlyPlaying } from '$lib/spotify/currently.playing';
import { getRecentlyPlayed } from '$lib/spotify/recently.played';
import { getTopArtists } from '$lib/spotify/top.artists';
import type { SpotifyArtist, SpotifySong } from '$lib/spotify/types';
import { getUpNext } from '$lib/spotify/up.next';

interface MusicLoad {
  currentlyPlaying: SpotifySong | null;
  upNext: SpotifySong | null;
  recentlyPlayed: SpotifySong[] | null;
  topArtists: SpotifyArtist[] | null;
}

export const load = async (): Promise<MusicLoad> => {
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

  const currentlyPlaying = await getCurrentlyPlaying(access_token);
  const upNext = await getUpNext(access_token);
  const recentlyPlayed = await getRecentlyPlayed(access_token);
  const topArtists = await getTopArtists(access_token);

  return {
    currentlyPlaying,
    upNext,
    recentlyPlayed,
    topArtists,
  };
};
