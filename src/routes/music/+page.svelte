<script lang="ts">
	import { t } from '$lib/translations';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<div class="mt-8 flex w-full flex-col gap-4 rounded-sm border border-aipink p-6">
	<h1 class="font-mono text-4xl font-bold text-aipink">{$t('music.title')}</h1>
</div>

{#if data.currentlyPlaying && data.currentlyPlaying.playing}
	<div class="mt-8 flex w-full flex-col rounded-sm border-4 border-aipink p-6">
		<h2 class="mb-12 font-mono text-2xl font-bold text-aipink">{$t('music.playing')}</h2>
		<div class="flex flex-row items-center justify-around max-[950px]:flex-col">
			<div
				class="animate-spin-slow vinyl flex h-64 w-64 items-center justify-center rounded-full p-16"
			>
				<div class="absolute z-50 h-4 w-4 rounded-full bg-gray-900"></div>
				<img
					class="rounded-full"
					src={data.currentlyPlaying.coverUrl}
					alt={data.currentlyPlaying.title}
				/>
			</div>
			<div
				class="flex max-w-[45%] flex-col items-center justify-center max-[950px]:mt-8 min-[950px]:ml-8"
			>
				<p class="text-center font-mono text-4xl font-bold text-aipink">
					{data.currentlyPlaying.title}
				</p>
				<p class="text-center font-mono text-xl text-aipink">{data.currentlyPlaying.artists}</p>
			</div>
			{#if data.upNext}
				<div class="flex flex-col items-center justify-between max-[950px]:mt-8 min-[950px]:ml-8">
					<p class="font-mono text-lg font-bold text-aipink">{$t('music.next')}</p>
					<div class="my-6 flex items-center justify-center">
						<img
							class="absolute z-50 mr-20 h-48 w-48 rounded-sm shadow-md"
							src={data.upNext.coverUrl}
							alt={data.upNext.title}
						/>
						<div class="vinyl h-44 w-44 rounded-full"></div>
					</div>
					<p class="text-center font-mono font-bold text-aipink">{data.upNext.title}</p>
					<p class="text-center font-mono text-xs font-bold text-aipink">{data.upNext.artists}</p>
				</div>
			{/if}
		</div>
	</div>
{/if}
