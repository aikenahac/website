import { abstractSongResponseSchema, type SpotifySong } from './types';

const SPOTIFY_NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

export async function getCurrentlyPlaying(access_token: string): Promise<SpotifySong | null> {
  try {
    const res = await fetch(SPOTIFY_NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!res.ok) {
      return null;
    }

    if (!res.body) {
      return null;
    }

    const data = await res.json();
    const parsed = abstractSongResponseSchema.safeParse(data);

    if (!parsed.success) {
      return null;
    }

    return {
      title: parsed.data.item.name,
      artists: parsed.data.item.artists.map(({ name }) => name).join(', '),
      coverUrl: parsed.data.item.album.images[0].url,
      playing: parsed.data.is_playing,
    };
  } catch (error) {
    console.error('Error fetching currently playing:', error);
    return null;
  }
}
