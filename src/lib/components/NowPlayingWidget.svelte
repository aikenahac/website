<script lang="ts">
  import type { SpotifySong } from '$lib/spotify/types';
  import { onDestroy, onMount } from 'svelte';

  let song = $state<SpotifySong | null>(null);

  async function fetchNowPlaying() {
    try {
      const res = await fetch('/api/spotify/now-playing');
      if (res.ok) {
        song = await res.json();
      }
    } catch {
      song = null;
    }
  }

  let interval: ReturnType<typeof setInterval>;

  onMount(() => {
    fetchNowPlaying();
    interval = setInterval(fetchNowPlaying, 30000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

{#if song?.playing}
  <a
    href={song.url}
    target="_blank"
    rel="noopener noreferrer"
    data-cursor="play"
    class="mb-4 flex w-full flex-row items-center gap-3 rounded-sm border border-aipink px-4 py-2 transition-all duration-200 hover:opacity-80"
  >
    <img
      src={song.coverUrl}
      alt={song.title}
      class="h-8 w-8 flex-shrink-0 rounded-sm object-cover"
    />
    <span class="font-mono text-sm text-aipink">♫</span>
    <div class="flex min-w-0 flex-col">
      <span class="font-mono text-sm font-bold text-aipink">{song.title}</span>
      <span class="font-mono text-xs text-aipink opacity-80">{song.artists}</span>
    </div>
    <div class="ml-auto flex flex-shrink-0 items-end gap-[3px]">
      <span class="bar"></span>
      <span class="bar" style="animation-delay: 0.2s"></span>
      <span class="bar" style="animation-delay: 0.4s"></span>
    </div>
  </a>
{/if}

<style>
  .bar {
    display: inline-block;
    width: 3px;
    height: 12px;
    background-color: #d423c6;
    border-radius: 1px;
    animation: bounce 0.8s ease-in-out infinite alternate;
  }

  @keyframes bounce {
    from {
      height: 4px;
    }
    to {
      height: 14px;
    }
  }
</style>
