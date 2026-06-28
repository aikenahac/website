<script lang="ts">
  import { onMount } from 'svelte';
  import { prefersReducedMotion } from '$lib/actions/motion';

  const glyphs = ['♥', '♡', '✦', '✧', '✿', '♪', '♫', '⋆'];

  type Particle = {
    id: number;
    glyph: string;
    x: number;
    y: number;
    dx: number;
    rot: number;
    dur: number;
  };
  let particles = $state<Particle[]>([]);
  let idCounter = 0;

  function removeParticle(id: number) {
    particles = particles.filter((p) => p.id !== id);
  }

  onMount(() => {
    if (prefersReducedMotion()) return;

    let lastText = '';

    const onDown = () => (lastText = '');

    const onUp = (e: PointerEvent) => {
      const text = window.getSelection()?.toString().trim() ?? '';
      if (!text || text === lastText) return;
      lastText = text;

      const burst = Array.from({ length: 6 }, () => ({
        id: idCounter++,
        glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
        x: e.clientX,
        y: e.clientY,
        dx: Math.round((Math.random() - 0.5) * 90),
        rot: Math.round((Math.random() - 0.5) * 120),
        dur: 700 + Math.round(Math.random() * 500),
      }));
      particles = [...particles, ...burst];
    };

    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  });
</script>

{#each particles as p (p.id)}
  <span
    class="sel-particle"
    style={`left:${p.x}px; top:${p.y}px; --dx:${p.dx}px; --rot:${p.rot}deg; --dur:${p.dur}ms;`}
    onanimationend={() => removeParticle(p.id)}
    aria-hidden="true">{p.glyph}</span
  >
{/each}

<style>
  .sel-particle {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9998;
    pointer-events: none;
    color: #d423c6;
    font-size: 14px;
    text-shadow: 0 0 8px rgba(212, 35, 198, 0.6);
    animation: sel-float-up var(--dur, 900ms) ease-out forwards;
  }

  @keyframes sel-float-up {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5) rotate(0deg);
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate(calc(-50% + var(--dx)), calc(-50% - 48px)) scale(1.1) rotate(var(--rot));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sel-particle {
      display: none;
    }
  }
</style>
