import { songResponseSchema, type SongResponse, type SpotifySong } from './types';

const SPOTIFY_RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played';
const TRACK_LIMIT = 10;

export async function getRecentlyPlayed(access_token: string): Promise<SpotifySong[] | null> {
  try {
    const res = await fetch(`${SPOTIFY_RECENTLY_PLAYED_ENDPOINT}?limit=${TRACK_LIMIT}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!res.ok || !res.body) {
      return null;
    }

    const data = await res.json();
    const tracks = data.items?.map((item: any) => item.track) || [];

    const parsedTracks = tracks
      .map((track: unknown) => {
        const parsed = songResponseSchema.safeParse(track);
        return parsed.success ? parsed.data : null;
      })
      .filter((track: SongResponse | null): track is SongResponse => track !== null);

    if (!parsedTracks.length) {
      return null;
    }

    return parsedTracks.map(
      (track: { name: any; artists: { name: any }[]; album: { images: { url: any }[] } }) => ({
        title: track.name,
        artists: track.artists.map(({ name }) => name).join(', '),
        coverUrl: track.album.images[0].url,
      }),
    );
  } catch (error) {
    console.error('Error fetching recently played:', error);
    return null;
  }
}
