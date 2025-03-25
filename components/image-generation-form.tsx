"use client";

import type React from "react";

import { useState } from "react";
import { Wand2, Loader2, ImagePlus, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export function ImageGenerationForm() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // Simulate API call to generate images
    setTimeout(() => {
      // Generate random placeholder images
      const images = Array(4)
        .fill(0)
        .map(() => `/placeholder.svg?height=512&width=512`);

      setGeneratedImages(images);
      setIsGenerating(false);
    }, 2000);
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
            <div className="flex justify-between">
              <Label>Number of images</Label>
              <span className="text-sm text-muted-foreground">4</span>
            </div>
            <Slider defaultValue={[4]} min={1} max={8} step={1} />
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
                Generate Images
              </>
            )}
          </Button>
        </form>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Generated Images</h3>
        {isGenerating ? (
          <div className="grid grid-cols-2 gap-4">
            {Array(4)
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
