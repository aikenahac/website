<script lang="ts">
  import type { SpotifySong } from '$lib/spotify/types';
  import { t } from '$lib/translations';
  import { reveal } from '$lib/actions/reveal';
  import SectionHeading from './SectionHeading.svelte';
  import Track from './Track.svelte';

  let { index, recentlyPlayed }: { index: string; recentlyPlayed: SpotifySong[] } = $props();

  const SIDE_LENGTH = 5;

  /** Liner-notes style position: A1–A5, B1–B5, … */
  const position = (i: number): string =>
    `${String.fromCharCode(65 + Math.floor(i / SIDE_LENGTH))}${(i % SIDE_LENGTH) + 1}`;
</script>

<section class="mt-28 w-full max-[860px]:mt-20">
  <SectionHeading {index} title={$t('music.recently_played')}>
    {#snippet aside()}
      {$t('music.side')} A{recentlyPlayed.length > SIDE_LENGTH ? ' / B' : ''}
    {/snippet}
  </SectionHeading>

  <div
    class="grid w-full grid-cols-5 gap-y-10 max-[1300px]:grid-cols-4 max-[1050px]:grid-cols-3 max-[780px]:grid-cols-2 max-[560px]:grid-cols-1"
  >
    {#each recentlyPlayed as track, i}
      <div
        use:reveal={{ delay: (i % SIDE_LENGTH) * 70 }}
        class="shelf-cell relative border-b border-aipink/25 pb-6"
      >
        <span
          class="absolute left-0 top-0 font-mono text-xs font-bold tracking-widest text-aipink opacity-60"
          >{position(i)}</span
        >
        <Track {track} />
      </div>
    {/each}
  </div>
</section>

<style>
  .shelf-cell::after {
    content: '';
    position: absolute;
    left: 10%;
    right: 10%;
    bottom: -1px;
    height: 1px;
    background: #d423c6;
    box-shadow: 0 0 12px rgba(212, 35, 198, 0.8);
    transform: scaleX(0);
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .shelf-cell:hover::after {
    transform: scaleX(1);
  }

  @media (prefers-reduced-motion: reduce) {
    .shelf-cell::after {
      transition: none;
    }
  }
</style>
