<script lang="ts">
  import { tilt } from '$lib/actions/tilt';

  let {
    url,
    caption,
    width,
    height,
  }: { url: string; caption?: string; width?: number; height?: number } = $props();
</script>

<div class="shot ticks flex flex-col p-3" data-cursor="view" use:tilt={{ max: 5, lift: 10 }}>
  <div class="img-frame relative w-full overflow-hidden rounded-sm">
    <img class="img h-auto w-full rounded-sm" src={url} {width} {height} loading="lazy" alt="me" />
    <div class="sheen" aria-hidden="true"></div>
  </div>
  {#if caption}
    <p class="caption mt-3 font-mono text-xs italic text-aipink">
      <span class="not-italic opacity-50">♱</span>
      {caption}
    </p>
  {/if}
</div>

<style>
  .img {
    filter: saturate(0.85);
    transition:
      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
      filter 0.6s ease;
  }

  .sheen {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 55%, rgba(212, 35, 198, 0.35));
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  .caption {
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .shot:hover .img {
    transform: scale(1.06);
    filter: saturate(1.1);
  }

  .shot:hover .sheen {
    opacity: 1;
  }

  .shot:hover .caption {
    transform: translateX(6px);
  }

  @media (prefers-reduced-motion: reduce) {
    .img,
    .sheen,
    .caption {
      transition: none;
    }
    .shot:hover .img,
    .shot:hover .caption {
      transform: none;
    }
  }
</style>
