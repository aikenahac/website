<script lang="ts">
  import Project from '$lib/components/Project.svelte';
  import { projectDefinitions } from '$lib/projects';
  import { t } from '$lib/translations';
  import type { ProjectItem, ProjectLabels } from '$lib/types';
  import { reveal } from '$lib/actions/reveal';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import SectionHeading from '$lib/components/SectionHeading.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const getTranslationArray = (key: string): string[] => {
    const value = $t(key);
    return Array.isArray(value) ? (value as string[]) : [];
  };

  const projects: ProjectItem[] = $derived(
    projectDefinitions.map((project) => ({
      slug: project.slug,
      title: $t(`projects.${project.translationKey}.title`),
      description: $t(`projects.${project.translationKey}.description`),
      category: $t(`projects.${project.translationKey}.category`),
      featured: project.featured ?? false,
      siteUrl: project.siteUrl,
      githubUrl: project.githubUrl,
      githubRepositories: project.githubRepositories ?? [],
      fallbackLanguages: project.fallbackLanguages ?? [],
      languages: data.languagesByProject[project.slug] ?? project.fallbackLanguages ?? [],
      image: project.image,
      imageAlt: project.featured ? $t(`projects.${project.translationKey}.image_alt`) : undefined,
      accent: project.accent ?? 'pink',
      highlights: project.featured
        ? getTranslationArray(`projects.${project.translationKey}.highlights`)
        : undefined,
    })),
  );

  const featuredProjects = $derived(projects.filter((project) => project.featured));
  const moreProjects = $derived(projects.filter((project) => !project.featured));
  const labels: ProjectLabels = $derived({
    featured: $t('projects.labels.featured'),
    languages: $t('projects.labels.languages'),
    visit: $t('projects.labels.visit'),
    source: $t('projects.labels.source'),
    live: $t('projects.labels.live'),
  });
</script>

<svelte:head>
  <title>{$t('projects.meta.title')}</title>
  <meta name="description" content={$t('projects.meta.description')} />
</svelte:head>

<PageHeader index="03" title={$t('projects.title')} kicker={$t('projects.featured.eyebrow')}>
  {#snippet aside()}
    <p class="intro-aside">{$t('projects.intro')}</p>
  {/snippet}
</PageHeader>

<div class="projects-page w-full max-w-[1440px]">
  <section class="projects-section" aria-labelledby="featured-projects-title">
    <div class="section-heading">
      <SectionHeading
        index="01"
        id="featured-projects-title"
        title={$t('projects.featured.title')}
      />
      <p use:reveal>{$t('projects.featured.description')}</p>
    </div>

    <div class="featured-grid">
      {#each featuredProjects as project, index (project.slug)}
        <Project {project} {labels} {index} />
      {/each}
    </div>
  </section>

  <section class="projects-section" aria-labelledby="more-projects-title">
    <div class="section-heading">
      <SectionHeading index="02" id="more-projects-title" title={$t('projects.more.title')} />
      <p use:reveal>{$t('projects.more.description')}</p>
    </div>

    <div class="projects-grid">
      {#each moreProjects as project, index (project.slug)}
        <Project {project} {labels} {index} />
      {/each}
    </div>
  </section>
</div>

<style>
  .projects-page {
    --page-muted: color-mix(in srgb, #d423c6 62%, white);
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 7rem;
    font-family: 'JetBrains Mono Variable', monospace;
  }

  .intro-aside {
    max-width: 26rem;
    color: color-mix(in srgb, #d423c6 62%, white);
    line-height: 1.75;
  }

  .section-heading > p {
    max-width: 46rem;
    margin-top: -1rem;
    color: var(--page-muted);
    line-height: 1.75;
  }

  .projects-section {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  .projects-section + .projects-section {
    margin-top: clamp(4rem, 8vw, 7rem);
  }

  .featured-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  @media (max-width: 1050px) {
    .projects-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 860px) {
    .projects-page {
      margin-top: 4rem;
    }
  }

  @media (max-width: 620px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
