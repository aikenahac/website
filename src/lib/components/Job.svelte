<script lang="ts">
  import type { JobBulletItem, JobItem } from '$lib/types';
  import { reveal } from '$lib/actions/reveal';

  let { job }: { job: JobItem } = $props();

  const startYear = $derived(job.start.split(' ').at(-1) ?? job.start);
</script>

{#snippet bullets(items: JobBulletItem[])}
  <ul class="list-['♱']">
    {#each items as item}
      <li class="ml-4 pl-2 font-mono text-sm text-aipink">
        {item.text}
        {#if item.children?.length}
          {@render bullets(item.children)}
        {/if}
      </li>
    {/each}
  </ul>
{/snippet}

<div
  use:reveal
  class="job grid w-full grid-cols-[minmax(0,12rem)_minmax(0,1fr)] gap-x-12 max-[860px]:grid-cols-1"
>
  <div class="relative pt-8 max-[860px]:pt-10">
    <div class="sticky top-28 flex flex-col gap-2 font-mono text-aipink">
      <span class="year display display-outline">{startYear}</span>
      <span class="text-xs uppercase tracking-[0.2em] opacity-60">{job.start} — {job.end}</span>
    </div>
  </div>

  <div
    class="timeline relative flex flex-col gap-4 border-l border-aipink/30 py-8 pl-10 max-[860px]:border-l-0 max-[860px]:pl-0 max-[860px]:pt-4"
  >
    <span class="dot max-[860px]:hidden" aria-hidden="true"></span>
    <div>
      <a
        href={job.url}
        class="job-title font-mono text-2xl font-bold text-aipink transition-colors hover:text-white sm:text-3xl"
        target="_blank"
        data-cursor="open">{job.title} <span class="arrow">↗</span></a
      >
      <p class="mt-2 font-mono text-sm uppercase tracking-[0.15em] text-aipink opacity-70">
        {job.location}
      </p>
    </div>
    {#each job.paragraphs as paragraph}
      <p class="max-w-3xl font-mono text-sm leading-relaxed text-aipink">{paragraph}</p>
    {/each}
    {#if job.references?.length}
      <div class="flex flex-row gap-2">
        {#each job.references as reference}
          <a
            class="font-mono text-sm text-aipink underline"
            href={reference.url}
            target="_blank"
            data-cursor="open">{reference.label}</a
          >
        {/each}
      </div>
    {/if}
    {#if job.bullets?.length}
      {@render bullets(job.bullets)}
    {/if}
  </div>
</div>

<style>
  .year {
    font-size: clamp(3rem, 6vw, 4.5rem);
    transition: color 0.5s ease;
  }

  .job:hover .year {
    color: #d423c6;
  }

  .dot {
    position: absolute;
    left: -5px;
    top: 2.6rem;
    width: 9px;
    height: 9px;
    border-radius: 9999px;
    background: #171512;
    border: 1px solid #d423c6;
    transition:
      background-color 0.4s ease,
      box-shadow 0.4s ease;
  }

  .job:hover .dot {
    background: #d423c6;
    box-shadow: 0 0 14px #d423c6;
  }

  .arrow {
    display: inline-block;
    font-size: 0.6em;
    opacity: 0.6;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .job-title:hover .arrow {
    transform: translate(3px, -3px);
  }

  @media (prefers-reduced-motion: reduce) {
    .year,
    .dot,
    .arrow {
      transition: none;
    }
  }
</style>
