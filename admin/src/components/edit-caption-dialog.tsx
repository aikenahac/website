import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { HighlightImage } from '@/types/highlight-image';

type EditCaptionDialogProps = {
  image: HighlightImage | null;
  isDeleting: boolean;
  isSaving: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (id: string) => Promise<void>;
  onSave: (id: string, caption: string) => Promise<void>;
};

type DialogBodyProps = {
  image: HighlightImage;
  isDeleting: boolean;
  isSaving: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (id: string) => Promise<void>;
  onSave: (id: string, caption: string) => Promise<void>;
};

function DialogBody({
  image,
  isDeleting,
  isSaving,
  onOpenChange,
  onDelete,
  onSave,
}: DialogBodyProps) {
  const [draftCaption, setDraftCaption] = useState(image.caption ?? '');
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const isBusy = isSaving || isDeleting;

  const handleSave = async () => {
    await onSave(image.id, draftCaption);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="max-h-[55vh] overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
          <img
            alt="Selected highlight image"
            className="max-h-[55vh] w-full object-contain"
            src={image.url}
          />
        </div>
        <Input
          autoFocus
          onChange={(event) => setDraftCaption(event.target.value)}
          placeholder="Write a caption..."
          value={draftCaption}
        />
      </div>

      {isConfirmingDelete ? (
        <p className="text-sm text-red-700" role="alert">
          This permanently deletes the image from S3 and cannot be undone.
        </p>
      ) : null}

      <DialogFooter className="sm:justify-between">
        <div className="flex gap-2">
          {isConfirmingDelete ? (
            <>
              <Button
                disabled={isBusy}
                variant="outline"
                onClick={() => setIsConfirmingDelete(false)}
              >
                Keep image
              </Button>
              <Button disabled={isBusy} variant="destructive" onClick={() => onDelete(image.id)}>
                {isDeleting ? 'Deleting...' : 'Delete permanently'}
              </Button>
            </>
          ) : (
            <Button
              disabled={isBusy}
              variant="destructive"
              onClick={() => setIsConfirmingDelete(true)}
            >
              Delete image
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button disabled={isBusy} variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled={isBusy} onClick={handleSave}>
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </DialogFooter>
    </>
  );
}

export function EditCaptionDialog({
  image,
  isDeleting,
  isSaving,
  onOpenChange,
  onDelete,
  onSave,
}: EditCaptionDialogProps) {
  return (
    <Dialog open={Boolean(image)} onOpenChange={onOpenChange}>
      <DialogContent className="w-[900px] max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>Edit caption</DialogTitle>
          <DialogDescription>Update caption text for this highlight image.</DialogDescription>
        </DialogHeader>

        {image ? (
          <DialogBody
            image={image}
            isDeleting={isDeleting}
            isSaving={isSaving}
            key={image.id}
            onOpenChange={onOpenChange}
            onDelete={onDelete}
            onSave={onSave}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
