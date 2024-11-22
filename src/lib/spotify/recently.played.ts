export async function getRecentlyPlayed(access_token: string) {
  const res = await fetch(
		'https://api.spotify.com/v1/me/player/queue',
		{
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		},
	);

  console.log(await res.json())
}