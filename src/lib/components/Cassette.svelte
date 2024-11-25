<script lang="ts">
  import type { SpotifyPlaylist } from '$lib/spotify/types';

  let { playlist }: { playlist: SpotifyPlaylist } = $props();
</script>

<a class="cassette" href={playlist.url} target="_blank">
  <div class="inner-frame">
    <div class="sticker">{playlist.title}</div>
    <div class="type-text">TYPE II</div>
    <div class="tape-window">
      <div class="tape-path">
        <div class="tape-shine"></div>
      </div>
    </div>
    <div class="reel reel-left">
      <div class="reel-holes">
        <div class="reel-hole"></div>
        <div class="reel-hole"></div>
        <div class="reel-hole"></div>
        <div class="reel-hole"></div>
      </div>
    </div>
    <div class="reel reel-right">
      <div class="reel-holes">
        <div class="reel-hole"></div>
        <div class="reel-hole"></div>
        <div class="reel-hole"></div>
        <div class="reel-hole"></div>
      </div>
    </div>
    <div class="screw screw-1"></div>
    <div class="screw screw-2"></div>
    <div class="screw screw-3"></div>
    <div class="screw screw-4"></div>
    <div class="screw screw-5"></div>
    <div class="screw screw-6"></div>
    <div class="write-protect write-protect-left"></div>
    <div class="write-protect write-protect-right"></div>
    <div class="finger-grip finger-grip-left"></div>
    <div class="finger-grip finger-grip-right"></div>
    <div class="brand-text">Chrome Position • High Bias</div>
    <div class="duration">90 MIN</div>
    <div class="specs">IEC TYPE II • 70μs EQ • 120μs • HIGH OUTPUT</div>
    <div class="wear-overlay"></div>
  </div>
</a>

<style>
  .cassette {
    position: relative;
    width: 250px;
    height: 160px;
    background: linear-gradient(45deg, #2a2a2a, #3a3a3a);
    border-radius: 6px;
    padding: 8px;
    margin: 20px auto;
    box-shadow:
      0 4px 8px rgba(0, 0, 0, 0.4),
      inset 0 1px 2px rgba(255, 255, 255, 0.1);
    transform: rotate(-2deg);
  }

  .cassette::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 1px,
      rgba(255, 255, 255, 0.03) 1px,
      rgba(255, 255, 255, 0.03) 2px
    );
    border-radius: 6px;
    pointer-events: none;
  }

  .inner-frame {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 210px;
    height: 140px;
    background: linear-gradient(to bottom, #444, #333);
    border-radius: 4px;
    border: 1px solid #222;
    overflow: hidden;
  }

  .inner-frame::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%
    );
    pointer-events: none;
  }

  .tape-window {
    position: absolute;
    width: 160px;
    height: 50px;
    background: #111;
    top: 65px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
    border: 1px solid #000;
    overflow: hidden;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  .tape-path {
    position: absolute;
    width: 100%;
    height: 20px;
    background: linear-gradient(to bottom, #1a1a1a, #222 20%, #1a1a1a 50%, #222 80%, #1a1a1a 100%);
    top: 50%;
    transform: translateY(-50%);
  }

  .tape-shine {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 20%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.1) 80%,
      transparent 100%
    );
  }

  .reel {
    position: absolute;
    width: 42px;
    height: 42px;
    background: radial-gradient(circle at 50% 50%, #222, #111);
    border-radius: 50%;
    top: 69px;
    box-shadow:
      inset 0 1px 2px rgba(0, 0, 0, 0.8),
      0 1px 1px rgba(255, 255, 255, 0.1);
  }

  .reel-left {
    left: 28px;
  }
  .reel-right {
    right: 28px;
  }

  .reel::after {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    background: radial-gradient(circle at 50% 50%, #444, #333);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #111;
  }

  .reel::before {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    border: 2px solid #1a1a1a;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .reel-holes {
    position: absolute;
    width: 100%;
    height: 100%;
    animation: spin 8s linear infinite;
  }

  .reel-hole {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #000;
    border-radius: 50%;
  }

  .reel-hole:nth-child(1) {
    top: 5px;
    left: 50%;
  }
  .reel-hole:nth-child(2) {
    top: 50%;
    right: 5px;
  }
  .reel-hole:nth-child(3) {
    bottom: 5px;
    left: 50%;
  }
  .reel-hole:nth-child(4) {
    top: 50%;
    left: 5px;
  }

  .sticker {
    position: absolute;
    width: 170px;
    height: 42px;
    background: linear-gradient(45deg, #fff, #f0f0f0);
    top: 15px;
    left: 50%;
    transform: translateX(-50%) rotate(0.5deg);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Courier New', monospace;
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
    color: #222;
    text-align: center;
    padding: 4px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    border: 1px solid #ddd;
    overflow: hidden;
  }

  .sticker::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg) translateX(-150%);
    animation: shine 5s infinite;
  }

  .sticker::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 5px,
      rgba(0, 0, 0, 0.02) 5px,
      rgba(0, 0, 0, 0.02) 10px
    );
  }

  .screw {
    position: absolute;
    width: 7px;
    height: 7px;
    background: radial-gradient(circle at 40% 40%, #555, #333);
    border-radius: 50%;
    border: 1px solid #222;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.8);
  }

  .screw-1 {
    top: 10px;
    left: 10px;
    transform: rotate(45deg);
  }
  .screw-2 {
    top: 10px;
    right: 10px;
    transform: rotate(-45deg);
  }
  .screw-3 {
    bottom: 10px;
    left: 10px;
    transform: rotate(-45deg);
  }
  .screw-4 {
    bottom: 10px;
    right: 10px;
    transform: rotate(45deg);
  }
  .screw-5 {
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }
  .screw-6 {
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }

  .screw::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 1px;
    background: #222;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .write-protect {
    position: absolute;
    width: 12px;
    height: 9px;
    background: linear-gradient(to bottom, #222, #1a1a1a);
    bottom: 12px;
    border-radius: 1px;
    box-shadow:
      inset 0 1px 1px rgba(0, 0, 0, 0.8),
      0 1px 1px rgba(255, 255, 255, 0.1);
  }

  .write-protect-left {
    left: 50px;
  }
  .write-protect-right {
    right: 50px;
  }

  .finger-grip {
    position: absolute;
    width: 20px;
    height: 60px;
    background: #2a2a2a;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 1px;
  }

  .finger-grip-left {
    left: 2px;
    background: linear-gradient(90deg, #222, #2a2a2a);
  }

  .finger-grip-right {
    right: 2px;
    background: linear-gradient(-90deg, #222, #2a2a2a);
  }

  .finger-grip::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: repeating-linear-gradient(
      90deg,
      transparent,
      transparent 1px,
      rgba(0, 0, 0, 0.2) 1px,
      rgba(0, 0, 0, 0.2) 2px
    );
  }

  .brand-text {
    position: absolute;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    font-family: Arial, sans-serif;
    font-size: 7px;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
  }

  .duration {
    position: absolute;
    top: 8px;
    right: 20px;
    font-family: Arial, sans-serif;
    font-size: 7px;
    color: #888;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
  }

  .type-text {
    position: absolute;
    top: 8px;
    left: 20px;
    font-family: Arial, sans-serif;
    font-size: 6px;
    color: #888;
    text-transform: uppercase;
  }

  .specs {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    font-family: Arial, sans-serif;
    font-size: 5px;
    color: #666;
    width: 80%;
    text-align: center;
  }

  .wear-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 30% 40%,
      transparent 0%,
      rgba(0, 0, 0, 0.1) 90%,
      rgba(0, 0, 0, 0.2) 100%
    );
    pointer-events: none;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes shine {
    0% {
      transform: skewX(-45deg) translateX(-150%);
    }
    15% {
      transform: skewX(-45deg) translateX(150%);
    }
    100% {
      transform: skewX(-45deg) translateX(150%);
    }
  }
</style>
