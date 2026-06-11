import type { _Object } from "@aws-sdk/client-s3";
import { createPresignedDownloadUrl } from "@/lib/r2";
import { isVideoKey } from "@/lib/upload-utils";
import type { MediaItem } from "@/types/upload";

export function computePreviewSlice(total: number, limit: number) {
  if (total <= limit) {
    return { displayCount: total, remaining: 0 };
  }

  const displayCount = limit - 1;
  return { displayCount, remaining: total - displayCount };
}

export async function mapObjectsToMediaItems(
  objects: _Object[],
): Promise<MediaItem[]> {
  return Promise.all(
    objects.map(async (object) => {
      const key = object.Key!;
      const kind = isVideoKey(key) ? "video" : "image";

      return {
        key,
        kind,
        url: await createPresignedDownloadUrl(key, 3600),
        lastModified: object.LastModified?.toISOString(),
        size: object.Size,
      };
    }),
  );
}

export function formatMediaDate(iso?: string): string | null {
  if (!iso) return null;

  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}
