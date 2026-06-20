import { redirect } from "next/navigation";
import { GalleryPage } from "@/components/GalleryPage";
import { galleryConfig } from "@/lib/config";

export default function Gallery() {
  if (!galleryConfig.showGallery) {
    redirect("/");
  }

  return <GalleryPage />;
}
