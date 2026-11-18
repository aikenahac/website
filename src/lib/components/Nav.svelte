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
    {
      name: $t('common.nav.hire'),
      path: '/hire',
    },
  ];

  const text = 'nav-link relative font-mono text-aipink transition-colors duration-200';

  let navEl: HTMLElement | undefined = $state();
  let links: HTMLAnchorElement[] = $state([]);
  let indicator = $state({ x: 0, y: 0, w: 0, visible: false });

  function moveIndicator() {
    const i = routes.findIndex((r) => r.path === $page.url.pathname);
    const link = links[i];
    if (!link || !navEl) {
      indicator = { ...indicator, visible: false };
      return;
    }
    indicator = {
      x: link.offsetLeft,
      y: link.offsetTop + link.offsetHeight + 2,
      w: link.offsetWidth,
      visible: true,
    };
  }

  $effect(() => {
    void $page.url.pathname;
    moveIndicator();
    window.addEventListener('resize', moveIndicator);
    return () => window.removeEventListener('resize', moveIndicator);
  });
</script>

<nav
  bind:this={navEl}
  class="sticky top-4 z-40 flex w-full flex-row items-center justify-start rounded-sm border border-aipink/70 bg-aiblack/70 px-5 py-3 shadow-[0_10px_40px_-20px_rgba(212,35,198,0.6)] backdrop-blur-md max-[860px]:static max-[860px]:grid max-[860px]:grid-cols-2 max-[860px]:gap-y-2"
>
  {#each routes as route, i}
    <a
      bind:this={links[i]}
      use:magnetic={{ strength: 0.18, radius: 30 }}
      data-cursor=""
      aria-current={route.path === $page.url.pathname ? 'page' : undefined}
      class={[text, route.path === $page.url.pathname ? 'font-bold' : 'opacity-75'].join(' ')}
      href={route.path}
      ><span class="mr-1 text-[0.65rem] opacity-50">0{i + 1}</span>{route.name}
      <span class="min-[860px]:hidden">☽</span></a
    >
    {#if i !== routes.length - 1}
      <p class="mx-5 text-aipink opacity-50 max-[860px]:hidden">☽</p>
    {/if}
  {/each}

  <span
    class="nav-indicator max-[860px]:hidden"
    class:visible={indicator.visible}
    style={`transform: translate(${indicator.x}px, ${indicator.y}px); width: ${indicator.w}px;`}
    aria-hidden="true"
  ></span>

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
</nav>

<style>
  .nav-link:hover {
    opacity: 1;
    color: white;
  }

  .nav-indicator {
    position: absolute;
    left: 0;
    top: 0;
    height: 2px;
    background: #d423c6;
    box-shadow: 0 0 12px rgba(212, 35, 198, 0.9);
    opacity: 0;
    transition:
      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      width 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.3s ease;
  }

  .nav-indicator.visible {
    opacity: 1;
  }

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
    .nav-indicator {
      transition: none;
    }
  }
</style>
