"use client";

import { Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { FloatingDecorations } from "@/components/FloatingDecorations";
import { MediaGallery } from "@/components/MediaGallery";
import { UploadZone } from "@/components/UploadZone";
import { appConfig, galleryConfig } from "@/lib/config";

export function HomePage() {
  const [galleryRefresh, setGalleryRefresh] = useState(0);
  const showGallery = galleryConfig.showGallery;

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50" />
      <FloatingDecorations />
      <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-32 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-lg flex-1 flex-col px-4 py-8 pb-[max(1rem,env(safe-area-inset-bottom))] sm:max-w-xl sm:px-6 sm:py-12">
        <header className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-medium text-orange-700 shadow-sm ring-1 ring-orange-100">
            <Sparkles className="h-3.5 w-3.5" />
            Nişan Anıları
          </div>

          <h1 className="font-serif text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            {appConfig.title}
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-stone-600 sm:text-base">
            Bu özel günün anılarını bizimle paylaşın. Fotoğraf ve videolarınızı
            anında yükleyebilirsiniz.
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 text-orange-500">
            <Heart className="h-4 w-4 fill-orange-400" />
            <span className="text-xs font-medium">Teşekkür ederiz!</span>
          </div>
        </header>

        <section className="mb-10">
          <UploadZone
            onUploadComplete={
              showGallery
                ? () => setGalleryRefresh((current) => current + 1)
                : undefined
            }
          />
        </section>

        {showGallery && (
          <section>
            <MediaGallery refreshToken={galleryRefresh} />
          </section>
        )}

        <footer className="mt-auto pt-12 text-center text-xs text-stone-400">
          Created by Atakan ULUDAĞ · {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}
