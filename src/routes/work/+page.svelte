<script lang="ts">
  import Job from '$lib/components/Job.svelte';
  import { t } from '$lib/translations';
  import type { JobBulletItem, JobItem } from '$lib/types';
  import { workJobs } from '$lib/work';
  import PageHeader from '$lib/components/PageHeader.svelte';

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

<PageHeader index="02" title={$t('work.title')}>
  {#snippet aside()}
    <a
      class="cv-link inline-flex items-center gap-2 border border-aipink px-5 py-3 text-sm font-bold"
      href="/cv.pdf"
      target="_blank"
      data-cursor="open">[ CV ] ↓</a
    >
  {/snippet}
</PageHeader>

<div class="mt-16 flex w-full flex-col">
  {#each positions as job}
    <Job {job} />
  {/each}
</div>

<style>
  .cv-link {
    transition:
      background-color 0.2s ease,
      color 0.2s ease;
  }

  .cv-link:hover {
    background-color: #d423c6;
    color: #171512;
  }
</style>
