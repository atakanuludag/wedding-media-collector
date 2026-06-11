import { NextResponse } from "next/server";
import { uploadConfig } from "@/lib/config";
import {
  computePreviewSlice,
  mapObjectsToMediaItems,
} from "@/lib/media-api";
import { formatR2Error } from "@/lib/r2-errors";
import { createPresignedUploadUrl, listMediaObjects } from "@/lib/r2";
import {
  buildObjectKey,
  getMediaKind,
  validateUploadRequest,
} from "@/lib/upload-utils";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam
      ? Math.max(1, Number.parseInt(limitParam, 10))
      : undefined;

    const objects = await listMediaObjects();
    const total = objects.length;

    const { displayCount, remaining } =
      limit !== undefined && !Number.isNaN(limit)
        ? computePreviewSlice(total, limit)
        : { displayCount: total, remaining: 0 };

    const items = await mapObjectsToMediaItems(objects.slice(0, displayCount));

    return NextResponse.json({ items, total, remaining });
  } catch (error) {
    console.error("Failed to list media:", error);
    return NextResponse.json({ error: formatR2Error(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { filename, contentType, size } = body as {
      filename?: string;
      contentType?: string;
      size?: number;
    };

    if (!filename || !contentType || typeof size !== "number") {
      return NextResponse.json(
        { error: "Geçersiz yükleme isteği." },
        { status: 400 },
      );
    }

    const validationError = validateUploadRequest(contentType, size);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const kind = getMediaKind(contentType);
    if (!kind) {
      return NextResponse.json(
        { error: "Desteklenmeyen dosya türü." },
        { status: 400 },
      );
    }

    const key = buildObjectKey(filename);
    const uploadUrl = await createPresignedUploadUrl(
      key,
      contentType,
      uploadConfig.presignExpirySeconds,
    );

    return NextResponse.json({ uploadUrl, key, kind });
  } catch (error) {
    console.error("Failed to create presigned URL:", error);
    return NextResponse.json({ error: formatR2Error(error) }, { status: 500 });
  }
}
