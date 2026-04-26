import type { JobReference } from '$lib/types';

export type WorkJobId =
  | 'aerio'
  | 'prskalnik'
  | 'preskok'
  | 'easistent'
  | 'fri'
  | 'vegova'
  | 'identisoft'
  | 'fundl'
  | 'flare';

export interface WorkJobMeta {
  id: WorkJobId;
  start: string;
  end?: string;
  current?: boolean;
  url: string;
  references?: JobReference[];
}

export const workJobs: WorkJobMeta[] = [
  {
    id: 'aerio',
    start: 'Feb 2021',
    current: true,
    url: 'https://aerio.tech',
  },
  {
    id: 'prskalnik',
    start: 'Oct 2024',
    current: true,
    url: 'https://prskalnik.eu',
  },
  {
    id: 'preskok',
    start: 'Jun 2025',
    current: true,
    url: 'https://preskok.si',
  },
  {
    id: 'easistent',
    start: 'Mar 2022',
    end: 'Jun 2025',
    url: 'https://www.easistent.com',
  },
  {
    id: 'fri',
    start: 'Nov 2023',
    end: 'Apr 2024',
    url: 'https://fri.uni-lj.si',
  },
  {
    id: 'vegova',
    start: 'Aug 2023',
    end: 'Jan 2024',
    url: 'https://www.vegova.si',
  },
  {
    id: 'identisoft',
    start: 'Jun 2022',
    end: 'Jun 2022',
    url: 'https://www.identisoft.eu/',
  },
  {
    id: 'fundl',
    start: 'May 2021',
    end: 'Nov 2021',
    url: 'https://github.com/aeriotech/onedl',
  },
  {
    id: 'flare',
    start: 'Jun 2019',
    end: 'Aug 2021',
    url: 'https://www.linkedin.com/company/yourflare',
    references: [
      {
        label: '[1]',
        url: 'https://www.dnevnik.si/novice/posel/mladi-podjetnik-s-pametno-kresnicko-flare-ki-belezi-lokacijo-otroka-2206031/',
      },
      {
        label: '[2]',
        url: 'https://mestoakrobatov.si/zgodbe-akrobatov/andrei-morozov-flare/',
      },
      {
        label: '[3]',
        url: 'https://www.bibaleze.si/novice/pametna-kresnicka-za-vecjo-varnost-otrok.html',
      },
    ],
  },
];
