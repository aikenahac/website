import { songResponseSchema, type SpotifySong } from './types';

const SPOTIFY_QUEUE_ENDPOINT = 'https://api.spotify.com/v1/me/player/queue';

export async function getUpNext(access_token: string): Promise<SpotifySong | null> {
  try {
    const res = await fetch(SPOTIFY_QUEUE_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!res.ok || !res.body) {
      return null;
    }

    const data = await res.json();
    const nextTrack = data.queue?.[0];

    if (!nextTrack) {
      return null;
    }

    const parsed = songResponseSchema.safeParse(nextTrack);

    if (!parsed.success) {
      return null;
    }

    return {
      title: parsed.data.name,
      artists: parsed.data.artists.map(({ name }) => name).join(', '),
      coverUrl: parsed.data.album.images[0].url,
      url: `https://open.spotify.com/track/${parsed.data.id}`,
    };
  } catch (error) {
    console.error('Error fetching up next track:', error);
    return null;
  }
}
