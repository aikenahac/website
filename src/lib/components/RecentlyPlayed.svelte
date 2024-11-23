<script lang="ts">
  import type { SpotifySong } from '$lib/spotify/types';
  import { t } from '$lib/translations';
  import Track from './Track.svelte';

  let { recentlyPlayed }: { recentlyPlayed: SpotifySong[] } = $props();
</script>

<div class="mt-8 flex w-full flex-col rounded-sm border border-aipink p-6">
  <h2 class="mb-12 font-mono text-2xl font-bold text-aipink">{$t('music.recently_played')}</h2>
  <div
    class="grid w-full grid-cols-5 gap-y-6 max-[1300px]:grid-cols-4 max-[1050px]:grid-cols-3 max-[780px]:grid-cols-2 max-[560px]:grid-cols-1"
  >
    {#each recentlyPlayed as track}
      <Track {track} />
    {/each}
  </div>
</div>
