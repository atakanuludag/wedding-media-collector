"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { MediaItem } from "@/types/upload";

interface MediaLightboxProps {
  item: MediaItem | null;
  onClose: () => void;
}

export function MediaLightbox({ item, onClose }: MediaLightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.body.dataset.lightboxOpen = "true";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.lightboxOpen;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
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
      </div>
    </div>,
    document.body,
  );
}
