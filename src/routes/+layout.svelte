<script lang="ts">
  import { onMount } from 'svelte';
  import Lenis from 'lenis';
  import { onNavigate } from '$app/navigation';
  import Nav from '$lib/components/Nav.svelte';
  import NowPlayingWidget from '$lib/components/NowPlayingWidget.svelte';
  import CustomCursor from '$lib/components/CustomCursor.svelte';
  import SelectionSparkles from '$lib/components/SelectionSparkles.svelte';
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

<main class="max-w-screen flex min-h-screen flex-col items-center bg-aiblack p-12 max-[860px]:p-6">
  <NowPlayingWidget />
  <Nav />
  {@render children()}
  <div
    use:reveal
    class="card mt-8 flex w-full flex-col items-center justify-center gap-4 rounded-sm border border-aipink p-6"
  >
    <p class="font-mono text-aipink">{$t('common.made')}</p>
    <a
      class="font-mono text-aipink underline"
      href="https://github.com/aikenahac/website"
      target="_blank"
      data-cursor="open">{$t('common.oss')}</a
    >
  </div>
</main>
