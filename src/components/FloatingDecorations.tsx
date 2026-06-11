import { Heart } from "lucide-react";

const decorations = [
  { kind: "heart" as const, left: "6%", top: "8%", size: 24, delay: "0s", duration: "9s" },
  { kind: "ring" as const, left: "88%", top: "12%", size: 28, delay: "1.5s", duration: "11s" },
  { kind: "heart" as const, left: "78%", top: "28%", size: 20, delay: "3s", duration: "8s" },
  { kind: "ring" as const, left: "12%", top: "35%", size: 22, delay: "0.8s", duration: "10s" },
  { kind: "heart" as const, left: "92%", top: "52%", size: 26, delay: "2.2s", duration: "12s" },
  { kind: "ring" as const, left: "4%", top: "58%", size: 30, delay: "4s", duration: "9s" },
  { kind: "heart" as const, left: "22%", top: "72%", size: 21, delay: "1s", duration: "10s" },
  { kind: "ring" as const, left: "68%", top: "78%", size: 24, delay: "2.8s", duration: "11s" },
  { kind: "heart" as const, left: "48%", top: "6%", size: 18, delay: "3.5s", duration: "8s" },
  { kind: "ring" as const, left: "38%", top: "88%", size: 26, delay: "0.5s", duration: "13s" },
  { kind: "heart" as const, left: "55%", top: "42%", size: 19, delay: "5s", duration: "9s" },
  { kind: "ring" as const, left: "82%", top: "68%", size: 20, delay: "1.8s", duration: "10s" },
];

function RingIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="text-orange-500 drop-shadow-sm"
    >
      <circle
        cx="12"
        cy="14"
        r="7"
        stroke="#f97316"
        strokeWidth="2"
      />
      <circle cx="12" cy="14" r="5" stroke="#fb923c" strokeWidth="1" opacity="0.7" />
      <path
        d="M12 6.5c-1-1.7-3.5-1.5-3.5.8 0 2.3 3.5 4.2 3.5 4.2s3.5-1.9 3.5-4.2c0-2.3-2.5-2.5-3.5-.8z"
        fill="#fb7185"
      />
      <circle cx="12" cy="14" r="1.8" fill="#fbbf24" />
    </svg>
  );
}

export function FloatingDecorations() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {decorations.map((item, index) => (
        <div
          key={index}
          className="floating-decoration absolute drop-shadow-sm"
          style={{
            left: item.left,
            top: item.top,
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        >
          {item.kind === "heart" ? (
            <Heart
              size={item.size}
              className="fill-rose-400/75 text-rose-500"
              strokeWidth={2}
            />
          ) : (
            <RingIcon size={item.size} />
          )}
        </div>
      ))}
    </div>
  );
}
