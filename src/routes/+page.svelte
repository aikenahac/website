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

  const placeholders: { key: string; content: string }[] = [
    {
      key: '$age$',
      content: moment().diff('2003-12-18', 'years', false).toString(),
    },
    {
      key: '$yrs$',
      content: moment().diff('2018-12-10', 'years', false).toString(),
    },
    {
      key: '$work$',
      content:
        "<a class='text-[#DF3B3B] font-mono underline' href='https://preskok.si/sl/' target='_blank' data-cursor='open'>Preskok</a>",
    },
    {
      key: '$aer$',
      content:
        "<a class='text-aipink font-mono underline' href='https://aerio.tech' target='_blank' data-cursor='open'>Aerio</a>",
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

  const gear = [
    'MacBook Pro M1 Max 16"',
    'Logitech MX Master 3',
    'Logitech MX Mechanical Mini',
    'Xiaomi G34WQi 34"',
  ];
  const tech = [
    'SvelteKit / NextJS',
    'Flutter / React Native',
    'NestJS / PayloadCMS',
    'Clerk',
    'Drizzle ORM',
    'PostgreSQL',
    'Dart, TypeScript, PHP, Python',
  ];

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

<div class="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
  <!-- About -->
  <div
    use:reveal
    class="card flex flex-col gap-6 rounded-sm border border-aipink p-8 md:col-span-2"
  >
    <div class="flex flex-row gap-6 max-[860px]:flex-col">
      <img
        class="w-1/3 self-start rounded-sm max-[860px]:w-full"
        src={me}
        alt={$t('home.me_img_alt')}
      />
      <div class="flex flex-1 flex-col">
        <h2 class="font-mono text-2xl font-bold text-aipink">{$t('home.about_me.title')}</h2>
        <p class="mt-4 font-mono text-aipink">{@html getAboutMe()}</p>
        <div class="mt-6 flex flex-row gap-4 text-2xl">
          {#each socials as social}
            <a href={social.link} target="_blank" data-cursor="open" use:magnetic>
              <FontAwesomeIcon
                class="text-aipink transition-colors hover:text-white"
                icon={social.icon}
              />
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Gear -->
  <div
    use:reveal={{ delay: 80 }}
    class="card flex flex-col gap-4 rounded-sm border border-aipink p-6"
  >
    <h2 class="font-mono text-2xl font-bold text-aipink">{$t('home.gear')}</h2>
    <ul class="list-['♱']">
      {#each gear as item}
        <li class="ml-6 pl-2 font-mono text-aipink">{item}</li>
      {/each}
    </ul>
  </div>

  <!-- Tech -->
  <div
    use:reveal={{ delay: 80 }}
    class="card flex flex-col gap-4 rounded-sm border border-aipink p-6"
  >
    <h2 class="font-mono text-2xl font-bold text-aipink">{$t('home.tech')}</h2>
    <ul class="list-['♱']">
      {#each tech as item}
        <li class="ml-6 pl-2 font-mono text-aipink">{item}</li>
      {/each}
    </ul>
  </div>

  <!-- Friends -->
  <div
    use:reveal={{ delay: 160 }}
    class="card flex flex-col gap-4 rounded-sm border border-aipink p-6 md:col-span-2"
  >
    <h2 class="font-mono text-2xl font-bold text-aipink">{$t('home.net_friends')}</h2>
    <ul class="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
      {#each friends as { name, url }}
        <li class="font-mono text-aipink underline">
          <a href={url} target="_blank" data-cursor="open">♱ {name}</a>
        </li>
      {/each}
    </ul>
  </div>
</div>
