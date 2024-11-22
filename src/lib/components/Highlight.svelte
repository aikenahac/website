<script lang="ts">
  let { url }: { url: string } = $props();
</script>

<div class="flex flex-col items-center justify-center border border-aipink p-6">
  <img
    class="rounded-sm h-full w-full object-cover"
    src={url}
    alt="me"
  />
</div>