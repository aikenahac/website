<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import { t } from '$lib/translations';
	import '../app.css';
	
	let { children } = $props();
</script>

<svelte:head>
	<title>Aiken Tine Ahac</title>
</svelte:head>

<main class="flex flex-col items-center p-12 max-[860px]:p-6 bg-aiblack max-w-screen min-h-screen">
	<Nav />
	{@render children()}
	<div
	class="mt-8 flex w-full flex-col items-center justify-center gap-4 rounded-sm border border-aipink p-6"
>
	<p class="font-mono text-aipink">{$t('common.made')}</p>
	<a
		class="font-mono text-aipink underline"
		href="https://github.com/aikenahac/website"
		target="_blank">{$t('common.oss')}</a
	>
</div>

</main>
