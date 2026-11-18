<script lang="ts">
  import type { Snippet } from 'svelte';
  import { reveal } from '$lib/actions/reveal';

  let {
    index,
    title,
    id,
    aside,
  }: {
    /** Section number, e.g. "02". */
    index: string;
    title: string;
    /** Optional id on the heading, for aria-labelledby. */
    id?: string;
    aside?: Snippet;
  } = $props();
</script>

<div use:reveal class="mb-10 w-full">
  <div class="flex items-baseline gap-4 font-mono text-aipink">
    <span class="shrink-0 whitespace-nowrap text-sm opacity-60">♱ {index}</span>
    <h2 {id} class="min-w-0 text-2xl font-bold uppercase tracking-tight sm:text-4xl">{title}</h2>
    {#if aside}
      <div
        class="ml-auto shrink-0 whitespace-nowrap text-xs uppercase tracking-[0.2em] opacity-70 max-[560px]:hidden"
      >
        {@render aside()}
      </div>
    {/if}
  </div>
  <div class="rule mt-4"></div>
</div>
