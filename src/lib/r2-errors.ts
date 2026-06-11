const R2_ACCESS_DENIED_MESSAGE =
  "R2 erişim izni reddedildi. Cloudflare panelinde yeni bir R2 API Token oluşturun: " +
  "R2 → Manage R2 API Tokens → Create API Token → " +
  "Permissions: 'Admin Read & Write' veya ilgili bucket için 'Object Read & Write'. " +
  "Oluşan Access Key ID ve Secret Access Key değerlerini .env.local dosyasına yapıştırın.";

export function formatR2Error(error: unknown): string {
  if (!error || typeof error !== "object") {
    return "Beklenmeyen bir hata oluştu.";
  }

  const name = "name" in error ? String(error.name) : "";
  const code = "Code" in error ? String(error.Code) : "";

  if (name === "AccessDenied" || code === "AccessDenied") {
    return R2_ACCESS_DENIED_MESSAGE;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Beklenmeyen bir hata oluştu.";
}
