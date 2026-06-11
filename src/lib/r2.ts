import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

function validateAccountId(accountId: string): void {
  if (accountId.startsWith("cfat_") || accountId.startsWith("v1.0-")) {
    throw new Error(
      "CLOUDFLARE_R2_ACCOUNT_ID geçersiz görünüyor. 'cfat_' ile başlayan bir API token değil, " +
        "Cloudflare panelindeki 32 karakterlik Account ID kullanılmalı. " +
        "R2 → Overview sayfasından veya dashboard URL'sinden (dash.cloudflare.com/<ACCOUNT_ID>/...) alabilirsiniz.",
    );
  }
}

function buildR2Endpoint(accountId: string, region?: string): string {
  const normalized = region?.toLowerCase();

  if (
    normalized === "ee" ||
    normalized === "eu" ||
    normalized === "weur" ||
    normalized === "eeur"
  ) {
    return `https://${accountId}.eu.r2.cloudflarestorage.com`;
  }

  return `https://${accountId}.r2.cloudflarestorage.com`;
}

function getR2Config() {
  const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;
  const endpointOverride = process.env.CLOUDFLARE_R2_ENDPOINT;
  const region = process.env.CLOUDFLARE_R2_REGION;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
    throw new Error("Missing Cloudflare R2 environment variables");
  }

  validateAccountId(accountId);

  const endpoint =
    endpointOverride ?? buildR2Endpoint(accountId, region);

  return { accessKeyId, secretAccessKey, bucketName, endpoint };
}

let client: S3Client | null = null;

export function getR2Client() {
  if (client) return client;

  const { accessKeyId, secretAccessKey, endpoint } = getR2Config();

  client = new S3Client({
    region: "auto",
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    forcePathStyle: false,
  });

  return client;
}

export function getBucketName() {
  return getR2Config().bucketName;
}

export async function createPresignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn: number,
) {
  const command = new PutObjectCommand({
    Bucket: getBucketName(),
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(getR2Client(), command, { expiresIn });
}

export async function createPresignedDownloadUrl(
  key: string,
  expiresIn: number,
) {
  const command = new GetObjectCommand({
    Bucket: getBucketName(),
    Key: key,
  });

  return getSignedUrl(getR2Client(), command, { expiresIn });
}

export async function listMediaObjects(prefix = "") {
  const response = await getR2Client().send(
    new ListObjectsV2Command({
      Bucket: getBucketName(),
      Prefix: prefix,
    }),
  );

  return (response.Contents ?? [])
    .filter(
      (item) =>
        item.Key &&
        !item.Key.endsWith("/") &&
        item.Size &&
        item.Size > 0,
    )
    .sort(
      (a, b) =>
        (b.LastModified?.getTime() ?? 0) - (a.LastModified?.getTime() ?? 0),
    );
}
