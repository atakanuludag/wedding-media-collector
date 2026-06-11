<p align="center">
  <img src="public/logo.svg" alt="Wedding Media Collector" width="120" height="120" />
</p>

<h1 align="center">Wedding Media Collector</h1>

<p align="center">
  Düğün, nişan ve özel günlerinizde misafirlerin fotoğraf ve videolarını anında toplayın.<br/>
  Collect photos and videos from your guests instantly at weddings, engagements, and special events.
</p>

<p align="center">
  <a href="https://wedding-media-collector.vercel.app">Demo</a> ·
  <a href="#türkçe">🇹🇷 Türkçe</a> ·
  <a href="#english">🇬🇧 English</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Cloudflare_R2-F38020?logo=cloudflare&logoColor=white" alt="Cloudflare R2" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License" />
</p>

---

## Türkçe

Misafirlerinizin telefonundan çektiği anıları tek bir sayfada toplayın. Kayıt, giriş veya uygulama indirme gerekmez — QR kodu veya link paylaşmanız yeterli.

### Özellikler

- **Giriş gerektirmez** — Misafirler doğrudan fotoğraf ve video yükleyebilir
- **Mobil uyumlu arayüz** — Sürükle-bırak, dokunmatik yükleme ve kamera desteği
- **iPhone HEIC desteği** — Yükleme sırasında HEIC/HEIF otomatik JPEG'e dönüştürülür; galeri tüm tarayıcılarda çalışır
- **Fotoğraf & video** — JPEG, PNG, WebP, HEIC, MP4, MOV, WebM ve daha fazlası
- **Canlı galeri** — Ana sayfada önizleme, tam liste için ayrı galeri sayfası
- **Lightbox** — Fotoğraf ve videoları tam ekran görüntüleme
- **Cloudflare R2 depolama** — S3 uyumlu, ölçeklenebilir ve uygun maliyetli
- **WhatsApp paylaşımı** — Open Graph görselleri ve site ikonu ile düzgün link önizlemesi

### Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev), [Tailwind CSS 4](https://tailwindcss.com) |
| Dil | [TypeScript](https://www.typescriptlang.org) |
| Depolama | [Cloudflare R2](https://developers.cloudflare.com/r2/) (S3 API) |
| SDK | [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/) |
| Görüntü işleme | [heic-convert](https://www.npmjs.com/package/heic-convert) |
| İkonlar | [Lucide React](https://lucide.dev) |
| Dağıtım | [Vercel](https://vercel.com) (önerilen) |

### Proje Yapısı

```
wedding-media-collector/
├── public/
│   └── logo.svg              # Proje logosu
├── src/
│   ├── app/
│   │   ├── api/media/        # Medya listeleme & yükleme API'leri
│   │   ├── gallery/          # Tüm anılar sayfası
│   │   ├── icon.tsx          # Favicon (PNG)
│   │   ├── opengraph-image.tsx
│   │   └── page.tsx          # Ana sayfa
│   ├── components/           # UI bileşenleri
│   └── lib/                  # R2, yapılandırma, yardımcılar
├── r2-cors.json              # R2 CORS şablonu
└── .env.example
```

### Gereksinimler

- **Node.js** 20+
- **pnpm** 9+ (önerilen)
- **Cloudflare** hesabı ve R2 bucket

### Kurulum

**1. Repoyu klonlayın**

```bash
git clone https://github.com/atakanuludag/wedding-media-collector.git
cd wedding-media-collector
```

**2. Bağımlılıkları yükleyin**

```bash
pnpm install
```

**3. Ortam değişkenlerini ayarlayın**

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:

| Değişken | Açıklama |
|----------|----------|
| `NEXT_PUBLIC_APP_TITLE` | Sayfa başlığı (ör. `Ayşe & Mehmet Nişan`) |
| `NEXT_PUBLIC_SITE_URL` | Canlı site URL'si (Open Graph için) |
| `NEXT_PUBLIC_THEME_COLOR` | Tema rengi (`orange`) |
| `CLOUDFLARE_R2_ACCOUNT_ID` | 32 karakterlik Account ID (`cfat_` ile başlamaz) |
| `CLOUDFLARE_R2_ACCESS_KEY_ID` | R2 API token access key |
| `CLOUDFLARE_R2_SECRET_ACCESS_KEY` | R2 API token secret key |
| `CLOUDFLARE_R2_BUCKET_NAME` | Bucket adı |
| `CLOUDFLARE_R2_REGION` | Opsiyonel: EU bucket için `ee` |

**4. Cloudflare R2 bucket oluşturun**

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **R2** → **Create bucket**
2. **Manage R2 API Tokens** → **Create API Token** → Object Read & Write izni verin
3. Account ID'yi R2 Overview sayfasından alın

**5. Geliştirme sunucusunu başlatın**

```bash
pnpm dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

### Vercel'e Deploy

1. Repoyu GitHub'a push edin
2. [Vercel](https://vercel.com/new) üzerinden projeyi import edin
3. `.env.example` dosyasındaki tüm ortam değişkenlerini Vercel **Environment Variables** bölümüne ekleyin
4. Deploy edin

> **Not:** Video yüklemeleri için `next.config.ts` içinde `proxyClientMaxBodySize: 250MB` ayarı mevcuttur.

### Yükleme Limitleri

| Tür | Maks. boyut |
|-----|-------------|
| Fotoğraf | 25 MB |
| Video | 200 MB |

### Komutlar

```bash
pnpm dev      # Geliştirme sunucusu
pnpm build    # Production build
pnpm start    # Production sunucusu
pnpm lint     # ESLint
```

### Özelleştirme

- **Başlık & URL:** `NEXT_PUBLIC_APP_TITLE`, `NEXT_PUBLIC_SITE_URL`
- **Ana sayfa önizleme sayısı:** `src/lib/config.ts` → `galleryConfig.homePreviewLimit`
- **Yükleme limitleri:** `src/lib/config.ts` → `uploadConfig`

### Lisans

MIT — Atakan ULUDAĞ

---

## English

Collect memories from your guests' phones in one place. No sign-up, login, or app download required — just share a QR code or link.

### Features

- **No authentication** — Guests upload photos and videos directly
- **Mobile-first UI** — Drag-and-drop, touch upload, and camera capture
- **iPhone HEIC support** — HEIC/HEIF files are converted to JPEG on upload; gallery works in all browsers
- **Photos & videos** — JPEG, PNG, WebP, HEIC, MP4, MOV, WebM, and more
- **Live gallery** — Home page preview with a dedicated full gallery page
- **Lightbox** — Full-screen photo and video viewer
- **Cloudflare R2 storage** — S3-compatible, scalable, and cost-effective
- **WhatsApp sharing** — Open Graph images and site icons for rich link previews

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev), [Tailwind CSS 4](https://tailwindcss.com) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| Storage | [Cloudflare R2](https://developers.cloudflare.com/r2/) (S3 API) |
| SDK | [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/) |
| Image processing | [heic-convert](https://www.npmjs.com/package/heic-convert) |
| Icons | [Lucide React](https://lucide.dev) |
| Deployment | [Vercel](https://vercel.com) (recommended) |

### Project Structure

```
wedding-media-collector/
├── public/
│   └── logo.svg              # Project logo
├── src/
│   ├── app/
│   │   ├── api/media/        # Media listing & upload APIs
│   │   ├── gallery/          # Full gallery page
│   │   ├── icon.tsx          # Favicon (PNG)
│   │   ├── opengraph-image.tsx
│   │   └── page.tsx          # Home page
│   ├── components/           # UI components
│   └── lib/                  # R2, config, utilities
├── r2-cors.json              # R2 CORS template
└── .env.example
```

### Prerequisites

- **Node.js** 20+
- **pnpm** 9+ (recommended)
- **Cloudflare** account with an R2 bucket

### Setup

**1. Clone the repository**

```bash
git clone https://github.com/atakanuludag/wedding-media-collector.git
cd wedding-media-collector
```

**2. Install dependencies**

```bash
pnpm install
```

**3. Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env`:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_TITLE` | Page title (e.g. `Jane & John Wedding`) |
| `NEXT_PUBLIC_SITE_URL` | Production URL (for Open Graph) |
| `NEXT_PUBLIC_THEME_COLOR` | Theme color (`orange`) |
| `CLOUDFLARE_R2_ACCOUNT_ID` | 32-character Account ID (does not start with `cfat_`) |
| `CLOUDFLARE_R2_ACCESS_KEY_ID` | R2 API token access key |
| `CLOUDFLARE_R2_SECRET_ACCESS_KEY` | R2 API token secret key |
| `CLOUDFLARE_R2_BUCKET_NAME` | Bucket name |
| `CLOUDFLARE_R2_REGION` | Optional: `ee` for EU buckets |

**4. Create a Cloudflare R2 bucket**

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **R2** → **Create bucket**
2. **Manage R2 API Tokens** → **Create API Token** → grant Object Read & Write
3. Copy your Account ID from the R2 Overview page

**5. Start the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Deploy to Vercel

1. Push the repo to GitHub
2. Import the project on [Vercel](https://vercel.com/new)
3. Add all environment variables from `.env.example` under **Environment Variables**
4. Deploy

> **Note:** `next.config.ts` sets `proxyClientMaxBodySize: 250MB` to support video uploads.

### Upload Limits

| Type | Max size |
|------|----------|
| Photo | 25 MB |
| Video | 200 MB |

### Scripts

```bash
pnpm dev      # Development server
pnpm build    # Production build
pnpm start    # Production server
pnpm lint     # ESLint
```

### Customization

- **Title & URL:** `NEXT_PUBLIC_APP_TITLE`, `NEXT_PUBLIC_SITE_URL`
- **Home preview count:** `src/lib/config.ts` → `galleryConfig.homePreviewLimit`
- **Upload limits:** `src/lib/config.ts` → `uploadConfig`

### License

MIT — Atakan ULUDAĞ
