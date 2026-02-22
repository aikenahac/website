<script lang="ts">
  let { url, caption }: { url: string; caption?: string } = $props();
</script>

<div class="flex flex-col items-center justify-center border border-aipink p-6">
  <img class="h-full w-full rounded-sm object-cover" src={url} loading="lazy" alt="me" />
  {#if caption}
    <p class="mt-3 text-xs text-center italic text-aipink">{caption}</p>
  {/if}
</div>
