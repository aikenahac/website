<script lang="ts">
  import type { SpotifyPlaylist } from '$lib/spotify/types';
  import { t } from '$lib/translations';
  import Cassette from './Cassette.svelte';

  const playlists: SpotifyPlaylist[] = [
    {
      title: 'boom boom',
      url: 'https://open.spotify.com/playlist/4ja2Q9PLZZRuDshv58ofkg?si=d035307139a2417d',
    },
    {
      title: 'Sovražim Smrkce',
      url: 'https://open.spotify.com/playlist/65d1Cf4dxjgJh0MXPmLh6z?si=179394ab48944784',
    },
    {
      title: 'nerdy white guys who cant rly sing',
      url: 'https://open.spotify.com/playlist/6NhU3Oml2JhH3eBRbcfjEF?si=sDrjyLYPROG3Y4zTn2YijA&pi=e-rJ7BcNmfSD2O',
    },
    {
      title: 'tema',
      url: 'https://open.spotify.com/playlist/4fEXZy9gI0eL546Cpgl4oi?si=b85c292aad47487d',
    },
  ];
</script>

<div class="mt-8 flex w-full flex-col rounded-sm border border-aipink p-6">
  <h2 class="mb-12 font-mono text-2xl font-bold text-aipink">{$t('music.playlists')}</h2>
  <div class="grid w-full grid-cols-4 gap-y-6 max-[1180px]:grid-cols-2 max-[650px]:grid-cols-1">
    {#each playlists as playlist}
      <Cassette {playlist} />
    {/each}
  </div>
</div>
