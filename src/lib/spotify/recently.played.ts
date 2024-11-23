import { songResponseSchema, type SongResponse, type SpotifySong } from "./types";

export async function getRecentlyPlayed(access_token: string) {
  const res = await fetch(
		'https://api.spotify.com/v1/me/player/recently-played?limit=10',
		{
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		},
	);

  const recentArrRes = res.body ? (await res.json()).items.map((item: any) => item.track) : undefined;
  // const parsed = queueFirst ? songResponseSchema.safeParse(queueFirst) : null;
  const recentTracksRes: SongResponse[] = recentArrRes.map((item: any) => songResponseSchema.safeParse(item).data)

  const recentlyPlayed: SpotifySong[] | undefined = recentTracksRes && recentTracksRes.length > 0 ? recentTracksRes.map((track) => ({
    title: track.name,
    artists: track.artists.map(({ name }) => name).join(", "),
    coverUrl: track.album.images[0].url,
  })) : undefined;

  return recentlyPlayed;
}