<script lang="ts">
  import type { SpotifyArtist } from '$lib/spotify/types';
  import { t } from '$lib/translations';
  import { reveal } from '$lib/actions/reveal';
  import SectionHeading from './SectionHeading.svelte';

  let { index, artists }: { index: string; artists: SpotifyArtist[] } = $props();
</script>

<section class="mt-28 w-full max-[860px]:mt-20">
  <SectionHeading {index} title={$t('music.top_artists')}>
    {#snippet aside()}
      Top {artists.length}
    {/snippet}
  </SectionHeading>

  <div
    class="grid w-full grid-cols-5 gap-y-10 max-[1300px]:grid-cols-4 max-[1050px]:grid-cols-3 max-[780px]:grid-cols-2 max-[560px]:grid-cols-1"
  >
    {#each artists as artist, i}
      <div
        use:reveal={{ delay: (i % 5) * 70 }}
        class="relative flex flex-col items-center justify-between border-b border-aipink/25 pb-6"
      >
        <span
          class="rank display display-outline pointer-events-none absolute left-0 top-0 z-0 select-none font-mono"
          aria-hidden="true">{String(i + 1).padStart(2, '0')}</span
        >
        <div class="my-6 flex translate-x-8 items-center justify-center">
          <img
            class="absolute z-50 mr-20 h-48 w-48 rounded-sm shadow-md"
            src={artist.imageUrl}
            alt={artist.name}
          />
          <div class="vinyl absolute h-44 w-44 rounded-full">
            <div class="vinyl absolute h-44 w-44 -translate-x-2 rounded-full">
              <div class="vinyl absolute h-44 w-44 -translate-x-3 rounded-full"></div>
            </div>
          </div>
        </div>
        <a
          class="relative z-10 text-center font-mono font-bold text-aipink underline decoration-aipink/40 underline-offset-4 transition-colors hover:text-white"
          href={artist.url}
          target="_blank"
          data-cursor="open">{artist.name}</a
        >
      </div>
    {/each}
  </div>
</section>

<style>
  .rank {
    font-size: 4.5rem;
    opacity: 0.35;
    transform: translateY(-1.5rem);
  }
</style>
