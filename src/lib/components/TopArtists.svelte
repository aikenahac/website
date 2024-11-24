<script lang="ts">
  import type { SpotifyArtist } from '$lib/spotify/types';
  import { t } from '$lib/translations';

  let { artists }: { artists: SpotifyArtist[] } = $props();
</script>

<div class="mt-8 flex w-full flex-col rounded-sm border border-aipink p-6">
  <h2 class="mb-12 font-mono text-2xl font-bold text-aipink">{$t('music.top_artists')}</h2>
  <div
    class="grid w-full grid-cols-5 gap-y-6 max-[1300px]:grid-cols-4 max-[1050px]:grid-cols-3 max-[780px]:grid-cols-2 max-[560px]:grid-cols-1"
  >
    {#each artists as artist}
      <div class="flex flex-col items-center justify-between">
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
        <p class="text-center font-mono font-bold text-aipink">{artist.name}</p>
      </div>
    {/each}
  </div>
</div>
