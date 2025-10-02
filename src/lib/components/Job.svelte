<script lang="ts">
  import type { JobItem } from '$lib/types';

  let { job }: { job: JobItem } = $props();
</script>

<div class="mt-8 flex w-full flex-col gap-4 rounded-sm border border-aipink p-6">
  <div>
    <a href={job.url} class="font-mono text-xl font-bold text-aipink underline" target="_blank"
      >{job.title}</a
    >
    <p class="font-mono text-aipink">{job.start} - {job.end}</p>
    <p class="font-mono text-sm text-aipink">{job.location}</p>
  </div>
  <p class="font-mono text-sm text-aipink">{job.description}</p>
  {#if job.description2}
    <p class="font-mono text-sm text-aipink">{job.description2}</p>
  {/if}
  {#if job.description3}
    <p class="font-mono text-sm text-aipink">{job.description3}</p>
  {/if}
  {#if job.description4}
    <p class="font-mono text-sm text-aipink">{job.description4}</p>
  {/if}
  {#if job.description5}
    <p class="font-mono text-sm text-aipink">{job.description5}</p>
  {/if}
  {#if job.item}
    <ul class="list-['♱']">
      <li class="ml-4 pl-2 font-mono text-sm text-aipink">{job.item}</li>
      <li class="ml-4 pl-2 font-mono text-sm text-aipink">{job.item2}</li>
      <li class="ml-4 pl-2 font-mono text-sm text-aipink">{job.item3}</li>
      <li class="ml-4 pl-2 font-mono text-sm text-aipink">{job.item4}</li>
      <li class="ml-4 pl-2 font-mono text-sm text-aipink">{job.item5}</li>
    </ul>
  {/if}
</div>
