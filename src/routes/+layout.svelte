<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>Aiken Tine Ahac</title>
</svelte:head>

<main class="flex flex-col items-center p-12 bg-aiblack max-w-screen min-h-screen">
	<Nav />
	{@render children()}
</main>
