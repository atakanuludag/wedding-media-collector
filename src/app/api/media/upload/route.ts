import { PutObjectCommand } from "@aws-sdk/client-s3";
import convert from "heic-convert";
import { Readable } from "node:stream";
import { NextResponse } from "next/server";
import { formatR2Error } from "@/lib/r2-errors";
import { getBucketName, getR2Client } from "@/lib/r2";
import {
  buildObjectKey,
  getMediaKind,
  isHeicUpload,
  toJpegFilename,
  validateUploadRequest,
} from "@/lib/upload-utils";

export const runtime = "nodejs";
export const maxDuration = 300;

function resolveContentType(contentType: string, filename: string): string {
  if (contentType) return contentType;
  if (isHeicUpload("", filename)) return "image/heic";
  return contentType;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
    }

    const contentType = resolveContentType(file.type, file.name);

    const validationError = validateUploadRequest(contentType, file.size);
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

    if (kind === "image" && isHeicUpload(contentType, file.name)) {
      const inputBuffer = Buffer.from(await file.arrayBuffer());
      const jpegBuffer = Buffer.from(
        await convert({
          buffer: inputBuffer,
          format: "JPEG",
          quality: 1,
        }),
      );
      const key = buildObjectKey(toJpegFilename(file.name));

      await getR2Client().send(
        new PutObjectCommand({
          Bucket: getBucketName(),
          Key: key,
          Body: jpegBuffer,
          ContentType: "image/jpeg",
          ContentLength: jpegBuffer.length,
        }),
      );

      return NextResponse.json({ key, kind });
    }

    const key = buildObjectKey(file.name);

    await getR2Client().send(
      new PutObjectCommand({
        Bucket: getBucketName(),
        Key: key,
        Body: Readable.fromWeb(
          file.stream() as Parameters<typeof Readable.fromWeb>[0],
        ),
        ContentType: contentType,
        ContentLength: file.size,
      }),
    );

    return NextResponse.json({ key, kind });
  } catch (error) {
    console.error("Failed to upload media:", error);
    return NextResponse.json({ error: formatR2Error(error) }, { status: 500 });
  }
}
