<script lang="ts">
  import Project from '$lib/components/Project.svelte';
  import { projectDefinitions } from '$lib/projects';
  import { t } from '$lib/translations';
  import type { ProjectItem, ProjectLabels } from '$lib/types';
  import { reveal } from '$lib/actions/reveal';
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

<div class="projects-page w-full max-w-[1440px]">
  <header use:reveal class="projects-intro">
    <div>
      <h1>{$t('projects.title')}</h1>
    </div>
    <div class="intro-copy">
      <p>{$t('projects.intro')}</p>
    </div>
  </header>

  <section class="projects-section" aria-labelledby="featured-projects-title">
    <div use:reveal class="section-heading">
      <div>
        <p class="section-eyebrow">{$t('projects.featured.eyebrow')}</p>
        <h2 id="featured-projects-title">{$t('projects.featured.title')}</h2>
      </div>
      <p>{$t('projects.featured.description')}</p>
    </div>

    <div class="featured-grid">
      {#each featuredProjects as project, index (project.slug)}
        <Project {project} {labels} {index} />
      {/each}
    </div>
  </section>

  <section class="projects-section" aria-labelledby="more-projects-title">
    <div use:reveal class="section-heading">
      <div>
        <p class="section-eyebrow">{$t('projects.more.eyebrow')}</p>
        <h2 id="more-projects-title">{$t('projects.more.title')}</h2>
      </div>
      <p>{$t('projects.more.description')}</p>
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
    margin-top: 2rem;
    font-family: 'JetBrains Mono Variable', monospace;
  }

  .projects-intro {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(20rem, 0.8fr);
    gap: clamp(2rem, 6vw, 7rem);
    align-items: end;
    margin-bottom: clamp(2rem, 3vw, 3rem);
    border: 1px solid #d423c6;
    border-radius: 0.125rem;
    padding: clamp(1.5rem, 5vw, 4rem);
    background: radial-gradient(circle at 8% 12%, rgba(212, 35, 198, 0.19), transparent 34%),
      linear-gradient(135deg, rgba(212, 35, 198, 0.05), transparent 50%);
  }

  .projects-intro h1 {
    max-width: 10ch;
    color: #d423c6;
    font-size: clamp(3rem, 8vw, 7.5rem);
    font-weight: 800;
    letter-spacing: -0.075em;
    line-height: 0.88;
    text-shadow: 0 0 55px rgba(212, 35, 198, 0.23);
  }

  .section-eyebrow {
    margin-bottom: 1rem;
    color: #d423c6;
    font-size: 0.7rem;
    font-weight: 650;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .intro-copy > p,
  .section-heading > p {
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

  .section-heading {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.55fr);
    gap: 2rem;
    align-items: end;
  }

  .section-heading h2 {
    color: #d423c6;
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 750;
    letter-spacing: -0.055em;
    line-height: 1;
  }

  .featured-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
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
    .projects-intro,
    .section-heading {
      grid-template-columns: 1fr;
    }

    .featured-grid {
      grid-template-columns: 1fr;
    }

    .section-heading > p {
      max-width: 46rem;
    }
  }

  @media (max-width: 620px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }

    .projects-intro {
      padding: 1.25rem;
    }
  }
</style>
