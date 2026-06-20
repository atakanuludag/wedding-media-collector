"use client";

import { CheckCircle2, Heart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface UploadSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export function UploadSuccessModal({ open, onClose }: UploadSuccessModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-success-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Kapat"
      />

      <div className="relative z-10 w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl ring-1 ring-orange-100">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
          aria-label="Kapat"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <h2
          id="upload-success-title"
          className="text-xl font-semibold text-stone-900"
        >
          Teşekkürler!
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          Fotoğraf ve videolarını kaydettim. Daha çok fotoğraf video çekmene
          hayır demeyiz.
        </p>

        <div className="mt-4 inline-flex items-center gap-1.5 text-orange-500">
          <Heart className="h-4 w-4 fill-orange-400" />
          <span className="text-xs font-medium">Teşekkür ederiz!</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600"
        >
          Tamam
        </button>
      </div>
    </div>,
    document.body,
  );
}
