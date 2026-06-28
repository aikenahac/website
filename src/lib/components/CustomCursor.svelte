<script lang="ts">
  import { onMount } from 'svelte';
  import { isFinePointer, prefersReducedMotion } from '$lib/actions/motion';

  let enabled = $state(false);
  let hidden = $state(true);
  let active = $state(false);
  let pressed = $state(false);
  let hoverLabel = $state('');
  let hoverSub = $state('');
  let selCount = $state(0);

  // Selecting text takes over the pill; otherwise show the hovered element's hint.
  const selecting = $derived(selCount > 0);
  const label = $derived(selecting ? '✂ copy' : hoverLabel);
  const sub = $derived(selecting ? `${selCount} char${selCount === 1 ? '' : 's'}` : hoverSub);
  const grown = $derived(active || selecting);
  const labelled = $derived(!!(label || sub));

  let glow = $state<HTMLDivElement>();
  let dot = $state<HTMLDivElement>();

  /** Base domain of an external link (e.g. "instagram.com"), or '' for internal/none. */
  function linkDomain(node: HTMLElement | null): string {
    const anchor = node?.closest<HTMLAnchorElement>('a[href]');
    if (!anchor) return '';
    try {
      const url = new URL(anchor.href, window.location.href);
      if (!url.protocol.startsWith('http')) return '';
      if (url.hostname === window.location.hostname) return '';
      return url.hostname.replace(/^www\./, '');
    } catch {
      return '';
    }
  }

  // Decide capability after mount; this renders the elements (via {#if enabled}).
  onMount(() => {
    if (isFinePointer()) enabled = true;
  });

  // Runs once the elements are actually in the DOM and bound.
  $effect(() => {
    if (!enabled || !glow || !dot) return;

    const glowEl = glow;
    const dotEl = dot;
    const ease = prefersReducedMotion() ? 1 : 0.18;

    document.documentElement.classList.add('cursor-none');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let gx = mx;
    let gy = my;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      hidden = false;
      dotEl.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;

      const el = e.target as HTMLElement | null;
      const target = el?.closest<HTMLElement>('[data-cursor], a, button');
      active = !!target;
      hoverLabel = target?.dataset.cursor ?? '';
      hoverSub = linkDomain(el);
    };

    const loop = () => {
      gx += (mx - gx) * ease;
      gy += (my - gy) * ease;
      glowEl.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onLeave = () => (hidden = true);
    const onDown = () => (pressed = true);
    const onUp = () => (pressed = false);
    const onSel = () => {
      const text = window.getSelection()?.toString() ?? '';
      selCount = text.trim().length ? text.length : 0;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('selectionchange', onSel);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('selectionchange', onSel);
      document.documentElement.classList.remove('cursor-none');
    };
  });
</script>

{#if enabled}
  <div
    bind:this={glow}
    class="cursor-glow"
    class:active={grown}
    class:pressed
    class:hidden
    class:labelled
    aria-hidden="true"
  >
    <span class="cursor-ring"></span>
    {#if label || sub}
      <span class="cursor-label">
        {#if sub}<span class="cursor-sub">{sub}</span>{/if}
        {#if label}<span class="cursor-main">{label}</span>{/if}
      </span>
    {/if}
  </div>
  <div
    bind:this={dot}
    class="cursor-dot"
    class:active={grown}
    class:hidden
    aria-hidden="true"
  ></div>
{/if}

<style>
  .cursor-glow,
  .cursor-dot {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    pointer-events: none;
    border-radius: 9999px;
    will-change: transform;
  }

  .cursor-glow {
    display: grid;
    place-items: center;
  }

  /* The visual lives on an inner element so the JS-driven translate on the
     parent is never clobbered by CSS scale transitions. */
  .cursor-ring {
    display: block;
    width: 26px;
    height: 26px;
    border-radius: 9999px;
    background: radial-gradient(circle, rgba(212, 35, 198, 0.35) 0%, rgba(212, 35, 198, 0) 70%);
    mix-blend-mode: screen;
    transition:
      width 0.25s cubic-bezier(0.16, 1, 0.3, 1),
      height 0.25s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.15s ease,
      background 0.25s ease;
  }

  .cursor-glow.active .cursor-ring {
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, rgba(212, 35, 198, 0.3) 0%, rgba(212, 35, 198, 0) 72%);
  }

  .cursor-glow.labelled .cursor-ring {
    width: 52px;
    height: 52px;
    background: radial-gradient(circle, rgba(212, 35, 198, 0.4) 0%, rgba(212, 35, 198, 0.08) 70%);
  }

  .cursor-glow.pressed .cursor-ring {
    transform: scale(0.8);
  }

  /* Label sits in a pill floating above the circle. */
  .cursor-label {
    position: absolute;
    bottom: 100%;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
    margin-bottom: 6px;
    padding: 4px 11px;
    border-radius: 14px;
    background: rgba(23, 21, 18, 0.92);
    box-shadow: 0 4px 14px -4px rgba(0, 0, 0, 0.6);
    font-family: 'JetBrains Mono Variable', ui-monospace, monospace;
    white-space: nowrap;
    color: #fff;
    mix-blend-mode: normal;
    transform: translateX(-50%);
    animation: label-pop 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .cursor-sub {
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 0.65);
  }

  .cursor-main {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: capitalize;
  }

  @keyframes label-pop {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(4px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0) scale(1);
    }
  }

  .cursor-dot {
    width: 7px;
    height: 7px;
    background: #d423c6;
    box-shadow: 0 0 6px rgba(212, 35, 198, 0.5);
    transition: opacity 0.2s ease;
  }

  .cursor-dot.active {
    opacity: 0;
  }

  .cursor-glow.hidden,
  .cursor-dot.hidden {
    opacity: 0;
  }
</style>
