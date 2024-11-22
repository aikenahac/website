import { z } from 'zod';

export interface SpotifySong {
	title: string;
	artists: string;
	coverUrl: string;
  playing?: boolean;
}

export type SongResponse = z.infer<typeof songResponseSchema>;
export const songResponseSchema = z.object({
	album: z.object({
		images: z.array(
			z.object({
				url: z.string(),
			}),
		),
	}),
	artists: z.array(
		z.object({
			name: z.string(),
		}),
	),
	name: z.string(),
});

export const abstractSongResponseSchema = z.object({
  item: songResponseSchema,
  is_playing: z.boolean(),
})