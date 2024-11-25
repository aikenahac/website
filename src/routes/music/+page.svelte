<script lang="ts">
  import CurrentlyPlaying from '$lib/components/CurrentlyPlaying.svelte';
    import Playlists from '$lib/components/Playlists.svelte';
  import RecentlyPlayed from '$lib/components/RecentlyPlayed.svelte';
  import TopArtists from '$lib/components/TopArtists.svelte';
  import { t } from '$lib/translations';
  import type { PageServerData } from './$types';

  let { data }: { data: PageServerData } = $props();
</script>

<div class="mt-8 flex w-full flex-col gap-4 rounded-sm border border-aipink p-6">
  <h1 class="font-mono text-4xl font-bold text-aipink">{$t('music.title')}</h1>
</div>

{#if data.currentlyPlaying}
  <CurrentlyPlaying currentlyPlaying={data.currentlyPlaying} upNext={data.upNext} />
{/if}

{#if data.recentlyPlayed && data.recentlyPlayed.length > 0}
  <RecentlyPlayed recentlyPlayed={data.recentlyPlayed} />
{/if}

{#if data.topArtists}
  <TopArtists artists={data.topArtists} />
{/if}

<Playlists />

{#if !data.currentlyPlaying}
  <CurrentlyPlaying currentlyPlaying={data.currentlyPlaying} upNext={data.upNext} />
{/if}
