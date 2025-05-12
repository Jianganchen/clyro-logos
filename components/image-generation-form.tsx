"use client";

import type React from "react";

import { useRef, useState } from "react";
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

import Canvas from "./canvas";
import { Switch } from "./ui/switch";

export function ImageGenerationForm() {
  const { user } = useUser();
  const clerkUserId = user?.id;

  const subtractTokens = useMutation(api.tokens.subtractUserTokens);
  const saveImageToGallery = useMutation(api.images.addUserImage);
  const generateUploadUrl = useMutation(api.images.generateUploadUrl);

  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [background, setBackground] = useState("transparent");
  const [useCanvas, setUseCanvas] = useState(true);

  const canvasRef = useRef<{ exportCanvas: () => Promise<string | undefined> }>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    if (!clerkUserId) {
      console.error("User not found");
      return;
    }

    setIsGenerating(true);

    try {
      const canvasDataUrl = await canvasRef.current?.exportCanvas();

      if (!canvasDataUrl) {
        console.error("Canvas image export failed.");
        setIsGenerating(false);
        return;
      }

      // convert the canvas url to blob
      const imageRes = await fetch(canvasDataUrl);
      const blob = await imageRes.blob();
      const file = new File([blob], "sketch.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("file", file);
      formData.append("background", background);

      let res;
      if (useCanvas) {
        res = await fetch("/api/ai/canvas", {
          method: "POST",
          body: formData,
        });
      } else if (!useCanvas) {
        res = await fetch("/api/ai/text", {
          method: "POST",
          body: formData,
        });
      } else {
        throw new Error("Invalid request");
      }

      const data = await res.json();

      if (!data.imageUrl) {
        console.error(data.error);
      }

      const imageBlob = await fetch(data.imageUrl).then((res) => res.blob());

      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": blob.type },
        body: imageBlob,
      });

      const json = await result.json();
      if (!result.ok) {
        throw new Error(
          `Upload image to storage failed: ${JSON.stringify(json)}`
        );
      }
      const { storageId } = json;

      await subtractTokens({ clerkUserId, amount: price });
      setGeneratedImage(data.imageUrl);
      await saveImageToGallery({
        clerkUserId,
        storageId: storageId,
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
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Canvas area */}
        <Card className="p-6">
          <div className="space-y-2 w-full h-full pb-5">
            <div className="flex items-center space-x-2">
              <Label htmlFor="use-canvas">Canvas</Label>
              <Switch
                id="use-canvas"
                checked={useCanvas}
                onCheckedChange={() => setUseCanvas((prev) => !prev)}
              />
            </div>
            <Canvas ref={canvasRef} canEdit={useCanvas} />
          </div>
        </Card>

        {/* output area */}

        <Card className="p-6">
          <div className="space-y-2 w-full h-full pb-5">
            <Label>Generated Image</Label>
            {isGenerating ? (
              <div className="aspect-square rounded-md bg-muted flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : generatedImage ? (
              <div className="group relative aspect-square rounded-md overflow-hidden max-h-[500px]">
                <img
                  src={generatedImage || "/placeholder.svg"}
                  alt={`Generated image`}
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
            ) : (
              <div className="flex h-full items-center justify-center rounded-md border border-dashed">
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
        </Card>
      </div>

      {/* form area */}
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

          <div className="flex justify-between items-center">
            <div className="flex flex-row gap-4">
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
                <Select defaultValue="GPT-image-1">
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DALL-E-2">DALL-E-2</SelectItem>
                    <SelectItem value="DALL-E-3">DALL-E-3</SelectItem>
                    <SelectItem value="GPT-image-1">GPT-image-1</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Background</Label>
                <Select
                  value={background}
                  onValueChange={(value) => setBackground(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select background" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transparent">transparent</SelectItem>
                    <SelectItem value="opaque">opaque</SelectItem>
                    <SelectItem value="auto">auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
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
                  <span>
                    Generate Logo {!useCanvas && "(text-prompt-only)"}
                  </span>
                  <span className="rounded-full bg-muted text-muted-foreground px-2 py-0.5 text-xs font-medium">
                    {price} tokens
                  </span>
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
