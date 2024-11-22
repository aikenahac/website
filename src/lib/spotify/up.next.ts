import { songResponseSchema, type SpotifySong } from "./types";

export async function getUpNext(access_token: string) {
  const res = await fetch(
		'https://api.spotify.com/v1/me/player/queue',
		{
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		},
	);

  const queue = res.body ? (await res.json()).queue : undefined;
  const queueFirst = queue && queue.length > 0 ? queue[0] : null;
  const parsed = queueFirst ? songResponseSchema.safeParse(queueFirst) : null;

  const upNext: SpotifySong | undefined = parsed && parsed.data ? {
    title: parsed.data.name,
    artists: parsed.data.artists.map(({ name }) => name).join(", "),
    coverUrl: parsed.data.album.images[0].url,
  } : undefined;
  
  return upNext;
}