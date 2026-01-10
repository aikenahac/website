<script lang="ts">
  import Project from '$lib/components/Project.svelte';
  import { t } from '$lib/translations';
  import type { ProjectItem } from '$lib/types';

  const projects: ProjectItem[] = [
    {
      title: $t('projects.mapcn-rn.title'),
      url: 'https://mapcn-rn.aiken.si',
      description: $t('projects.mapcn-rn.description'),
    },
    {
      title: $t('projects.echo.title'),
      url: 'https://echobook.club/en',
      description: $t('projects.echo.description'),
    },
    {
      title: $t('projects.mwh.title'),
      url: 'https://gomwh.com',
      description: $t('projects.mwh.description'),
    },
    {
      title: $t('projects.frivsspr.title'),
      url: 'https://fri.bogi.si',
      description: $t('projects.frivsspr.description'),
    },
    {
      title: $t('projects.socialko.title'),
      url: 'https://github.com/aikenahac/socialko',
      description: $t('projects.socialko.description'),
    },
    {
      title: $t('projects.hdwyg.title'),
      url: 'https://hdwyg.bogi.si',
      description: $t('projects.hdwyg.description'),
    },
    {
      title: $t('projects.routes.title'),
      url: 'https://github.com/aikenahac/google_maps_routes',
      description: $t('projects.routes.description'),
    },
    {
      title: $t('projects.app_tutorial.title'),
      url: 'https://github.com/aikenahac/app_tutorial',
      description: $t('projects.app_tutorial.description'),
    },
    {
      title: $t('projects.imageproc.title'),
      url: 'https://github.com/aikenahac/imageproc',
      description: $t('projects.imageproc.description'),
    },
  ];
</script>

<div class="mt-8 flex w-full flex-col gap-4 rounded-sm border border-aipink p-6">
  <h1 class="font-mono text-4xl font-bold text-aipink">{$t('projects.title')}</h1>
</div>

{#each projects as project}
  <Project {project} />
{/each}
