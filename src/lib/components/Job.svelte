<script lang="ts">
	import type { JobItem } from '$lib/types';

  let { job }: { job: JobItem } = $props();
</script>

<div class="mt-8 flex w-full flex-col gap-4 rounded-sm border border-aipink p-6">
  <div>
    <a href={job.url} class="font-mono text-aipink font-bold text-xl underline" target="_blank">{job.title}</a>
    <p class="font-mono text-aipink">{job.start} - {job.end}</p>
    <p class="font-mono text-aipink text-sm">{job.location}</p>
  </div>
  <p class="font-mono text-aipink text-sm">{job.description}</p>
  {#if job.description2}
    <p class="font-mono text-aipink text-sm">{job.description2}</p>
  {/if}
  {#if job.description3}
    <p class="font-mono text-aipink text-sm">{job.description3}</p>
  {/if}
  {#if job.description4}
    <p class="font-mono text-aipink text-sm">{job.description4}</p>
  {/if}
  {#if job.item}
    <ul class="list-['♱']">
      <li class="font-mono text-aipink ml-4 pl-2 text-sm">{job.item}</li>
      <li class="font-mono text-aipink ml-4 pl-2 text-sm">{job.item2}</li>
      <li class="font-mono text-aipink ml-4 pl-2 text-sm">{job.item3}</li>
      <li class="font-mono text-aipink ml-4 pl-2 text-sm">{job.item4}</li>
      <li class="font-mono text-aipink ml-4 pl-2 text-sm">{job.item5}</li>
    </ul>
  {/if}
</div>