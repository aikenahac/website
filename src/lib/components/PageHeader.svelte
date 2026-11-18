<script lang="ts">
  import { onMount, type Snippet } from 'svelte';

  let {
    index,
    title,
    kicker,
    aside,
  }: {
    /** Section number shown before the title, e.g. "05". */
    index: string;
    title: string;
    /** Small uppercase line above the title. */
    kicker?: string;
    /** Optional content aligned to the right of the title (links, meta). */
    aside?: Snippet;
  } = $props();

  const words = $derived(title.split(' '));

  let loaded = $state(false);
  onMount(() => {
    loaded = true;
  });
</script>

<header class="page-header relative mt-16 w-full max-[860px]:mt-10" class:loaded>
  <div
    class="mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-aipink"
  >
    <span class="kicker">{index} /</span>
    {#if kicker}
      <span class="kicker opacity-60">{kicker}</span>
    {/if}
    <span class="rule static flex-1 opacity-60"></span>
  </div>

  <div class="flex flex-wrap items-end justify-between gap-6">
    <h1 class="title display glow-text font-mono text-aipink">
      {#each words as word, i (i)}
        <span class="word-mask"><span class="word" style={`--i:${i}`}>{word}</span></span>
      {/each}
    </h1>
    {#if aside}
      <div class="aside pb-2 font-mono text-aipink">{@render aside()}</div>
    {/if}
  </div>
</header>

<style>
  .title {
    font-size: clamp(3.25rem, 11vw, 9.5rem);
  }

  .word-mask {
    display: inline-block;
    overflow: hidden;
    padding-bottom: 0.06em;
    margin-right: 0.25em;
  }

  .word-mask:last-child {
    margin-right: 0;
  }

  .word {
    display: inline-block;
    transform: translateY(110%);
  }

  .loaded .word {
    animation: word-rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: calc(var(--i) * 0.1s);
  }

  .kicker,
  .aside {
    opacity: 0;
  }

  .loaded .kicker {
    animation: fade 0.6s ease 0.1s forwards;
  }

  .loaded .kicker.opacity-60 {
    animation-name: fade-dim;
  }

  .loaded .aside {
    animation: fade 0.8s ease 0.45s forwards;
  }

  @keyframes word-rise {
    to {
      transform: translateY(0);
    }
  }

  @keyframes fade {
    to {
      opacity: 1;
    }
  }

  @keyframes fade-dim {
    to {
      opacity: 0.6;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .word {
      transform: none;
    }
    .kicker,
    .aside {
      opacity: 1;
    }
    .kicker.opacity-60 {
      opacity: 0.6;
    }
    .loaded .word,
    .loaded .kicker,
    .loaded .aside {
      animation: none;
    }
  }
</style>
