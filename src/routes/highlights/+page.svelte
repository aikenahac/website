<script lang="ts">
  import Highlight from '$lib/components/Highlight.svelte';
  import { t } from '$lib/translations';
  import { reveal } from '$lib/actions/reveal';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { type PageServerData } from './$types';

  let { data }: { data: PageServerData } = $props();
</script>

<PageHeader index="04" title={$t('highlights.title')}>
  {#snippet aside()}
    {#if data.items.length > 0}
      <span class="text-xs uppercase tracking-[0.3em] opacity-60"
        >{String(data.items.length).padStart(2, '0')} ♱</span
      >
    {/if}
  {/snippet}
</PageHeader>

{#if data.items.length > 0}
  <div
    class="mt-16 w-full columns-4 gap-8 max-[1000px]:columns-3 max-[700px]:columns-2 max-[540px]:columns-1"
  >
    {#each data.items as item, i}
      <div use:reveal={{ delay: (i % 4) * 60 }} class="mb-8 break-inside-avoid [perspective:900px]">
        <Highlight url={item.url} caption={item.caption} width={item.width} height={item.height} />
      </div>
    {/each}
  </div>
{:else}
  <div class="ticks mt-16 flex w-full flex-col gap-4 p-10">
    <p class="font-mono text-lg text-aipink">{$t('highlights.none')}</p>
  </div>
{/if}
