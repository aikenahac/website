<script lang="ts">
  import { onMount } from 'svelte';
  import Lenis from 'lenis';
  import { onNavigate } from '$app/navigation';
  import Nav from '$lib/components/Nav.svelte';
  import NowPlayingWidget from '$lib/components/NowPlayingWidget.svelte';
  import CustomCursor from '$lib/components/CustomCursor.svelte';
  import SelectionSparkles from '$lib/components/SelectionSparkles.svelte';
  import Marquee from '$lib/components/Marquee.svelte';
  import { prefersReducedMotion } from '$lib/actions/motion';
  import { reveal } from '$lib/actions/reveal';
  import { t } from '$lib/translations';
  import '../app.css';

  let { children } = $props();

  onMount(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  });

  onNavigate((navigation) => {
    if (!document.startViewTransition || prefersReducedMotion()) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<svelte:head>
  <title>Aiken Tine Ahac</title>
</svelte:head>

<CustomCursor />
<SelectionSparkles />

<div class="aurora" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>

<main
  class="max-w-screen relative z-10 flex min-h-screen flex-col items-center overflow-x-clip p-12 max-[860px]:p-6"
>
  <NowPlayingWidget />
  <Nav />
  {@render children()}

  <footer use:reveal class="mt-32 w-full max-[860px]:mt-20">
    <div class="-mx-12 border-y border-aipink/40 py-4 max-[860px]:-mx-6">
      <Marquee items={[$t('common.made'), 'Aiken Tine Ahac', $t('common.oss')]} speed={40} />
    </div>
    <div class="flex flex-wrap items-end justify-between gap-6 pt-10">
      <p class="footer-mark display display-outline select-none font-mono" aria-hidden="true">
        Aiken
      </p>
      <div
        class="flex flex-col items-end gap-2 pb-3 font-mono text-sm text-aipink max-[640px]:items-start"
      >
        <p>{$t('common.made')}</p>
        <a
          class="underline decoration-aipink/50 underline-offset-4 transition-colors hover:text-white"
          href="https://github.com/aikenahac/website"
          target="_blank"
          data-cursor="open">{$t('common.oss')} ↗</a
        >
        <p class="text-xs opacity-50">© {new Date().getFullYear()}</p>
      </div>
    </div>
  </footer>
</main>

<style>
  .footer-mark {
    font-size: clamp(4.5rem, 19vw, 17rem);
    line-height: 0.8;
    opacity: 0.85;
    transition:
      color 0.6s ease,
      text-shadow 0.6s ease;
  }

  .footer-mark:hover {
    color: #d423c6;
    text-shadow: 0 0 60px rgba(212, 35, 198, 0.5);
  }
</style>
