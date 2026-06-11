import { ImageResponse } from "next/og";
import { ShareIconGraphic } from "@/lib/share-image";

export const runtime = "edge";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<ShareIconGraphic size={32} />, size);
}
