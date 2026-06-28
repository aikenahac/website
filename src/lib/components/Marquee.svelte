<script lang="ts">
  let {
    items = [],
    speed = 30,
    separator = '✦',
    reverse = false,
  }: { items?: string[]; speed?: number; separator?: string; reverse?: boolean } = $props();
</script>

<div class="marquee" style={`--marquee-duration:${speed}s`}>
  <div class="marquee-track" class:reverse>
    {#each [0, 1] as group (group)}
      <div class="marquee-group" aria-hidden={group === 1}>
        {#each items as item (item)}
          <span class="marquee-item">{item}</span>
          <span class="marquee-sep">{separator}</span>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .marquee {
    overflow: hidden;
    width: 100%;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
    mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  }

  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee var(--marquee-duration, 30s) linear infinite;
  }

  .marquee-track.reverse {
    animation-direction: reverse;
  }

  .marquee-group {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .marquee-item,
  .marquee-sep {
    font-family: 'JetBrains Mono Variable', ui-monospace, monospace;
    color: #d423c6;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  .marquee-item {
    padding: 0 0.4rem;
  }

  .marquee-sep {
    opacity: 0.6;
    padding: 0 0.4rem;
  }

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .marquee-track {
      animation: none;
    }
  }
</style>
