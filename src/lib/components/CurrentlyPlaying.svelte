<script lang="ts">
	import type { SpotifySong } from '$lib/spotify/types';
	import { t } from '$lib/translations';

	let { currentlyPlaying, upNext }: { currentlyPlaying: SpotifySong; upNext?: SpotifySong } =
		$props();
</script>

<div class="mt-8 flex w-full flex-col rounded-sm border-4 border-aipink p-6">
	<h2 class="mb-12 font-mono text-2xl font-bold text-aipink">{$t('music.playing')}</h2>
	<div class="flex flex-row items-center justify-around max-[950px]:flex-col">
		<div
			class={[
				'vinyl flex h-64 w-64 items-center justify-center rounded-full p-16',
				currentlyPlaying.playing && 'animate-spin-slow',
			].join(' ')}
		>
			<div class="absolute z-50 h-4 w-4 rounded-full bg-gray-900"></div>
			<img class="rounded-full" src={currentlyPlaying.coverUrl} alt={currentlyPlaying.title} />
		</div>
		<div
			class="flex max-w-[45%] flex-col items-center justify-center max-[950px]:mt-8 min-[950px]:ml-8"
		>
			<p class="text-center font-mono text-4xl font-bold text-aipink">
				{currentlyPlaying.title}
			</p>
			<p class="text-center font-mono text-xl text-aipink">{currentlyPlaying.artists}</p>
			{#if !currentlyPlaying.playing}
				<p class="mt-4 text-center font-mono text-lg text-aipink">{$t('music.paused')}</p>
			{/if}
		</div>
		<div class="flex flex-col items-center justify-between max-[950px]:mt-8 min-[950px]:ml-8">
			<p class="font-mono text-lg font-bold text-aipink">{$t('music.next')}</p>
			<div class="my-6 flex items-center justify-center translate-x-8">
				{#if upNext}
					<img
						class="absolute z-50 mr-20 h-48 w-48 rounded-sm shadow-md"
						src={upNext.coverUrl}
						alt={upNext.title}
					/>
				{/if}
				<div class="vinyl h-44 w-44 rounded-full"></div>
			</div>
			{#if upNext}
				<p class="text-center font-mono font-bold text-aipink">{upNext.title}</p>
				<p class="text-center font-mono text-xs font-bold text-aipink">{upNext.artists}</p>
			{:else}
				<p class="text-center font-mono font-bold text-aipink">{$t('music.nothing_next')}</p>
			{/if}
		</div>
	</div>
</div>
