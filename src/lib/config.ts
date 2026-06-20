export const appConfig = {
  title: process.env.NEXT_PUBLIC_APP_TITLE ?? "Hande & Cengiz Nişan",
  themeColor: process.env.NEXT_PUBLIC_THEME_COLOR ?? "orange",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://wedding-media-collector.vercel.app",
  description:
    "Nişan günümüzün fotoğraf ve videolarını anında paylaşın. Giriş gerekmez.",
} as const;

export const uploadConfig = {
  maxPhotoSize: 25 * 1024 * 1024,
  maxVideoSize: 200 * 1024 * 1024,
  allowedImageTypes: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/heic",
    "image/heif",
  ],
  allowedVideoTypes: [
    "video/mp4",
    "video/quicktime",
    "video/webm",
    "video/x-msvideo",
  ],
  presignExpirySeconds: 3600,
} as const;

export const galleryConfig = {
  /** Ana sayfada gösterilecek maksimum hücre sayısı (fazlası +N ile) */
  homePreviewLimit: 12,
  /** Paylaşılan Anılar önizlemesi ve /gallery sayfası */
  showGallery: process.env.NEXT_PUBLIC_SHOW_GALLERY === "true",
} as const;
