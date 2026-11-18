<script lang="ts">
  import me from '$lib/assets/me.jpg';
  import { t } from '$lib/translations';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
  import type { Social } from '$lib/types';
  import { faLink } from '@fortawesome/free-solid-svg-icons';
  import moment from 'moment';
  import Hero from '$lib/components/Hero.svelte';
  import { reveal } from '$lib/actions/reveal';
  import { magnetic } from '$lib/actions/magnetic';
  import { tilt } from '$lib/actions/tilt';
  import SectionHeading from '$lib/components/SectionHeading.svelte';

  const socials: Social[] = [
    {
      icon: faGithub,
      link: 'https://github.com/aikenahac',
    },
    {
      icon: faInstagram,
      link: 'https://www.instagram.com/ahacaiken',
    },
    {
      icon: faTwitter,
      link: 'https://x.com/aikenahac',
    },
    {
      icon: faLinkedin,
      link: 'https://www.linkedin.com/in/aahac',
    },
    {
      icon: faLink,
      link: 'https://links.aiken.si/',
    },
  ];

  const age = moment().diff('2003-12-18', 'years', false).toString();
  const years = moment().diff('2018-12-10', 'years', false).toString();

  const placeholders: { key: string; content: string }[] = [
    {
      key: '$age$',
      content: age,
    },
    {
      key: '$yrs$',
      content: years,
    },
    {
      key: '$work$',
      content:
        "<a class='text-[#DF3B3B] font-mono underline' href='https://preskok.si/sl/' target='_blank' data-cursor='open'>Preskok</a>",
    },
    {
      key: '$avr$',
      content:
        "<a class='text-white font-mono underline' href='https://avarra.dev' target='_blank' data-cursor='open'>Avarra</a>",
    },
    {
      key: '$prs$',
      content:
        "<a class='text-[#6dc1c5] font-mono underline' href='https://prskalnik.eu' target='_blank' data-cursor='open'>Prskalnik</a>",
    },
  ];

  function getAboutMe() {
    let aboutMe: string = $t('home.about_me.intro');
    placeholders.forEach(({ key, content }) => {
      aboutMe = aboutMe.replace(key, content);
    });

    return aboutMe;
  }

  interface SpecRow {
    kind: string;
    value: string;
  }

  const gear: SpecRow[] = [
    { kind: 'laptop', value: 'MacBook Pro M4 Max 14"' },
    { kind: 'mouse', value: 'Logitech MX Master 3' },
    { kind: 'keyboard', value: 'Logitech MX Mechanical Mini' },
    { kind: 'monitor', value: 'Xiaomi G34WQi 34"' },
  ];
  const tech: SpecRow[] = [
    { kind: 'web', value: 'SvelteKit / NextJS' },
    { kind: 'mobile', value: 'Flutter / React Native' },
    { kind: 'backend', value: 'NestJS / PayloadCMS' },
    { kind: 'auth', value: 'Clerk' },
    { kind: 'orm', value: 'Drizzle ORM' },
    { kind: 'database', value: 'PostgreSQL' },
    { kind: 'languages', value: 'Dart, TypeScript, PHP, Python' },
  ];

  const hostname = (url: string): string => {
    try {
      return new URL(url).hostname.replace(/^www\./, '').replace(/\.$/, '');
    } catch {
      return url;
    }
  };

  const friends: { name: string; url: string }[] = [
    { name: 'Adrian Sebastian Šiška', url: 'https://ass.si/' },
    { name: 'Anton Luka Šijanec', url: 'https://splet.4a.si./index.shtml?r=aiken.si' },
    { name: 'Gašper Dobrovoljc', url: 'https://gapi.me/' },
    { name: 'Jurij Fortuna', url: 'https://fortuna.wf/' },
    { name: 'Lovro Govekar', url: 'https://govekar.net/' },
    { name: 'Matic Babnik', url: 'https://babnik.io/' },
    { name: 'Sven Ahac', url: 'https://svenahac.com/' },
    { name: 'Tim Hrovat', url: 'https://timhrovat.com/' },
    { name: 'Tim Rekelj', url: 'https://timrekelj.si/' },
    { name: 'Žiga Kralj', url: 'https://ziga.kralj.io/' },
  ];
</script>

<Hero />

{#snippet specList(rows: SpecRow[], ns: string)}
  <ul class="flex flex-col">
    {#each rows as row, i}
      <li
        use:reveal={{ delay: i * 50, y: 12 }}
        class="flex items-baseline border-b border-aipink/15 py-3 font-mono text-aipink"
      >
        <span class="shrink-0 text-xs uppercase tracking-[0.2em] opacity-60"
          >♱ {$t(`home.${ns}.${row.kind}`)}</span
        >
        <span class="leader"></span>
        <span class="text-right font-bold">{row.value}</span>
      </li>
    {/each}
  </ul>
{/snippet}

<!-- About -->
<section class="mt-12 w-full">
  <SectionHeading index="01" title={$t('home.about_me.title')} />

  <div
    class="grid w-full grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-start gap-14 max-[860px]:grid-cols-1 max-[860px]:gap-10"
  >
    <div use:reveal class="photo-wrap ticks p-4">
      <img class="w-full rounded-sm" src={me} alt={$t('home.me_img_alt')} use:tilt={{ max: 6 }} />
    </div>

    <div class="flex flex-col">
      <p use:reveal={{ delay: 80 }} class="bio font-mono text-lg leading-relaxed text-aipink">
        {@html getAboutMe()}
      </p>

      <dl
        use:reveal={{ delay: 160 }}
        class="mt-10 grid grid-cols-3 border-y border-aipink/30 max-[560px]:grid-cols-2"
      >
        <div class="stat">
          <dt class="order-2 text-xs uppercase tracking-[0.2em] opacity-60">
            {$t('home.stats.age')}
          </dt>
          <dd class="display text-5xl sm:text-6xl">{age}</dd>
        </div>
        <div class="stat border-l border-aipink/30 min-[561px]:border-r">
          <dt class="order-2 text-xs uppercase tracking-[0.2em] opacity-60">
            {$t('home.stats.years')}
          </dt>
          <dd class="display text-5xl sm:text-6xl">{years}+</dd>
        </div>
        <div class="stat border-aipink/30 max-[560px]:col-span-2 max-[560px]:border-t">
          <dt class="order-2 text-xs uppercase tracking-[0.2em] opacity-60">
            {$t('home.stats.based')}
          </dt>
          <dd class="display text-3xl">{$t('home.stats.city')}</dd>
        </div>
      </dl>

      <div use:reveal={{ delay: 220 }} class="mt-10 flex flex-row flex-wrap gap-3 text-xl">
        {#each socials as social}
          <a
            class="social flex h-12 w-12 items-center justify-center rounded-full border border-aipink/50 text-aipink"
            href={social.link}
            target="_blank"
            data-cursor="open"
            aria-label={hostname(social.link)}
            use:magnetic
          >
            <FontAwesomeIcon icon={social.icon} />
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- Gear + stack -->
<div class="mt-28 grid w-full grid-cols-2 gap-16 max-[860px]:mt-20 max-[860px]:grid-cols-1">
  <section>
    <SectionHeading index="02" title={$t('home.gear')} />
    {@render specList(gear, 'gear_kinds')}
  </section>
  <section>
    <SectionHeading index="03" title={$t('home.tech')} />
    {@render specList(tech, 'tech_kinds')}
  </section>
</div>

<!-- Friends -->
<section class="mt-28 w-full max-[860px]:mt-20">
  <SectionHeading index="04" title={$t('home.net_friends')} />
  <ul class="grid grid-cols-1 gap-x-16 sm:grid-cols-2">
    {#each friends as { name, url }, i}
      <li use:reveal={{ delay: (i % 2) * 60, y: 12 }} class="border-b border-aipink/20">
        <a
          class="row-link flex items-baseline gap-4 py-4 font-mono text-aipink"
          href={url}
          target="_blank"
          data-cursor="open"
        >
          <span class="text-xs opacity-50">{String(i + 1).padStart(2, '0')}</span>
          <span class="text-lg font-bold">{name}</span>
          <span class="ml-auto truncate text-xs opacity-60 max-[420px]:hidden">{hostname(url)}</span
          >
          <span class="arrow">↗</span>
        </a>
      </li>
    {/each}
  </ul>
</section>

<style>
  .photo-wrap {
    perspective: 900px;
  }

  .bio :global(a) {
    text-underline-offset: 4px;
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.25rem 1rem;
    font-family: 'JetBrains Mono Variable', ui-monospace, monospace;
    color: #d423c6;
  }

  .social {
    transition:
      background-color 0.3s ease,
      color 0.3s ease,
      border-color 0.3s ease,
      box-shadow 0.3s ease;
  }

  .social:hover {
    background-color: #d423c6;
    border-color: #d423c6;
    color: #171512;
    box-shadow: 0 0 24px rgba(212, 35, 198, 0.6);
  }

  .arrow {
    display: inline-block;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .row-link:hover .arrow {
    transform: translate(3px, -3px) rotate(0deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .arrow {
      transition: none;
    }
  }
</style>
