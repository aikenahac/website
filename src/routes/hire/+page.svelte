<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { magnetic } from '$lib/actions/magnetic';

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

<div class="mx-auto flex w-full max-w-6xl flex-col gap-8 py-20 max-[860px]:py-12">
  <section use:reveal class="grid gap-10 border-b border-aipink pb-16 lg:grid-cols-[1.5fr_1fr]">
    <div>
      <p class="font-mono text-sm uppercase tracking-[0.22em] text-aipink opacity-70">
        For product teams hiring in Europe
      </p>
      <h1
        class="mt-5 max-w-4xl font-mono text-4xl font-bold leading-tight text-aipink sm:text-6xl"
      >
        I build frontend-heavy products where the hard part is understanding the problem.
      </h1>
    </div>

    <div class="flex flex-col justify-end gap-5">
      <p class="font-mono leading-relaxed text-aipink">
        I’m a product-focused frontend engineer in Ljubljana. My usual tools are React, Next.js,
        TypeScript, and React Native, with enough backend experience to take a feature from an
        unclear brief to a working release.
      </p>
      <p class="font-mono leading-relaxed text-aipink opacity-75">
        I’m interested in senior frontend and product-engineering work with a fully remote team
        that can hire in Slovenia or work B2B.
      </p>
    </div>
  </section>

  <section class="grid gap-6 lg:grid-cols-3">
    {#each selectedWork as item, index}
      <article
        use:reveal={{ delay: index * 80 }}
        class="card flex min-h-80 flex-col rounded-sm border border-aipink p-7"
      >
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-aipink opacity-60">
          {item.label}
        </p>
        <h2 class="mt-5 font-mono text-2xl font-bold leading-snug text-aipink">{item.title}</h2>
        <p class="mt-5 font-mono leading-relaxed text-aipink opacity-80">{item.body}</p>
        {#if item.href}
          <a
            use:magnetic={{ strength: 0.12, radius: 24 }}
            class="mt-auto pt-8 font-mono text-aipink underline"
            href={item.href}
            target="_blank"
            rel="noreferrer"
            data-cursor="open">View the repository ↗</a
          >
        {/if}
      </article>
    {/each}
  </section>

  <section
    use:reveal
    class="grid gap-10 rounded-sm border border-aipink p-8 lg:grid-cols-[0.8fr_1.2fr]"
  >
    <div>
      <p class="font-mono text-sm uppercase tracking-[0.22em] text-aipink opacity-60">
        Working style
      </p>
      <h2 class="mt-4 font-mono text-3xl font-bold text-aipink">Quiet ownership.</h2>
    </div>
    <ul class="grid gap-5">
      {#each workingStyle as item}
        <li class="flex gap-4 font-mono leading-relaxed text-aipink">
          <span aria-hidden="true">♱</span>
          <span>{item}</span>
        </li>
      {/each}
    </ul>
  </section>

  <section use:reveal class="grid gap-8 border-y border-aipink py-12 lg:grid-cols-2">
    <div>
      <p class="font-mono text-sm uppercase tracking-[0.22em] text-aipink opacity-60">
        A useful first conversation
      </p>
      <h2 class="mt-4 font-mono text-3xl font-bold leading-tight text-aipink">
        Tell me what the product makes difficult today.
      </h2>
    </div>
    <div class="flex flex-col items-start gap-5">
      <p class="font-mono leading-relaxed text-aipink opacity-80">
        A role description is useful, but context is better: the product surface, the team, and
        the constraint you want the next engineer to help remove.
      </p>
      <div class="flex flex-wrap gap-x-6 gap-y-3">
        <a
          use:magnetic
          class="font-mono font-bold text-aipink underline"
          href="mailto:me@aiken.si">me@aiken.si</a
        >
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

  <p class="font-mono text-sm leading-relaxed text-aipink opacity-60">
    Based in Ljubljana, Slovenia · CET / CEST · English and Slovenian
  </p>
</div>
