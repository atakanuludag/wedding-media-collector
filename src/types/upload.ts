export type UploadStatus = "pending" | "uploading" | "success" | "error";

export interface UploadItem {
  id: string;
  file: File;
  status: UploadStatus;
  progress: number;
  error?: string;
}

export interface PresignResponse {
  uploadUrl: string;
  key: string;
}

export interface MediaItem {
  key: string;
  url: string;
  kind: "image" | "video";
  lastModified?: string;
  size?: number;
}

export interface MediaListResponse {
  items: MediaItem[];
  total: number;
  remaining: number;
}
