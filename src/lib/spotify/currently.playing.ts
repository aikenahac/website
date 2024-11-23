import { abstractSongResponseSchema, type SpotifySong } from './types';

export async function getCurrentlyPlaying(access_token: string) {
  const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const parsed = res.body ? abstractSongResponseSchema.safeParse(await res.json()) : null;

  const currentlyPlaying: SpotifySong | undefined =
    parsed && parsed.data
      ? {
          title: parsed.data.item.name,
          artists: parsed.data.item.artists.map(({ name }) => name).join(', '),
          coverUrl: parsed.data.item.album.images[0].url,
          playing: parsed.data.is_playing,
        }
      : undefined;

  return currentlyPlaying;
}
