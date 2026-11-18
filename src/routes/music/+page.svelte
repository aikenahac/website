<script lang="ts">
  import CurrentlyPlaying from '$lib/components/CurrentlyPlaying.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Playlists from '$lib/components/Playlists.svelte';
  import RecentlyPlayed from '$lib/components/RecentlyPlayed.svelte';
  import TopArtists from '$lib/components/TopArtists.svelte';
  import { t } from '$lib/translations';
  import type { PageServerData } from './$types';

  type SectionKey = 'playing' | 'recent' | 'top' | 'playlists';

  let { data }: { data: PageServerData } = $props();

  const order = $derived(
    [
      data.currentlyPlaying ? 'playing' : null,
      data.recentlyPlayed && data.recentlyPlayed.length > 0 ? 'recent' : null,
      data.topArtists ? 'top' : null,
      'playlists',
      data.currentlyPlaying ? null : 'playing',
    ].filter((key): key is SectionKey => key !== null),
  );

  const num = (key: SectionKey): string => String(order.indexOf(key) + 1).padStart(2, '0');
</script>

<PageHeader index="05" title={$t('music.title')} kicker={$t('music.kicker')} />

{#if data.currentlyPlaying}
  <CurrentlyPlaying
    index={num('playing')}
    currentlyPlaying={data.currentlyPlaying}
    upNext={data.upNext}
  />
{/if}

{#if data.recentlyPlayed && data.recentlyPlayed.length > 0}
  <RecentlyPlayed index={num('recent')} recentlyPlayed={data.recentlyPlayed} />
{/if}

{#if data.topArtists}
  <TopArtists index={num('top')} artists={data.topArtists} />
{/if}

<Playlists index={num('playlists')} />

{#if !data.currentlyPlaying}
  <CurrentlyPlaying
    index={num('playing')}
    currentlyPlaying={data.currentlyPlaying}
    upNext={data.upNext}
  />
{/if}
