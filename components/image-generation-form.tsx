"use client";

import type React from "react";

import { useState } from "react";
import { Wand2, Loader2, ImagePlus, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageGenPrice as price } from "@/lib/data";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function ImageGenerationForm() {
  const { user } = useUser();
  const clerkUserId = user?.id;

  const subtractTokens = useMutation(api.tokens.subtractUserTokens);
  const saveImageToGallery = useMutation(api.images.addUserImage);

  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [imageCount, setImageCount] = useState<number>(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    if (!clerkUserId) {
      console.error("User not found");
      return;
    }

    setIsGenerating(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!data.imageUrl) {
        console.error(data.error);
      }

      await subtractTokens({ clerkUserId, amount: price });
      setGeneratedImages([data.imageUrl]);
      await saveImageToGallery({
        clerkUserId,
        imageUrl: data.imageUrl,
        prompt,
      });
      setIsGenerating(false);
    } catch (err) {
      console.error("Error generating logo or subtracting tokens", err);
      setIsGenerating(false);
    }
    setIsGenerating(false);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Describe the image you want to generate..."
              className="min-h-[120px] resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Style</Label>
            <Select defaultValue="realistic">
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realistic">Realistic</SelectItem>
                <SelectItem value="anime">Anime</SelectItem>
                <SelectItem value="3d">3D Render</SelectItem>
                <SelectItem value="cartoon">Cartoon</SelectItem>
                <SelectItem value="painting">Painting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Model</Label>
            <Select defaultValue="DALL-E-2">
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DALL-E-2">DALL-E-2</SelectItem>
                <SelectItem value="DALL-E-3">DALL-E-3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Number of Images</Label>
            <Select
              value={imageCount.toString()}
              onValueChange={(value) => setImageCount(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select number" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="8">8</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                <span>Generate Images</span>
                <span className="rounded-full bg-muted text-muted-foreground px-2 py-0.5 text-xs font-medium">
                  {price} tokens
                </span>
              </>
            )}
          </Button>
        </form>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Generated Images</h3>
        {isGenerating ? (
          <div className="grid grid-cols-2 gap-4">
            {Array(imageCount)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-md bg-muted flex items-center justify-center"
                >
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ))}
          </div>
        ) : generatedImages.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {generatedImages.map((src, i) => (
              <div
                key={i}
                className="group relative aspect-square rounded-md overflow-hidden"
              >
                <img
                  src={src || "/placeholder.svg"}
                  alt={`Generated image ${i + 1}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black/50 transition-opacity group-hover:opacity-100">
                  <Button variant="secondary" size="sm" className="mr-2">
                    <ImagePlus className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button variant="secondary" size="sm">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Vary
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
            <div className="flex flex-col items-center gap-1 text-center">
              <ImagePlus className="h-10 w-10 text-muted-foreground" />
              <h3 className="font-medium">No images generated yet</h3>
              <p className="text-sm text-muted-foreground">
                Enter a prompt and click generate to create images
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
