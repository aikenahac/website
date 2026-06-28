<script lang="ts">
  let {
    url,
    caption,
    width,
    height,
  }: { url: string; caption?: string; width?: number; height?: number } = $props();
</script>

<div
  class="card flex flex-col items-center justify-center border border-aipink p-6"
  data-cursor="view"
>
  <div class="img-frame w-full overflow-hidden rounded-sm">
    <img class="img h-auto w-full rounded-sm" src={url} {width} {height} loading="lazy" alt="me" />
  </div>
  {#if caption}
    <p class="mt-3 text-center text-xs italic text-aipink">{caption}</p>
  {/if}
</div>

<style>
  .img {
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .card:hover .img {
    transform: scale(1.05);
  }
  @media (prefers-reduced-motion: reduce) {
    .img {
      transition: none;
    }
    .card:hover .img {
      transform: none;
    }
  }
</style>
