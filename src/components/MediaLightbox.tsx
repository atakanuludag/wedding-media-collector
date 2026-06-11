"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { formatMediaDate } from "@/lib/media-api";
import type { MediaItem } from "@/types/upload";

interface MediaLightboxProps {
  item: MediaItem | null;
  onClose: () => void;
}

export function MediaLightbox({ item, onClose }: MediaLightboxProps) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const formattedDate = formatMediaDate(item.lastModified);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={item.kind === "video" ? "Video oynatıcı" : "Fotoğraf önizleme"}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Kapat"
      />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-2 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:-right-12 sm:top-0"
          aria-label="Kapat"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="max-h-[85vh] w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
          {item.kind === "video" ? (
            <video
              key={item.key}
              src={item.url}
              className="max-h-[85vh] w-full bg-black object-contain"
              controls
              autoPlay
              playsInline
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.url}
              alt="Paylaşılan fotoğraf"
              className="max-h-[85vh] w-full object-contain"
            />
          )}
        </div>

        {formattedDate && (
          <p className="mt-4 text-sm text-white/80">{formattedDate}</p>
        )}
      </div>
    </div>
  );
}
