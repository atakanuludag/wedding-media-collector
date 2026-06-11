"use client";

import Link from "next/link";
import { ArrowLeft, Images, Loader2, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { FloatingDecorations } from "@/components/FloatingDecorations";
import { MediaLightbox } from "@/components/MediaLightbox";
import { MediaTile } from "@/components/MediaTile";
import { appConfig } from "@/lib/config";
import type { MediaItem, MediaListResponse } from "@/types/upload";

export function GalleryPage() {
  const [data, setData] = useState<MediaListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/media");
      if (!response.ok) {
        throw new Error("Galeri yüklenemedi.");
      }

      const json = (await response.json()) as MediaListResponse;
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMedia();
  }, [fetchMedia]);

  return (
    <div className="relative min-h-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50" />
      <FloatingDecorations />

      <div className="relative mx-auto min-h-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <header className="mb-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-orange-600 hover:text-orange-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Ana sayfaya dön
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-orange-700 ring-1 ring-orange-100">
                <Images className="h-3.5 w-3.5" />
                Tüm Anılar
              </div>
              <h1 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl">
                {appConfig.title}
              </h1>
              {data && (
                <p className="mt-1 text-sm text-stone-500">
                  {data.total} fotoğraf ve video · en yeniden eskiye
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => void fetchMedia()}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-4 py-2 text-sm text-orange-600 ring-1 ring-orange-100 hover:bg-orange-50"
            >
              <RefreshCw className="h-4 w-4" />
              Yenile
            </button>
          </div>
        </header>

        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </div>
        )}

        {error && (
          <div className="rounded-2xl bg-white/80 p-6 text-center ring-1 ring-orange-100">
            <p className="text-sm text-stone-600">{error}</p>
            <button
              type="button"
              onClick={() => void fetchMedia()}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
            >
              <RefreshCw className="h-4 w-4" />
              Tekrar dene
            </button>
          </div>
        )}

        {!loading && !error && data && data.total === 0 && (
          <div className="rounded-2xl bg-white/60 p-10 text-center ring-1 ring-orange-100">
            <p className="text-stone-500">Henüz paylaşılan anı yok.</p>
          </div>
        )}

        {!loading && !error && data && data.total > 0 && (
          <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 sm:gap-4">
            {data.items.map((item) => (
              <div key={item.key} className="mb-3 break-inside-avoid sm:mb-4">
                <MediaTile
                  item={item}
                  aspectSquare={false}
                  showDate
                  onClick={() => setSelectedItem(item)}
                />
              </div>
            ))}
          </div>
        )}

        <MediaLightbox
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </div>
  );
}
