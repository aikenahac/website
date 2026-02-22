import { Badge } from '@/components/ui/badge';
import type { HighlightImage } from '@/types/highlight-image';

type ImageGalleryProps = {
  images: HighlightImage[];
  onSelectImage: (image: HighlightImage) => void;
};

const getCaptionText = (caption?: string): string => {
  if (!caption?.trim()) {
    return '';
  }

  return caption.trim();
};

export function ImageGallery({ images, onSelectImage }: ImageGalleryProps) {
  if (!images.length) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500">
        No images yet. Click Sync from S3 to load highlights.
      </div>
    );
  }

  return (
    <section className="grid grid-cols-4 gap-5 xl:grid-cols-5 2xl:grid-cols-6">
      {images.map((image) => {
        const caption = getCaptionText(image.caption);

        return (
          <button
            key={image.id}
            type="button"
            onClick={() => onSelectImage(image)}
            className="group overflow-hidden rounded-xl border border-zinc-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="aspect-square w-full overflow-hidden bg-zinc-100">
              <img
                alt={caption ? `Highlight image: ${caption}` : 'Highlight image without caption'}
                className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                loading="lazy"
                src={image.url}
              />
            </div>
            <div className="space-y-2 p-3">
              {caption ? (
                <p className="max-h-10 overflow-hidden text-sm leading-snug text-zinc-800">
                  {caption}
                </p>
              ) : (
                <Badge variant="destructive">No caption</Badge>
              )}
            </div>
          </button>
        );
      })}
    </section>
  );
}
