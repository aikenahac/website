import highlightCaptions from '$lib/data/highlight-captions.json';

interface HighlightImage {
  id: string;
  url: string;
  caption?: string;
  width?: number;
  height?: number;
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
  const width = typeof entry.width === 'number' ? entry.width : undefined;
  const height = typeof entry.height === 'number' ? entry.height : undefined;

  return [
    {
      id: entry.id,
      url: entry.url,
      caption,
      width,
      height,
    },
  ];
});

const ratio = (item: HighlightImage) =>
  item.width && item.height ? item.width / item.height : Infinity;

export const load = async (): Promise<HighlightsLoad> => {
  return {
    items: [...parsedHighlights].sort((a, b) => ratio(a) - ratio(b)),
  };
};
