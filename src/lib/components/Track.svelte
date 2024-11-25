<script lang="ts">
  import type { SpotifySong } from '$lib/spotify/types';

  let { track }: { track: SpotifySong } = $props();
</script>

<div class="flex flex-col items-center justify-between">
  <div class="my-6 flex translate-x-8 items-center justify-center">
    <img
      class="absolute z-50 mr-20 h-48 w-48 rounded-sm shadow-md"
      src={track.coverUrl}
      alt={track.title}
    />
    <div class="vinyl h-44 w-44 rounded-full"></div>
  </div>
  <a class="text-center font-mono font-bold text-aipink underline" href={track.url} target="_blank"
    >{track.title}</a
  >
  <p class="text-center font-mono text-xs font-bold text-aipink">{track.artists}</p>
</div>
