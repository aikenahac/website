<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { magnetic } from '$lib/actions/magnetic';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import SectionHeading from '$lib/components/SectionHeading.svelte';

  const selectedWork = [
    {
      label: 'Vehicle products',
      title: 'Product work that holds up away from a perfect connection',
      body: 'At Preskok, I work on guided vehicle-capture flows, upload queues, and data-dense internal tools. The interesting part is making operational edge cases feel ordinary to the person using the product.',
    },
    {
      label: 'Open source',
      title: 'A React Native maps package built for real applications',
      body: 'mapcn-react-native provides reusable map components with Mapbox and MapLibre support. It is a practical extension of my interest in mobile product work, component APIs, and mapping.',
      href: 'https://github.com/aikenahac/mapcn-react-native',
    },
    {
      label: 'Startup ownership',
      title: 'Enough backend experience to carry a feature across the line',
      body: 'I have spent most of my career in small product teams. I am most useful when frontend work includes shaping the problem, making tradeoffs with design, and handling the server-side work needed to ship.',
    },
  ];

  const workingStyle = [
    'Start with the user and the constraint, then choose the implementation.',
    'Keep component and data APIs small enough that the next change is still easy.',
    'Show work early, write down consequential decisions, and say when something is uncertain.',
    'Care about performance and accessibility as product behavior, not cleanup work.',
  ];
</script>

<svelte:head>
  <title>For teams · Aiken Tine Ahac</title>
  <meta
    name="description"
    content="Aiken Tine Ahac is a product-focused frontend engineer working with React, Next.js, TypeScript, and React Native."
  />
</svelte:head>

<PageHeader index="06" title="For teams" kicker="For product teams hiring in Europe" />

<div class="flex w-full flex-col gap-28 pb-8 pt-16 max-[860px]:gap-20">
  <section use:reveal class="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
    <h2 class="statement max-w-4xl font-mono font-bold leading-[1.05] text-aipink">
      I build frontend-heavy products where the hard part is <em class="not-italic text-white"
        >understanding the problem.</em
      >
    </h2>

    <div class="flex flex-col justify-end gap-5 border-l border-aipink/30 pl-8">
      <p class="font-mono leading-relaxed text-aipink">
        I’m a product-focused frontend engineer in Ljubljana. My usual tools are React, Next.js,
        TypeScript, and React Native, with enough backend experience to take a feature from an
        unclear brief to a working release.
      </p>
      <p class="font-mono leading-relaxed text-aipink opacity-75">
        Senior frontend or product-engineering work with a fully remote team able to work B2B in
        Europe. Also willing to relocate with support.
      </p>
    </div>
  </section>

  <section>
    <SectionHeading index="01" title="Selected work" />
    <div class="flex flex-col">
      {#each selectedWork as item, index}
        <article
          use:reveal={{ delay: index * 60 }}
          class="work-row group grid gap-6 border-b border-aipink/25 py-10 lg:grid-cols-[6rem_16rem_1fr]"
        >
          <span class="display display-outline font-mono text-6xl text-aipink">0{index + 1}</span>
          <p class="pt-2 font-mono text-xs uppercase tracking-[0.2em] text-aipink opacity-60">
            {item.label}
          </p>
          <div class="flex flex-col">
            <h3 class="font-mono text-2xl font-bold leading-snug text-aipink sm:text-3xl">
              {item.title}
            </h3>
            <p class="mt-4 max-w-3xl font-mono leading-relaxed text-aipink opacity-80">
              {item.body}
            </p>
            {#if item.href}
              <a
                use:magnetic={{ strength: 0.12, radius: 24 }}
                class="mt-6 self-start font-mono text-aipink underline underline-offset-4 transition-colors hover:text-white"
                href={item.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="open">View the repository ↗</a
              >
            {/if}
          </div>
        </article>
      {/each}
    </div>
  </section>

  <section class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
    <div use:reveal>
      <p class="font-mono text-sm uppercase tracking-[0.22em] text-aipink opacity-60">
        ♱ 02 Working style
      </p>
      <h2 class="display glow-text mt-4 font-mono text-5xl text-aipink sm:text-7xl">
        Quiet ownership.
      </h2>
    </div>
    <ol class="flex flex-col">
      {#each workingStyle as item, i}
        <li
          use:reveal={{ delay: i * 60, y: 12 }}
          class="flex gap-6 border-b border-aipink/20 py-5 font-mono leading-relaxed text-aipink"
        >
          <span class="text-xs opacity-50">0{i + 1}</span>
          <span>{item}</span>
        </li>
      {/each}
    </ol>
  </section>

  <section use:reveal class="cta ticks relative overflow-hidden px-10 py-16 max-[860px]:px-6">
    <p class="font-mono text-sm uppercase tracking-[0.22em] text-aipink opacity-60">
      ♱ 03 A useful first conversation
    </p>
    <h2 class="mt-4 max-w-4xl font-mono text-3xl font-bold leading-tight text-aipink sm:text-5xl">
      Tell me what the product makes difficult today.
    </h2>
    <p class="mt-6 max-w-2xl font-mono leading-relaxed text-aipink opacity-80">
      A role description is useful, but context is better: the product surface, the team, and the
      constraint you want the next engineer to help remove.
    </p>
    <div class="mt-10 flex flex-col items-start gap-6">
      <a
        use:magnetic={{ strength: 0.1, radius: 30 }}
        class="mail display font-mono text-aipink"
        href="mailto:me@aiken.si">me@aiken.si →</a
      >
      <div class="flex flex-wrap gap-x-6 gap-y-3">
        <a
          class="font-mono text-aipink underline"
          href="https://github.com/aikenahac"
          target="_blank"
          rel="noreferrer"
          data-cursor="open">GitHub ↗</a
        >
        <a
          class="font-mono text-aipink underline"
          href="https://www.linkedin.com/in/aahac"
          target="_blank"
          rel="noreferrer"
          data-cursor="open">LinkedIn ↗</a
        >
        <a class="font-mono text-aipink underline" href="/cv.pdf">Current CV ↓</a>
      </div>
    </div>
  </section>

  <p class="-mt-16 font-mono text-sm leading-relaxed text-aipink opacity-60">
    Based in Ljubljana, Slovenia · CET / CEST · English and Slovenian
  </p>
</div>

<style>
  .statement {
    font-size: clamp(2rem, 4.6vw, 4rem);
    letter-spacing: -0.03em;
  }

  .mail {
    font-size: clamp(2.25rem, 7vw, 6rem);
    text-transform: none;
    transition:
      color 0.4s ease,
      filter 0.4s ease;
  }

  .mail:hover {
    color: white;
    filter: drop-shadow(0 0 30px rgba(212, 35, 198, 0.7));
  }

  .cta {
    background-color: rgba(212, 35, 198, 0.04);
  }

  .work-row {
    transition: padding 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .work-row:hover {
    padding-left: 0.75rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .mail,
    .work-row {
      transition: none;
    }
  }
</style>
