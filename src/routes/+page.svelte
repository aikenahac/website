<script lang="ts">
	import me from '$lib/assets/me.jpeg';
	import { t } from '$lib/translations';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
	import type { Social } from '$lib/types';
	import { faLink } from '@fortawesome/free-solid-svg-icons';
	import type { PageData } from './$types';
	import moment from 'moment';
	import l from '$lib/assets/l.gif';

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
			link: 'https://me.aikenahac.com/',
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
				"<a class='text-aipink font-mono underline' href='https://www.easistent.com' target='_blank'>eAsistent</a>",
		},
		{
			key: '$aer$',
			content:
				"<a class='text-aipink font-mono underline' href='https://aerio.tech' target='_blank'>Aerio</a>",
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
		'MacBook Pro M1 Pro 14"',
		'Logitech MX Master 3',
		'Logitech MX Mechanical Mini',
		'LG Ultrawide 27"',
		'ThinkVision E24 23,8"',
	];
	const tech = [
		'SvelteKit',
		'Flutter',
		'NestJS',
		'PrismaORM',
		'PostgreSQL',
		'Dart, TypeScript, PHP, Python',
	];

	const friends: { name: string; url: string }[] = [
		{
			name: 'Adrian Sebastian Šiška',
			url: 'https://ass.si/',
		},
		{
			name: 'Anton Luka Šijanec',
			url: 'https://šijanec.eu/',
		},
		{
			name: 'David Studen',
			url: 'https://studen.me/',
		},
		{
			name: 'Gašper Dobrovoljc',
			url: 'https://gapi.me/',
		},
		{
			name: 'Jurij Fortuna',
			url: 'https://fortuna.wf/',
		},
		{
			name: 'Lovro Govekar',
			url: 'https://govekar.net/',
		},
		{
			name: 'Matic Babnik',
			url: 'https://babnik.io/',
		},
		{
			name: 'Sven Ahac',
			url: 'https://svenahac.com/',
		},
		{
			name: 'Tim Hrovat',
			url: 'https://timhrovat.com/',
		},
		{
			name: 'Žiga Kralj',
			url: 'https://ziga.kralj.io/',
		},
	];

	let { data }: { data: PageData } = $props();
</script>

<div class="mt-8 flex w-full flex-row gap-8 max-[1120px]:flex-col max-[860px]:justify-center">
	<div
		class="flex w-full flex-row items-center justify-between rounded-sm border border-aipink p-8 max-[860px]:flex-col max-[860px]:justify-center"
	>
		<img class="w-[50%] rounded-sm mr-4 max-[860px]:mb-4" src={me} alt={$t('home.me_img_alt')} />
		<div class="flex flex-col items-center justify-start">
			<h1 class="text-center font-mono text-4xl font-bold text-aipink">Aiken Tine Ahac</h1>
			<p class="text-center font-mono text-xl text-aipink">Full-Stack Developer</p>
			<div class="mt-6 flex flex-row gap-2 text-lg">
				{#each socials as social}
					<a href={social.link} target="_blank">
						<FontAwesomeIcon
							class="text-aipink transition-all duration-200 hover:scale-110"
							icon={social.icon}
						/>
					</a>
				{/each}
			</div>
		</div>
	</div>

	<div
		class="flex w-full flex-col gap-2 justify-center items-center rounded-sm border border-aipink p-6"
	>
		<img
			class="w-full rounded-sm"
			src={l}
			alt="L"
		/>
	</div>
</div>

<div class="mt-8 flex w-full flex-col gap-4 rounded-sm border border-aipink p-6">
	<h1 class="font-mono text-2xl font-bold text-aipink">{$t('home.about_me.title')}</h1>
	<p class="font-mono text-aipink">
		{@html getAboutMe()}
	</p>
</div>

<div class="mt-8 flex w-full flex-col gap-4 rounded-sm border border-aipink p-6">
	<h1 class="font-mono text-2xl font-bold text-aipink">{$t('home.gear')}</h1>
	<ul class="list-['♱']">
		{#each gear as item}
			<li class="ml-6 pl-2 font-mono text-aipink">{item}</li>
		{/each}
	</ul>
</div>

<div class="mt-8 flex w-full flex-col gap-4 rounded-sm border border-aipink p-6">
	<h1 class="font-mono text-2xl font-bold text-aipink">{$t('home.tech')}</h1>
	<ul class="list-['♱']">
		{#each tech as item}
			<li class="ml-6 pl-2 font-mono text-aipink">{item}</li>
		{/each}
	</ul>
</div>

<div class="mt-8 flex w-full flex-col gap-4 rounded-sm border border-aipink p-6">
	<h1 class="font-mono text-2xl font-bold text-aipink">{$t('home.net_friends')}</h1>
	<ul class="list-['♱']">
		{#each friends as { name, url }}
			<li class="ml-6 pl-2 font-mono text-aipink underline">
				<a href={url} target="_blank">{name}</a>
			</li>
		{/each}
	</ul>
</div>