"use client";

import {
  Camera,
  CheckCircle2,
  ImagePlus,
  Loader2,
  Upload,
  XCircle,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type { UploadItem } from "@/types/upload";

const ACCEPT =
  "image/jpeg,image/png,image/webp,image/heic,image/heif,video/mp4,video/quicktime,video/webm,video/x-msvideo";

function uploadWithProgress(
  file: File,
  onProgress: (progress: number) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/media/upload");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress(100);
        resolve();
        return;
      }

      try {
        const data = JSON.parse(xhr.responseText) as { error?: string };
        reject(new Error(data.error ?? `Yükleme başarısız (${xhr.status})`));
      } catch {
        reject(new Error(`Yükleme başarısız (${xhr.status})`));
      }
    };

    xhr.onerror = () => reject(new Error("Ağ hatası oluştu."));
    xhr.send(formData);
  });
}

interface UploadZoneProps {
  onUploadComplete?: () => void;
}

export function UploadZone({ onUploadComplete }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<UploadItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const updateItem = useCallback(
    (id: string, patch: Partial<UploadItem>) => {
      setItems((current) =>
        current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      );
    },
    [],
  );

  const uploadFile = useCallback(
    async (item: UploadItem) => {
      updateItem(item.id, { status: "uploading", progress: 0, error: undefined });

      try {
        await uploadWithProgress(item.file, (progress) => {
          updateItem(item.id, { progress });
        });

        updateItem(item.id, { status: "success", progress: 100 });
        onUploadComplete?.();
      } catch (error) {
        updateItem(item.id, {
          status: "error",
          error:
            error instanceof Error ? error.message : "Yükleme başarısız oldu.",
        });
      }
    },
    [onUploadComplete, updateItem],
  );

  const processFiles = useCallback(
    (fileList: FileList | File[]) => {
      const files = Array.from(fileList);
      if (files.length === 0) return;

      const newItems: UploadItem[] = files.map((file) => ({
        id: crypto.randomUUID(),
        file,
        status: "pending",
        progress: 0,
      }));

      setItems((current) => [...newItems, ...current]);
      newItems.forEach((item) => {
        void uploadFile(item);
      });
    },
    [uploadFile],
  );

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragging(false);
      processFiles(event.dataTransfer.files);
    },
    [processFiles],
  );

  const handleFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        processFiles(event.target.files);
        event.target.value = "";
      }
    },
    [processFiles],
  );

  const completedCount = items.filter((item) => item.status === "success").length;
  const hasActiveUploads = items.some(
    (item) => item.status === "pending" || item.status === "uploading",
  );

  return (
    <div className="space-y-4">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`group relative cursor-pointer rounded-3xl border-2 border-dashed p-8 text-center transition-all ${
          isDragging
            ? "border-orange-400 bg-orange-50 scale-[1.01]"
            : "border-orange-200 bg-white/80 hover:border-orange-300 hover:bg-orange-50/50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          multiple
          className="hidden"
          onChange={handleFileInputChange}
        />

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 transition-transform group-hover:scale-105">
          <ImagePlus className="h-8 w-8" />
        </div>

        <h2 className="text-lg font-semibold text-stone-800">
          Fotoğraf veya video seçin
        </h2>
        <p className="mt-2 text-sm text-stone-500">
          Dosyaları sürükleyip bırakın veya dokunarak galerinizden seçin
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
            <Camera className="h-3.5 w-3.5" />
            Fotoğraf
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
            <Upload className="h-3.5 w-3.5" />
            Video
          </span>
        </div>
      </div>

      {items.length > 0 && (
        <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-orange-100">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-stone-700">
              {hasActiveUploads ? "Yükleniyor..." : "Yükleme tamamlandı"}
            </p>
            {completedCount > 0 && (
              <p className="text-xs text-orange-600">
                {completedCount} dosya yüklendi
              </p>
            )}
          </div>

          <ul className="max-h-64 space-y-2 overflow-y-auto">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-xl bg-stone-50 px-3 py-2.5"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-stone-800">
                    {item.file.name}
                  </p>
                  {item.status === "uploading" && (
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-stone-200">
                      <div
                        className="h-full rounded-full bg-orange-500 transition-all duration-300"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  )}
                  {item.error && (
                    <p className="mt-0.5 text-xs text-red-600">{item.error}</p>
                  )}
                </div>

                <div className="shrink-0">
                  {(item.status === "pending" || item.status === "uploading") && (
                    <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
                  )}
                  {item.status === "success" && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  )}
                  {item.status === "error" && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
