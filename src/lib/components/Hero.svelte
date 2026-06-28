<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '$lib/translations';
  import Marquee from '$lib/components/Marquee.svelte';
  import l from '$lib/assets/l.gif';

  const words = ['Aiken', 'Tine', 'Ahac'];

  let loaded = $state(false);
  onMount(() => {
    loaded = true;
  });

  const marquee = $derived.by(() => {
    const value = $t('home.hero.marquee');
    return Array.isArray(value) ? (value as string[]) : [];
  });
</script>

<section class="hero relative flex min-h-[88vh] w-full flex-col justify-center" class:loaded>
  <div class="flex flex-row items-center justify-between gap-10 max-[860px]:flex-col">
    <div class="flex flex-col">
      <h1 class="hero-name font-mono font-bold leading-[0.95] text-aipink">
        {#each words as word, i (word)}
          <span class="word-mask"><span class="word" style={`--i:${i}`}>{word}</span></span>
        {/each}
      </h1>
      <p class="hero-role mt-6 font-mono text-xl text-aipink max-[860px]:text-lg">
        {$t('home.hero.role')}
      </p>
    </div>

    <img
      class="hero-l w-[26%] rounded-sm border border-aipink max-[860px]:w-[55%]"
      src={l}
      alt="L"
      data-cursor=""
    />
  </div>

  <div class="hero-marquee mt-16 w-full">
    <Marquee items={marquee} speed={32} />
  </div>

  <div class="scroll-cue mt-12 flex items-center justify-center gap-3">
    <span class="font-mono text-xs uppercase tracking-[0.3em] text-aipink opacity-70"
      >{$t('home.hero.scroll')}</span
    >
    <span class="scroll-arrow font-mono text-aipink">↓</span>
  </div>
</section>

<style>
  .hero-name {
    font-size: clamp(3rem, 12vw, 9rem);
    text-shadow: 0 0 40px rgba(212, 35, 198, 0.25);
  }

  .word-mask {
    display: block;
    overflow: hidden;
  }

  .word {
    display: inline-block;
    transform: translateY(110%);
    opacity: 0;
  }

  .loaded .word {
    animation: word-rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: calc(var(--i) * 0.12s);
  }

  .hero-role,
  .hero-l,
  .hero-marquee,
  .scroll-cue {
    opacity: 0;
    transform: translateY(20px);
  }

  .loaded .hero-role {
    animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards;
  }
  .loaded .hero-l {
    animation: fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
  }
  .loaded .hero-marquee {
    animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards;
  }
  .loaded .scroll-cue {
    animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards;
  }

  .scroll-arrow {
    animation: bob 1.6s ease-in-out infinite;
  }

  @keyframes word-rise {
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fade-up {
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes bob {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(6px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .word,
    .hero-role,
    .hero-l,
    .hero-marquee,
    .scroll-cue {
      opacity: 1;
      transform: none;
      animation: none;
    }
    .scroll-arrow {
      animation: none;
    }
  }
</style>
