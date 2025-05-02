"use client";

import { ImageGallery } from "@/components/image-gallery";

export default function GalleryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
        <p className="text-muted-foreground">
          View and download your generated logos
        </p>
      </div>
      <ImageGallery />
    </div>
  );
}
