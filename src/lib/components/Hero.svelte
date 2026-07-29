<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '$lib/translations';
  import { tilt } from '$lib/actions/tilt';
  import { magnetic } from '$lib/actions/magnetic';
  import l from '$lib/assets/l.gif';

  const words = ['Aiken', 'Tine', 'Ahac'];

  let loaded = $state(false);
  onMount(() => {
    loaded = true;
  });
</script>

<section class="hero relative flex min-h-[88vh] w-full flex-col justify-center" class:loaded>
  <div class="mx-auto w-full max-w-6xl">
    <div
      class="grid grid-cols-[1.4fr_1fr] items-center gap-x-12 max-[860px]:grid-cols-1 max-[860px]:gap-y-10"
    >
      <div class="flex flex-col">
        <p class="hero-eyebrow mb-5 font-mono text-xs uppercase tracking-[0.24em] text-aipink">
          {$t('home.hero.eyebrow')}
        </p>
        <h1 class="hero-name font-mono font-bold leading-[0.95] text-aipink">
          {#each words as word, i (word)}
            <span class="word-mask"><span class="word" style={`--i:${i}`}>{word}</span></span>
          {/each}
        </h1>

        <div class="hero-meta mt-6">
          <p
            class="hero-role max-w-3xl font-mono text-2xl font-bold leading-tight text-aipink max-[860px]:text-xl"
          >
            {$t('home.hero.statement')}<span class="caret" aria-hidden="true">▍</span>
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <a
              use:magnetic={{ strength: 0.12, radius: 26 }}
              class="hero-action border border-aipink bg-aipink px-5 py-3 font-mono text-sm font-bold text-black"
              href="/hire">{$t('home.hero.hire_cta')}</a
            >
            <a
              use:magnetic={{ strength: 0.12, radius: 26 }}
              class="hero-action border border-aipink px-5 py-3 font-mono text-sm text-aipink"
              href="/work">{$t('home.hero.work_cta')}</a
            >
          </div>
          <p
            class="hero-location mt-4 font-mono text-xs uppercase tracking-[0.14em] text-aipink opacity-55"
          >
            {$t('home.hero.location')}
          </p>
        </div>
      </div>

      <div class="hero-l-wrap">
        <img
          class="hero-l w-full rounded-sm border border-aipink"
          src={l}
          alt="L"
          use:tilt
          data-cursor=""
        />
      </div>
    </div>
  </div>

  <div class="scroll-cue mt-16 flex items-center justify-center gap-3">
    <span class="font-mono text-xs uppercase tracking-[0.3em] text-aipink opacity-70"
      >{$t('home.hero.scroll')}</span
    >
    <span class="scroll-arrow font-mono text-aipink">↓</span>
  </div>
</section>

<style>
  .hero-name {
    font-size: clamp(3rem, 8.5vw, 7.2rem);
    text-shadow: 0 0 40px rgba(212, 35, 198, 0.25);
  }

  .hero-eyebrow {
    opacity: 0;
    transform: translateY(14px);
  }

  .loaded .hero-eyebrow {
    animation: fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.08s forwards;
  }

  .hero-action {
    transition:
      color 180ms ease,
      background 180ms ease,
      transform 180ms ease;
  }

  .hero-action:hover {
    background: white;
    border-color: white;
    color: black;
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

  .caret {
    display: inline-block;
    margin-left: 0.15em;
    transform: translateY(0.04em);
    animation: blink 1.1s steps(1) infinite;
  }

  /* Perspective host for the image tilt (transform owned by the tilt action). */
  .hero-l-wrap {
    perspective: 900px;
  }

  .hero-l {
    box-shadow: 0 0 0 rgba(212, 35, 198, 0);
    transition: box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .hero-l:hover {
    box-shadow: 0 18px 60px rgba(212, 35, 198, 0.35);
  }

  .hero-meta,
  .hero-l-wrap,
  .scroll-cue {
    opacity: 0;
    transform: translateY(20px);
  }

  .loaded .hero-meta {
    animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards;
  }
  .loaded .hero-l-wrap {
    animation: fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
  }
  .loaded .scroll-cue {
    animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards;
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

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    50.01%,
    100% {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .word,
    .hero-eyebrow,
    .hero-meta,
    .hero-l-wrap,
    .scroll-cue {
      opacity: 1;
      transform: none;
      animation: none;
    }
    .scroll-arrow,
    .caret {
      animation: none;
    }
  }
</style>
