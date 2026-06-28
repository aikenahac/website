<script lang="ts">
  import type { Route } from '$lib/types';
  import { t } from '$lib/translations';
  import { page } from '$app/stores';
  import { magnetic } from '$lib/actions/magnetic';
  import { prefersReducedMotion } from '$lib/actions/motion';

  const baseFace = '=^･ω･^=';
  const happyFaces = ['=^ω^=', '(=^･ｪ･^=)', 'ฅ^•ω•^ฅ', '(=ↀωↀ=)', '=^- ω -^='];
  const glyphs = ['♥', '♡', '✦', '✧', '✿', '♪', '♫', '⋆'];

  let face = $state(baseFace);
  let bouncing = $state(false);
  let particles = $state<{ id: number; glyph: string; dx: number; rot: number; dur: number }[]>([]);

  let idCounter = 0;
  let faceTimer: ReturnType<typeof setTimeout>;

  function petCat() {
    face = happyFaces[Math.floor(Math.random() * happyFaces.length)];
    bouncing = false;
    requestAnimationFrame(() => (bouncing = true));

    clearTimeout(faceTimer);
    faceTimer = setTimeout(() => {
      face = baseFace;
      bouncing = false;
    }, 900);

    if (prefersReducedMotion()) return;

    const burst = Array.from({ length: 6 }, () => ({
      id: idCounter++,
      glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
      dx: Math.round((Math.random() - 0.5) * 90),
      rot: Math.round((Math.random() - 0.5) * 120),
      dur: 700 + Math.round(Math.random() * 500),
    }));
    particles = [...particles, ...burst];
  }

  function removeParticle(id: number) {
    particles = particles.filter((p) => p.id !== id);
  }

  const routes: Route[] = [
    {
      name: $t('common.nav.home'),
      path: '/',
    },
    {
      name: $t('common.nav.work'),
      path: '/work',
    },
    {
      name: $t('common.nav.projects'),
      path: '/projects',
    },
    {
      name: $t('common.nav.highlights'),
      path: '/highlights',
    },
    {
      name: $t('common.nav.music'),
      path: '/music',
    },
  ];

  const text =
    'hover:pointer font-mono text-aipink transition-all duration-200 hover:scale-110 hover:font-bold';
</script>

<div
  class="flex w-full flex-row items-center justify-start rounded-sm border border-aipink px-4 py-2 max-[860px]:grid max-[860px]:grid-cols-2"
>
  {#each routes as route, i}
    <a
      use:magnetic={{ strength: 0.18, radius: 30 }}
      data-cursor=""
      class={[text, route.path === $page.url.pathname && 'font-bold'].join(' ')}
      href={route.path}>{route.name} <span class="min-[860px]:hidden">☽</span></a
    >
    {#if i !== routes.length - 1}
      <p class="mx-6 text-aipink max-[860px]:hidden">☽</p>
    {/if}
  {/each}

  <button
    type="button"
    onclick={petCat}
    aria-label="Pet the cat"
    data-cursor="pet"
    use:magnetic={{ strength: 0.18, radius: 30 }}
    class="cat ml-auto select-none whitespace-nowrap font-mono text-aipink transition-colors hover:text-white max-[860px]:mt-2 max-[860px]:justify-self-center"
  >
    <span class="cat-face" class:bounce={bouncing} aria-hidden="true">{face}</span>
    {#each particles as p (p.id)}
      <span
        class="particle"
        style={`--dx:${p.dx}px; --rot:${p.rot}deg; --dur:${p.dur}ms;`}
        onanimationend={() => removeParticle(p.id)}
        aria-hidden="true">{p.glyph}</span
      >
    {/each}
  </button>
</div>

<style>
  .cat {
    position: relative;
    line-height: 1;
  }

  .cat-face {
    display: inline-block;
    will-change: transform;
  }

  .cat-face.bounce {
    animation: cat-bounce 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .particle {
    position: absolute;
    left: 50%;
    top: 0;
    pointer-events: none;
    color: #d423c6;
    text-shadow: 0 0 8px rgba(212, 35, 198, 0.6);
    animation: float-up var(--dur, 900ms) ease-out forwards;
  }

  @keyframes cat-bounce {
    0% {
      transform: scale(1) rotate(0deg);
    }
    30% {
      transform: scale(1.3) rotate(-8deg);
    }
    60% {
      transform: scale(0.92) rotate(6deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes float-up {
    0% {
      opacity: 0;
      transform: translate(-50%, 0) scale(0.5) rotate(0deg);
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate(calc(-50% + var(--dx)), -42px) scale(1.1) rotate(var(--rot));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .cat-face.bounce {
      animation: none;
    }
  }
</style>
