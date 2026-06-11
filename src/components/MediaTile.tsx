import { Film } from "lucide-react";
import { formatMediaDate } from "@/lib/media-api";
import type { MediaItem } from "@/types/upload";

interface MediaTileProps {
  item: MediaItem;
  className?: string;
  aspectSquare?: boolean;
  showDate?: boolean;
  onClick?: () => void;
}

export function MediaTile({
  item,
  className = "",
  aspectSquare = true,
  showDate = false,
  onClick,
}: MediaTileProps) {
  const formattedDate = formatMediaDate(item.lastModified);
  const isInteractive = Boolean(onClick);

  const mediaContent = (
    <>
      {item.kind === "video" ? (
        <>
          <video
            src={item.url}
            className={`w-full object-cover ${aspectSquare ? "h-full" : "h-auto"}`}
            muted
            playsInline
            preload="metadata"
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md">
              <Film className="h-5 w-5 text-orange-600" />
            </div>
          </div>
        </>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.url}
          alt="Paylaşılan fotoğraf"
          className={`w-full object-cover transition-transform ${
            isInteractive ? "group-hover:scale-[1.02]" : ""
          } ${aspectSquare ? "h-full" : "h-auto"}`}
          loading="lazy"
        />
      )}
    </>
  );

  const tileClassName = `group relative overflow-hidden rounded-xl bg-stone-100 ring-1 ring-orange-100 ${
    aspectSquare ? "aspect-square" : ""
  } ${isInteractive ? "cursor-pointer" : ""}`;

  return (
    <div className={className}>
      {isInteractive ? (
        <button
          type="button"
          onClick={onClick}
          className={`block w-full text-left ${tileClassName}`}
        >
          {mediaContent}
        </button>
      ) : (
        <div className={tileClassName}>{mediaContent}</div>
      )}

      {showDate && formattedDate && (
        <p className="mt-2 text-xs text-stone-500">{formattedDate}</p>
      )}
    </div>
  );
}
