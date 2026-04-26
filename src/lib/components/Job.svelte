<script lang="ts">
  import type { JobBulletItem, JobItem } from '$lib/types';

  let { job }: { job: JobItem } = $props();
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

<div class="mt-8 flex w-full flex-col gap-4 rounded-sm border border-aipink p-6">
  <div>
    <a href={job.url} class="font-mono text-xl font-bold text-aipink underline" target="_blank"
      >{job.title}</a
    >
    <p class="font-mono text-aipink">{job.start} - {job.end}</p>
    <p class="font-mono text-sm text-aipink">{job.location}</p>
  </div>
  {#each job.paragraphs as paragraph}
    <p class="font-mono text-sm text-aipink">{paragraph}</p>
  {/each}
  {#if job.references?.length}
    <div class="flex flex-row gap-2">
      {#each job.references as reference}
        <a class="font-mono text-sm text-aipink underline" href={reference.url} target="_blank"
          >{reference.label}</a
        >
      {/each}
    </div>
  {/if}
  {#if job.bullets?.length}
    {@render bullets(job.bullets)}
  {/if}
</div>
