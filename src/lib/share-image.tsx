import { appConfig } from "@/lib/config";

export function ShareIconGraphic({ size }: { size: number }) {
  const center = size / 2;
  const outerR = size * 0.28;
  const innerR = size * 0.21;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} rx={size * 0.22} fill="#fff7ed" />
      <circle
        cx={center}
        cy={center + size * 0.06}
        r={outerR}
        stroke="#f97316"
        strokeWidth={size * 0.07}
        fill="none"
      />
      <circle
        cx={center}
        cy={center + size * 0.06}
        r={innerR}
        stroke="#fdba74"
        strokeWidth={size * 0.03}
        fill="none"
      />
      <path
        d={`M${center} ${center - size * 0.1}c-${size * 0.045}-${size * 0.075}-${size * 0.16}-${size * 0.065}-${size * 0.16} ${size * 0.035} 0 ${size * 0.1} ${size * 0.16} ${size * 0.18} ${size * 0.16} ${size * 0.18}s${size * 0.16}-${size * 0.08} ${size * 0.16}-${size * 0.18}c0-${size * 0.1}-${size * 0.115}-${size * 0.11}-${size * 0.16}-${size * 0.035}z`}
        fill="#fb7185"
      />
      <circle
        cx={center}
        cy={center + size * 0.06}
        r={size * 0.07}
        fill="#fbbf24"
      />
    </svg>
  );
}

export function OpenGraphImageContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #fff7ed 0%, #fef3c7 50%, #ffe4e6 100%)",
        padding: "48px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 160,
          height: 160,
          borderRadius: 40,
          background: "white",
          boxShadow: "0 20px 40px rgba(249, 115, 22, 0.15)",
          marginBottom: 40,
        }}
      >
        <ShareIconGraphic size={120} />
      </div>
      <div
        style={{
          fontSize: 56,
          fontWeight: 700,
          color: "#1c1917",
          textAlign: "center",
          lineHeight: 1.2,
          marginBottom: 20,
        }}
      >
        {appConfig.title}
      </div>
      <div
        style={{
          fontSize: 28,
          color: "#57534e",
          textAlign: "center",
          maxWidth: 900,
          lineHeight: 1.4,
        }}
      >
        {appConfig.description}
      </div>
    </div>
  );
}
