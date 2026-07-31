<script lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faGithub } from '@fortawesome/free-brands-svg-icons';
  import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
  import { reveal } from '$lib/actions/reveal';
  import { tilt } from '$lib/actions/tilt';
  import type { ProjectItem, ProjectLabels } from '$lib/types';

  let {
    project,
    labels,
    index = 0,
  }: { project: ProjectItem; labels: ProjectLabels; index?: number } = $props();

  const accentColors = {
    pink: '#d423c6',
    mapcn: '#38bdf8',
    gigatable: '#74f0b4',
  } as const;

  const accent = $derived(accentColors[project.accent]);
</script>

{#if project.featured}
  <article
    use:reveal={{ delay: index * 90 }}
    class="featured-project"
    style={`--project-accent: ${accent}`}
  >
    <div class="featured-artwork-wrap">
      <img
        use:tilt={{ max: 3, lift: 8 }}
        class="featured-artwork"
        src={project.image}
        alt={project.imageAlt}
        width="1200"
        height="630"
        decoding="async"
      />
    </div>

    <div class="featured-content">
      <div class="project-kicker">
        <span class="project-index">0{index + 1}</span>
        <span>{project.category}</span>
        <span class="featured-badge">{labels.featured}</span>
      </div>

      <div>
        <h3>{project.title}</h3>
        <p class="project-description">{project.description}</p>
      </div>

      {#if project.highlights?.length}
        <ul class="feature-list">
          {#each project.highlights as highlight}
            <li><span aria-hidden="true">✦</span>{highlight}</li>
          {/each}
        </ul>
      {/if}

      {#if project.languages.length}
        <div class="language-list" aria-label={labels.languages}>
          {#each project.languages as language}
            <span class="language-chip">
              <i aria-hidden="true"></i>
              {language.name}
              <small>{language.percentage}%</small>
            </span>
          {/each}
        </div>
      {/if}

      <div class="project-actions">
        {#if project.siteUrl}
          <a
            class="primary-action"
            href={project.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="open"
          >
            {labels.visit}
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
        {/if}
        {#if project.githubUrl}
          <a
            class="secondary-action"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="open"
          >
            <FontAwesomeIcon icon={faGithub} />
            {labels.source}
          </a>
        {/if}
      </div>
    </div>
  </article>
{:else}
  <article
    use:reveal={{ delay: (index % 3) * 70 }}
    class="project-card"
    style={`--project-accent: ${accent}`}
  >
    <div class="project-kicker">
      <span class="project-index">{String(index + 1).padStart(2, '0')}</span>
      <span>{project.category}</span>
    </div>

    <div class="compact-copy">
      <h3>{project.title}</h3>
      <p class="project-description">{project.description}</p>
    </div>

    {#if project.languages.length}
      <div class="language-list compact-languages" aria-label={labels.languages}>
        {#each project.languages as language}
          <span class="language-chip">
            <i aria-hidden="true"></i>
            {language.name}
            <small>{language.percentage}%</small>
          </span>
        {/each}
      </div>
    {/if}

    <div class="compact-actions" aria-label={`${project.title} links`}>
      {#if project.siteUrl}
        <a
          href={project.siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="open"
          aria-label={`${labels.visit}: ${project.title}`}
        >
          {labels.live}
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </a>
      {/if}
      {#if project.githubUrl}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="open"
          aria-label={`${labels.source}: ${project.title}`}
        >
          <FontAwesomeIcon icon={faGithub} />
          {labels.source}
        </a>
      {/if}
    </div>
  </article>
{/if}

<style>
  .featured-project,
  .project-card {
    position: relative;
    overflow: hidden;
    border: 1px solid color-mix(in srgb, var(--project-accent) 58%, transparent);
    border-radius: 0.125rem;
    background: linear-gradient(
        135deg,
        color-mix(in srgb, var(--project-accent) 8%, transparent),
        transparent 45%
      ),
      #171512;
    font-family: 'JetBrains Mono Variable', monospace;
    color: #d423c6;
    transition:
      transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
      border-color 0.35s ease,
      box-shadow 0.35s ease;
  }

  .featured-project::before,
  .project-card::before {
    position: absolute;
    inset: 0;
    content: '';
    pointer-events: none;
    background-image: linear-gradient(
        color-mix(in srgb, var(--project-accent) 5%, transparent) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        color-mix(in srgb, var(--project-accent) 5%, transparent) 1px,
        transparent 1px
      );
    background-size: 36px 36px;
    mask-image: linear-gradient(to bottom right, black, transparent 58%);
  }

  .featured-project {
    display: grid;
    grid-template-rows: auto 1fr;
    min-width: 0;
  }

  .featured-project:hover,
  .project-card:hover {
    transform: translateY(-5px);
    border-color: var(--project-accent);
    box-shadow: 0 24px 70px -38px color-mix(in srgb, var(--project-accent) 70%, transparent);
  }

  .featured-artwork-wrap {
    position: relative;
    z-index: 1;
    overflow: hidden;
    border-bottom: 1px solid color-mix(in srgb, var(--project-accent) 42%, transparent);
    background: #080b13;
    perspective: 1000px;
  }

  .featured-artwork {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1200 / 630;
    object-fit: cover;
    transition:
      transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
      filter 0.45s ease;
  }

  .featured-project:hover .featured-artwork {
    filter: saturate(1.08) contrast(1.03);
  }

  .featured-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    padding: clamp(1.25rem, 3vw, 2rem);
  }

  .project-kicker {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    color: var(--project-accent);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .project-index {
    opacity: 0.55;
  }

  .featured-badge {
    margin-left: auto;
    border: 1px solid color-mix(in srgb, var(--project-accent) 55%, transparent);
    border-radius: 999px;
    padding: 0.32rem 0.6rem;
    background: color-mix(in srgb, var(--project-accent) 10%, transparent);
  }

  h3 {
    color: var(--project-accent);
    font-size: clamp(1.45rem, 3vw, 2.25rem);
    font-weight: 750;
    line-height: 1.05;
  }

  .project-description {
    margin-top: 0.8rem;
    color: color-mix(in srgb, var(--project-accent) 72%, white);
    font-size: 0.92rem;
    line-height: 1.7;
  }

  .feature-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem 1.1rem;
    color: color-mix(in srgb, var(--project-accent) 72%, white);
    font-size: 0.78rem;
  }

  .feature-list li {
    display: flex;
    gap: 0.55rem;
    align-items: flex-start;
  }

  .feature-list span {
    color: var(--project-accent);
  }

  .language-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .language-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    border: 1px solid color-mix(in srgb, var(--project-accent) 30%, transparent);
    border-radius: 999px;
    padding: 0.38rem 0.58rem;
    background: color-mix(in srgb, var(--project-accent) 6%, transparent);
    color: color-mix(in srgb, var(--project-accent) 68%, white);
    font-size: 0.68rem;
  }

  .language-chip i {
    width: 0.38rem;
    height: 0.38rem;
    border-radius: 50%;
    background: var(--project-accent);
    box-shadow: 0 0 8px color-mix(in srgb, var(--project-accent) 75%, transparent);
  }

  .language-chip small {
    opacity: 0.55;
  }

  .project-actions,
  .compact-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    margin-top: auto;
  }

  .project-actions a,
  .compact-actions a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    border: 1px solid var(--project-accent);
    padding: 0.72rem 0.95rem;
    color: var(--project-accent);
    font-size: 0.76rem;
    font-weight: 650;
    transition:
      color 180ms ease,
      background 180ms ease,
      transform 180ms ease;
  }

  .project-actions a:hover,
  .compact-actions a:hover {
    transform: translateY(-2px);
  }

  .project-actions a:focus-visible,
  .compact-actions a:focus-visible {
    outline: 2px solid white;
    outline-offset: 3px;
  }

  .project-actions .primary-action {
    background: var(--project-accent);
    color: #090b10;
  }

  .project-actions .primary-action:hover {
    background: white;
    border-color: white;
  }

  .project-actions .secondary-action:hover,
  .compact-actions a:hover {
    background: color-mix(in srgb, var(--project-accent) 13%, transparent);
    color: white;
  }

  .project-card {
    z-index: 1;
    display: flex;
    min-height: 22rem;
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.5rem;
  }

  .project-card h3 {
    font-size: 1.3rem;
  }

  .compact-copy {
    position: relative;
    z-index: 1;
  }

  .compact-languages,
  .compact-actions,
  .project-card .project-kicker {
    position: relative;
    z-index: 1;
  }

  .compact-actions a {
    flex: 1;
    min-width: max-content;
    padding: 0.65rem 0.75rem;
  }

  @media (max-width: 520px) {
    .feature-list {
      grid-template-columns: 1fr;
    }

    .project-actions a {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .featured-project,
    .project-card,
    .featured-artwork,
    .project-actions a,
    .compact-actions a {
      transition: none;
    }

    .featured-project:hover,
    .project-card:hover,
    .project-actions a:hover,
    .compact-actions a:hover {
      transform: none;
    }
  }
</style>
