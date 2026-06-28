<script lang="ts">
  import Highlight from '$lib/components/Highlight.svelte';
  import { t } from '$lib/translations';
  import { reveal } from '$lib/actions/reveal';
  import { type PageServerData } from './$types';

  let { data }: { data: PageServerData } = $props();
</script>

<div use:reveal class="card mt-8 flex w-full flex-col gap-4 rounded-sm border border-aipink p-6">
  <h1 class="font-mono text-4xl font-bold text-aipink">{$t('highlights.title')}</h1>
</div>

{#if data.items.length > 0}
  <div
    class="mt-8 columns-4 gap-8 max-[1000px]:columns-3 max-[700px]:columns-2 max-[540px]:columns-1"
  >
    {#each data.items as item, i}
      <div use:reveal={{ delay: (i % 4) * 60 }} class="mb-8 break-inside-avoid">
        <Highlight url={item.url} caption={item.caption} width={item.width} height={item.height} />
      </div>
    {/each}
  </div>
{:else}
  <div class="mt-8 flex w-full flex-col gap-4 rounded-sm border border-aipink p-6">
    <p class="font-mono text-aipink">{$t('highlights.none')}</p>
  </div>
{/if}
