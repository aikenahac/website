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
  isSaving: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, caption: string) => Promise<void>;
};

type DialogBodyProps = {
  image: HighlightImage;
  isSaving: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, caption: string) => Promise<void>;
};

function DialogBody({ image, isSaving, onOpenChange, onSave }: DialogBodyProps) {
  const [draftCaption, setDraftCaption] = useState(image.caption ?? '');

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

      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button disabled={isSaving} onClick={handleSave}>
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </DialogFooter>
    </>
  );
}

export function EditCaptionDialog({
  image,
  isSaving,
  onOpenChange,
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
            isSaving={isSaving}
            key={image.id}
            onOpenChange={onOpenChange}
            onSave={onSave}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
