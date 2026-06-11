"use client";

import Link from "next/link";
import { Loader2, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { MediaLightbox } from "@/components/MediaLightbox";
import { MediaTile } from "@/components/MediaTile";
import { galleryConfig } from "@/lib/config";
import type { MediaItem, MediaListResponse } from "@/types/upload";

interface MediaGalleryProps {
  refreshToken?: number;
}

export function MediaGallery({ refreshToken = 0 }: MediaGalleryProps) {
  const [data, setData] = useState<MediaListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/media?limit=${galleryConfig.homePreviewLimit}`,
      );
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
  }, [fetchMedia, refreshToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
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
    );
  }

  if (!data || data.total === 0) {
    return (
      <div className="rounded-2xl bg-white/60 p-10 text-center ring-1 ring-orange-100">
        <p className="text-stone-500">
          Henüz paylaşılan fotoğraf veya video yok. İlk siz yükleyin!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-stone-800">
          Paylaşılan Anılar
        </h2>
        <button
          type="button"
          onClick={() => void fetchMedia()}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-orange-600 hover:bg-orange-50"
        >
          <RefreshCw className="h-4 w-4" />
          Yenile
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
        {data.items.map((item) => (
          <MediaTile
            key={item.key}
            item={item}
            onClick={() => setSelectedItem(item)}
          />
        ))}

        {data.remaining > 0 && (
          <Link
            href="/gallery"
            className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-orange-100 to-rose-100 ring-1 ring-orange-200 transition-transform hover:scale-[1.02]"
          >
            <div className="text-center">
              <span className="block text-2xl font-bold text-orange-600 group-hover:text-orange-700">
                +{data.remaining}
              </span>
              <span className="mt-1 block text-xs font-medium text-orange-700/80">
                Tümünü gör
              </span>
            </div>
          </Link>
        )}
      </div>

      <MediaLightbox
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
