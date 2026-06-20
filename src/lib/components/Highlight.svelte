<script lang="ts">
  let {
    url,
    caption,
    width,
    height
  }: { url: string; caption?: string; width?: number; height?: number } = $props();
</script>

<div class="flex flex-col items-center justify-center border border-aipink p-6">
  <img class="h-auto w-full rounded-sm" src={url} {width} {height} loading="lazy" alt="me" />
  {#if caption}
    <p class="mt-3 text-center text-xs italic text-aipink">{caption}</p>
  {/if}
</div>
