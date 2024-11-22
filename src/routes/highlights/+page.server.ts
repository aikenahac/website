import { ListObjectsCommand, S3Client } from '@aws-sdk/client-s3';
import {
	S3_ENDPOINT,
	S3_PUBLIC_URL,
	S3_ACCESS_KEY,
	S3_SECRET_KEY,
	S3_REGION,
	S3_BUCKET,
	S3_FOLDER,
} from '$env/static/private';
import { arrayShuffle } from '$lib/utils';

interface ImagesLoad {
	items: string[];
}

export const load = async (): Promise<ImagesLoad> => {
	if (
		!S3_ENDPOINT ||
		!S3_PUBLIC_URL ||
		!S3_ACCESS_KEY ||
		!S3_SECRET_KEY ||
		!S3_REGION ||
		!S3_BUCKET ||
		!S3_FOLDER
	) {
		return { items: [] };
	}

	const s3 = new S3Client({
		endpoint: S3_ENDPOINT,
		region: S3_REGION,
		credentials: {
			accessKeyId: S3_ACCESS_KEY,
			secretAccessKey: S3_SECRET_KEY,
		},
	});

	const command = new ListObjectsCommand({
		Bucket: S3_BUCKET,
		Prefix: S3_FOLDER,
	});

	const rsp = await s3.send(command);
	// Remove the first element, as it's the folder
	const images = rsp.Contents?.slice(1);

	const urls = images?.map((img) => `${S3_PUBLIC_URL}/${img.Key}`) ?? [];

	return {
    items: arrayShuffle(urls),
  };
};
