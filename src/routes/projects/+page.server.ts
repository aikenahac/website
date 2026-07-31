import { projectDefinitions } from '$lib/projects';
import type { ProjectLanguage } from '$lib/types';
import type { PageServerLoad } from './$types';

type GitHubLanguages = Record<string, number>;

const GITHUB_HEADERS = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

async function fetchRepositoryLanguages(
  fetch: Parameters<PageServerLoad>[0]['fetch'],
  repository: string,
): Promise<GitHubLanguages> {
  const response = await fetch(`https://api.github.com/repos/${repository}/languages`, {
    headers: GITHUB_HEADERS,
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error(`GitHub returned ${response.status} for ${repository}`);
  }

  return (await response.json()) as GitHubLanguages;
}

function normalizeLanguages(languages: GitHubLanguages): ProjectLanguage[] {
  const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

  if (total === 0) return [];

  return Object.entries(languages)
    .sort(([, left], [, right]) => right - left)
    .slice(0, 3)
    .map(([name, bytes]) => ({
      name,
      percentage: Math.max(1, Math.round((bytes / total) * 100)),
    }));
}

async function getProjectLanguages(
  fetch: Parameters<PageServerLoad>[0]['fetch'],
  repositories: string[],
  fallback: ProjectLanguage[],
): Promise<ProjectLanguage[]> {
  if (repositories.length === 0) return fallback;

  const responses = await Promise.allSettled(
    repositories.map((repository) => fetchRepositoryLanguages(fetch, repository)),
  );
  const aggregate: GitHubLanguages = {};

  for (const response of responses) {
    if (response.status !== 'fulfilled') continue;

    for (const [name, bytes] of Object.entries(response.value)) {
      aggregate[name] = (aggregate[name] ?? 0) + bytes;
    }
  }

  const languages = normalizeLanguages(aggregate);
  return languages.length > 0 ? languages : fallback;
}

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders({
    'cache-control': 'public, max-age=300, s-maxage=86400, stale-while-revalidate=604800',
  });

  const entries = await Promise.all(
    projectDefinitions.map(async (project) => {
      const languages = await getProjectLanguages(
        fetch,
        project.githubRepositories ?? [],
        project.fallbackLanguages ?? [],
      );

      return [project.slug, languages] as const;
    }),
  );

  return {
    languagesByProject: Object.fromEntries(entries),
  };
};
