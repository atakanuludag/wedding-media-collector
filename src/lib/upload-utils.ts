import { uploadConfig } from "./config";

export type MediaKind = "image" | "video";

export function getMediaKind(contentType: string): MediaKind | null {
  if (
    (uploadConfig.allowedImageTypes as readonly string[]).includes(contentType)
  ) {
    return "image";
  }
  if (
    (uploadConfig.allowedVideoTypes as readonly string[]).includes(contentType)
  ) {
    return "video";
  }
  return null;
}

export function validateUploadRequest(
  contentType: string,
  size: number,
): string | null {
  const kind = getMediaKind(contentType);
  if (!kind) {
    return "Desteklenmeyen dosya türü. Lütfen fotoğraf veya video yükleyin.";
  }

  const maxSize =
    kind === "image" ? uploadConfig.maxPhotoSize : uploadConfig.maxVideoSize;

  if (size > maxSize) {
    const maxMb = Math.round(maxSize / (1024 * 1024));
    return `Dosya boyutu ${maxMb} MB sınırını aşıyor.`;
  }

  return null;
}

export function sanitizeFilename(name: string): string {
  const base = name.split(/[/\\]/).pop() ?? "file";
  return base.replace(/[^\w.\-() ]+/g, "_").slice(0, 120);
}

export function buildObjectKey(filename: string): string {
  const safeName = sanitizeFilename(filename);
  const id = crypto.randomUUID();
  const timestamp = Date.now();
  return `${timestamp}-${id}-${safeName}`;
}

export function isVideoKey(key: string): boolean {
  return /\.(mp4|mov|webm|avi)$/i.test(key);
}

export function isHeicUpload(contentType: string, filename: string): boolean {
  const type = contentType.toLowerCase();
  if (type === "image/heic" || type === "image/heif") return true;
  return /\.heic$/i.test(filename) || /\.heif$/i.test(filename);
}

export function toJpegFilename(filename: string): string {
  return filename.replace(/\.(heic|heif)$/i, ".jpg");
}
