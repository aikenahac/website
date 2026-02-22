import highlightCaptions from '$lib/data/highlight-captions.json';
import { arrayShuffle } from '$lib/utils';

interface HighlightImage {
  id: string;
  url: string;
  caption?: string;
}

interface HighlightsLoad {
  items: HighlightImage[];
}

const parsedHighlights = (highlightCaptions as unknown[]).flatMap((item) => {
  if (!item || typeof item !== 'object') {
    return [];
  }

  const entry = item as Record<string, unknown>;

  if (typeof entry.id !== 'string' || typeof entry.url !== 'string') {
    return [];
  }

  const caption = typeof entry.caption === 'string' ? entry.caption : undefined;

  return [
    {
      id: entry.id,
      url: entry.url,
      caption,
    },
  ];
});

export const load = async (): Promise<HighlightsLoad> => {
  return {
    items: arrayShuffle(parsedHighlights),
  };
};
