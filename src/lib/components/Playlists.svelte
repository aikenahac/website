<script lang="ts">
  import type { SpotifyPlaylist } from '$lib/spotify/types';
  import { t } from '$lib/translations';
  import { reveal } from '$lib/actions/reveal';
  import Cassette from './Cassette.svelte';
  import SectionHeading from './SectionHeading.svelte';

  let { index }: { index: string } = $props();

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
      title: 'the dogma',
      url: 'https://open.spotify.com/playlist/4FQCruv42l6zCvzy6wGEJr?si=b32c0fcd53c249ec',
    },
  ];
</script>

<section class="mt-28 w-full max-[860px]:mt-20">
  <SectionHeading {index} title={$t('music.playlists')}>
    {#snippet aside()}
      {playlists.length} {$t('music.tapes')}
    {/snippet}
  </SectionHeading>

  <div use:reveal class="tray ticks w-full px-6 py-12">
    <div class="grid w-full grid-cols-4 gap-y-10 max-[1180px]:grid-cols-2 max-[650px]:grid-cols-1">
      {#each playlists as playlist}
        <Cassette {playlist} />
      {/each}
    </div>
  </div>
</section>

<style>
  .tray {
    background-color: rgba(0, 0, 0, 0.35);
    box-shadow:
      inset 0 20px 40px -20px rgba(0, 0, 0, 0.9),
      inset 0 -1px 0 rgba(212, 35, 198, 0.25);
  }
</style>
