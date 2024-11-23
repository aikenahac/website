<script lang="ts">
  let { url }: { url: string } = $props();
</script>

<div class="flex flex-col items-center justify-center border border-aipink p-6">
  <img class="h-full w-full rounded-sm object-cover" src={url} loading="lazy" alt="me" />
</div>
