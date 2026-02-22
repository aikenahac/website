import { useEffect, useMemo, useState } from 'react';
import { Loader2Icon, RefreshCcwIcon } from 'lucide-react';

import { EditCaptionDialog } from '@/components/edit-caption-dialog';
import { ImageGallery } from '@/components/image-gallery';
import { Button } from '@/components/ui/button';
import type { HighlightImage } from '@/types/highlight-image';

type ApiResponse = {
  items: HighlightImage[];
  error?: string;
};

const fetchImages = async (): Promise<HighlightImage[]> => {
  const response = await fetch('/api/images');
  const data = (await response.json()) as ApiResponse;

  if (!response.ok) {
    throw new Error(data.error ?? 'Failed to load images.');
  }

  return data.items;
};

const syncImages = async (): Promise<HighlightImage[]> => {
  const response = await fetch('/api/sync-images', {
    method: 'POST',
  });
  const data = (await response.json()) as ApiResponse;

  if (!response.ok) {
    throw new Error(data.error ?? 'Failed to sync images.');
  }

  return data.items;
};

const updateCaption = async (id: string, caption: string): Promise<HighlightImage[]> => {
  const response = await fetch('/api/update-caption', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, caption }),
  });

  const data = (await response.json()) as ApiResponse;

  if (!response.ok) {
    throw new Error(data.error ?? 'Failed to update caption.');
  }

  return data.items;
};

function App() {
  const [images, setImages] = useState<HighlightImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedImage = useMemo(
    () => images.find((item) => item.id === selectedImageId) ?? null,
    [images, selectedImageId],
  );

  useEffect(() => {
    const load = async () => {
      try {
        setErrorMessage(null);
        const loadedImages = await fetchImages();
        setImages(loadedImages);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load images.';
        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  const handleSync = async () => {
    try {
      setErrorMessage(null);
      setIsSyncing(true);
      const syncedImages = await syncImages();
      setImages(syncedImages);
      setSelectedImageId((currentId) => {
        if (!currentId) {
          return currentId;
        }

        return syncedImages.some((item) => item.id === currentId) ? currentId : null;
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to sync images.';
      setErrorMessage(message);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSaveCaption = async (id: string, caption: string) => {
    try {
      setErrorMessage(null);
      setIsSaving(true);
      const updatedImages = await updateCaption(id, caption);
      setImages(updatedImages);
      setSelectedImageId(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save caption.';
      setErrorMessage(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="mx-auto w-full max-w-[1800px] px-8 py-8">
        <header className="mb-6 flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Highlights Admin</h1>
          <Button disabled={isSyncing} onClick={handleSync}>
            {isSyncing ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <RefreshCcwIcon className="size-4" />
            )}
            {isSyncing ? 'Syncing...' : 'Sync from S3'}
          </Button>
        </header>

        {errorMessage ? (
          <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        {isLoading ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-zinc-200 bg-white">
            <Loader2Icon className="size-6 animate-spin text-zinc-500" />
          </div>
        ) : (
          <ImageGallery images={images} onSelectImage={(image) => setSelectedImageId(image.id)} />
        )}

        <EditCaptionDialog
          image={selectedImage}
          isSaving={isSaving}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setSelectedImageId(null);
            }
          }}
          onSave={handleSaveCaption}
        />
      </div>
    </div>
  );
}

export default App;
