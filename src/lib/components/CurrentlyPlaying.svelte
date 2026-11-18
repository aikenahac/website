<script lang="ts">
  import type { SpotifySong } from '$lib/spotify/types';
  import { t } from '$lib/translations';
  import { reveal } from '$lib/actions/reveal';
  import SectionHeading from './SectionHeading.svelte';
  import Track from './Track.svelte';

  let {
    index,
    currentlyPlaying,
    upNext,
  }: { index: string; currentlyPlaying: SpotifySong | null; upNext: SpotifySong | null } = $props();
</script>

<section class="mt-28 w-full max-[860px]:mt-20">
  <SectionHeading {index} title={$t('music.playing')}>
    {#snippet aside()}
      {#if currentlyPlaying?.playing}
        <span class="flex items-center gap-2"
          ><span class="on-air-dot"></span>{$t('music.on_air')}</span
        >
      {:else if currentlyPlaying}
        <span>{$t('music.paused')}</span>
      {/if}
    {/snippet}
  </SectionHeading>

  <div use:reveal class="ticks relative w-full overflow-hidden px-10 py-14 max-[860px]:px-6">
    <div
      class="grid grid-cols-[auto_1fr_auto] items-center gap-14 max-[1100px]:grid-cols-[auto_1fr] max-[950px]:grid-cols-1 max-[950px]:justify-items-center"
    >
      <!-- Vinyl (unchanged) on a blurred cover-art stage -->
      <div class="relative flex shrink-0 items-center justify-center p-6">
        {#if currentlyPlaying}
          <div
            class="stage-glow"
            style={`background-image: url('${currentlyPlaying.coverUrl}')`}
            aria-hidden="true"
          ></div>
        {/if}
        <div
          class={[
            'vinyl flex h-64 w-64 items-center justify-center rounded-full p-16',
            currentlyPlaying?.playing && 'animate-spin-slow',
          ].join(' ')}
        >
          <div class="absolute z-50 h-4 w-4 rounded-full bg-gray-900"></div>
          {#if currentlyPlaying}
            <img
              class="rounded-full"
              src={currentlyPlaying.coverUrl}
              alt={currentlyPlaying.title}
            />
          {/if}
        </div>
      </div>

      <div class="flex min-w-0 flex-col max-[950px]:items-center max-[950px]:text-center">
        {#if currentlyPlaying}
          <a
            class="song-title glow-text font-mono font-extrabold leading-[0.95] tracking-tight text-aipink transition-colors hover:text-white"
            href={currentlyPlaying.url}
            target="_blank"
            data-cursor="play"
          >
            {currentlyPlaying.title}
          </a>
          <p class="mt-5 font-mono text-xl text-aipink opacity-80">{currentlyPlaying.artists}</p>
        {:else}
          <p class="song-title display font-mono text-aipink opacity-80">
            {$t('music.nothing')}
          </p>
        {/if}
      </div>

      {#if upNext}
        <div
          class="flex flex-col items-center border-l border-aipink/30 pl-12 max-[1100px]:col-span-2 max-[1100px]:border-l-0 max-[1100px]:border-t max-[1100px]:pl-0 max-[1100px]:pt-10 max-[950px]:col-span-1"
        >
          <p class="font-mono text-xs uppercase tracking-[0.3em] text-aipink opacity-70">
            {$t('music.next')} →
          </p>
          <Track track={upNext} />
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .song-title {
    font-size: clamp(2rem, 5vw, 4.25rem);
    overflow-wrap: anywhere;
  }

  .on-air-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background: #d423c6;
    box-shadow: 0 0 10px #d423c6;
    animation: pulse 1.6s ease-in-out infinite;
  }

  @keyframes pulse {
    50% {
      opacity: 0.35;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .on-air-dot {
      animation: none;
    }
  }
</style>
