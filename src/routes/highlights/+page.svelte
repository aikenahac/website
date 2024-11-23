<script lang="ts">
  import Highlight from '$lib/components/Highlight.svelte';
  import { t } from '$lib/translations';
  import { type PageServerData } from './$types';

  let { data }: { data: PageServerData } = $props();
</script>

<div class="mt-8 flex w-full flex-col gap-4 rounded-sm border border-aipink p-6">
  <h1 class="font-mono text-4xl font-bold text-aipink">{$t('highlights.title')}</h1>
</div>

{#if data.items.length > 0}
  <div
    class="mt-8 grid grid-cols-4 gap-8 max-[1000px]:grid-cols-3 max-[700px]:grid-cols-2 max-[540px]:grid-cols-1"
  >
    {#each data.items as url}
      <Highlight {url} />
    {/each}
  </div>
{:else}
  <div class="mt-8 flex w-full flex-col gap-4 rounded-sm border border-aipink p-6">
    <p class="font-mono text-aipink">{$t('highlights.none')}</p>
  </div>
{/if}
