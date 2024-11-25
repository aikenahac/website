import { artistsResponseSchema, type SpotifyArtist } from './types';

const SPOTIFY_TOP_ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists';
const ARTIST_LIMIT = 10;

export async function getTopArtists(access_token: string): Promise<SpotifyArtist[] | null> {
  try {
    const res = await fetch(`${SPOTIFY_TOP_ARTISTS_ENDPOINT}?limit=${ARTIST_LIMIT}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!res.ok || !res.body) {
      return null;
    }

    const data = await res.json();
    const parsed = artistsResponseSchema.safeParse(data);

    if (!parsed.success) {
      return null;
    }

    return parsed.data.items.map((artist) => ({
      name: artist.name,
      imageUrl: artist.images[0].url,
      url: `https://open.spotify.com/artist/${artist.id}`
    }));
  } catch (error) {
    console.error('Error fetching top artists:', error);
    return null;
  }
}
