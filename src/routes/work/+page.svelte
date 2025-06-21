<script lang="ts">
  import Job from '$lib/components/Job.svelte';
  import { t } from '$lib/translations';
  import type { JobItem } from '$lib/types';

  const positions: JobItem[] = [
    {
      title: $t('work.aerio.title'),
      location: $t('work.aerio.location'),
      start: 'Feb 2021',
      end: $t('work.current'),
      url: 'https://aerio.tech',
      description: $t('work.aerio.description'),
      description2: $t('work.aerio.description2'),
      description3: $t('work.aerio.description3'),
    },
    {
      title: $t('work.preskok.title'),
      location: $t('work.preskok.location'),
      start: 'Jun 2025',
      end: $t('work.current'),
      url: 'https://preskok.si',
      description: $t('work.preskok.description'),
    },
    {
      title: $t('work.easistent.title'),
      location: $t('work.easistent.location'),
      start: 'Mar 2022',
      end: 'Jun 2025',
      url: 'https://www.easistent.com',
      description: $t('work.easistent.description'),
      description2: $t('work.easistent.description2'),
      description3: $t('work.easistent.description3'),
      description4: $t('work.easistent.description4'),
    },
    {
      title: $t('work.fri.title'),
      location: $t('work.fri.location'),
      start: 'Nov 2023',
      end: 'Apr 2024',
      url: 'https://fri.uni-lj.si',
      description: $t('work.fri.description'),
    },
    {
      title: $t('work.vegova.title'),
      location: $t('work.vegova.location'),
      start: 'Aug 2023',
      end: 'Jan 2024',
      url: 'https://www.vegova.si',
      description: $t('work.vegova.description'),
      item: $t('work.vegova.item'),
      item2: $t('work.vegova.item2'),
      item3: $t('work.vegova.item3'),
      item4: $t('work.vegova.item4'),
      item5: $t('work.vegova.item5'),
    },
    {
      title: $t('work.identisoft.title'),
      location: $t('work.identisoft.location'),
      start: 'Jun 2022',
      end: 'Jun 2022',
      url: 'https://www.identisoft.eu/',
      description: $t('work.identisoft.description'),
      description2: $t('work.identisoft.description2'),
      description3: $t('work.identisoft.description3'),
      description4: $t('work.identisoft.description4'),
    },
    {
      title: $t('work.fundl.title'),
      location: $t('work.fundl.location'),
      start: 'May 2021',
      end: 'Nov 2021',
      url: 'https://github.com/aeriotech/onedl',
      description: $t('work.fundl.description'),
      description2: $t('work.fundl.description2'),
    },
    {
      title: $t('work.flare.title'),
      location: $t('work.flare.location'),
      start: 'Jun 2019',
      end: 'Aug 2021',
      url: 'https://www.linkedin.com/company/yourflare',
      description: $t('work.flare.description'),
      description2: $t('work.flare.description2'),
    },
  ];
</script>

<div class="mt-8 flex w-full flex-col gap-4 rounded-sm border border-aipink p-6">
  <h1 class="font-mono text-4xl font-bold text-aipink">
    {$t('work.title')}
    <!-- [ <a class="underline" href="/cv.pdf" target="_blank">CV</a> ] -->
  </h1>
</div>

{#each positions as job}
  <Job {job} />
{/each}
