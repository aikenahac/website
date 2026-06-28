<script lang="ts">
  import type { ProjectItem } from '$lib/types';
  import { reveal } from '$lib/actions/reveal';

  let { project }: { project: ProjectItem } = $props();
</script>

<div use:reveal class="card mt-8 flex w-full flex-col gap-4 rounded-sm border border-aipink p-6">
  <a
    href={project.url}
    class="font-mono text-xl font-bold text-aipink underline"
    target="_blank"
    data-cursor="open">{project.title}</a
  >
  <p class="font-mono text-aipink">
    {@html project.description
      .replace('kulte', "<span class='line-through'>kulte</span>")
      .replace('cults', "<span class='line-through'>cults</span>")}
  </p>
</div>
