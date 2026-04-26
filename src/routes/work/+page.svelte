<script lang="ts">
  import Job from '$lib/components/Job.svelte';
  import { t } from '$lib/translations';
  import type { JobBulletItem, JobItem } from '$lib/types';
  import { workJobs } from '$lib/work';

  const getTranslationArray = <T,>(key: string): T[] => {
    const value = $t(key);

    return Array.isArray(value) ? (value as T[]) : [];
  };

  const positions: JobItem[] = $derived(
    workJobs.map((job) => ({
      title: $t(`work.jobs.${job.id}.title`),
      location: $t(`work.jobs.${job.id}.location`),
      start: job.start,
      end: job.current ? $t('work.current') : (job.end ?? ''),
      url: job.url,
      paragraphs: getTranslationArray<string>(`work.jobs.${job.id}.paragraphs`),
      bullets: getTranslationArray<JobBulletItem>(`work.jobs.${job.id}.bullets`),
      references: job.references,
    })),
  );
</script>

<div class="mt-8 flex w-full flex-col gap-4 rounded-sm border border-aipink p-6">
  <h1 class="font-mono text-4xl font-bold text-aipink">
    {$t('work.title')}
    [ <a class="underline" href="/cv.pdf" target="_blank">CV</a> ]
  </h1>
</div>

{#each positions as job}
  <Job {job} />
{/each}
