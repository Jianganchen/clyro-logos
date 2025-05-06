"use client";

import { Download, Trash2, Search, Ellipsis } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export function ImageGallery() {
  const { user } = useUser();
  const clerkUserId = user?.id;

  const galleryImages = useQuery(
    api.images.getUserImages,
    clerkUserId ? { clerkUserId } : "skip"
  );
  const deleteImageFromGallery = useMutation(api.images.deleteUserImage);

  const handleDeleteImageFromGallery = async (imageId: string) => {
    if (!clerkUserId) {
      console.error("User not found");
      return;
    }

    try {
      await deleteImageFromGallery({ imageId: imageId as Id<"images"> });
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="space-y-6">
      {galleryImages ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {galleryImages.map((image) => (
            <div
              key={image._id}
              className="group relative overflow-hidden rounded-lg border"
            >
              <div className="aspect-square">
                <img
                  src={image.imageUrl || "/placeholder.svg"}
                  alt={image.prompt}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 hover:bg-sidebar/80"
                      >
                        <Ellipsis className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center">
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center text-destructive focus:text-destructive"
                        onClick={() => handleDeleteImageFromGallery(image._id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div>
                  <p className="text-xs text-white/70">
                    {new Date(image.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm font-medium text-white">
                    {image.prompt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
          <div className="flex flex-col items-center gap-1 text-center">
            <Search className="h-10 w-10 text-muted-foreground" />
            <h3 className="font-medium">No images found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search query
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
