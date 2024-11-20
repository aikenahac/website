<script lang="ts">
	import type { Route } from '$lib/types';
	import { t } from '$lib/translations';
	import { page } from '$app/stores';

	function changeLocale(lng: 'sl' | 'en') {
		document.cookie = `lang=${lng} ;`;
		document.location = document.location;
	}

	const routes: Route[] = [
		{
			name: $t('common.nav.home'),
			path: '/',
		},
		{
			name: $t('common.nav.work'),
			path: '/work',
		},
		{
			name: $t('common.nav.projects'),
			path: '/projects',
		},
		{
			name: $t('common.nav.highlights'),
			path: '/highlights',
		},
		{
			name: $t('common.nav.music'),
			path: '/music',
		},
	];

	const text =
		'hover:pointer font-mono text-aipink transition-all duration-200 hover:scale-110 hover:font-bold';
</script>

<div
	class="flex w-full flex-row items-center justify-start rounded-sm border border-aipink px-4 py-2 max-[860px]:grid max-[860px]:grid-cols-3"
>
	{#each routes as route, i}
		<a class={[text, route.path === $page.url.pathname && 'font-bold'].join(' ')} href={route.path}
			>{route.name} <span class="min-[860px]:hidden">☽</span></a
		>
		{#if i !== routes.length - 1}
			<p class="mx-6 text-aipink max-[860px]:hidden">☽</p>
		{/if}
	{/each}

	<div class="flex flex-row items-center ml-auto">
		<button onclick={() => changeLocale('sl')} class={text}>SLO</button>
		<p class="mx-6 text-aipink">✧</p>
		<button onclick={() => changeLocale('en')} class={text}>ENG</button>
	</div>
</div>
