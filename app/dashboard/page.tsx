"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageGenerationForm } from "@/components/image-generation-form";
import { ImageGallery } from "@/components/image-gallery";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Generate and manage your AI logo
          </p>
        </div>

        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="gallery">My Gallery</TabsTrigger>
          </TabsList>
          <TabsContent value="generate" className="mt-6">
            <ImageGenerationForm />
          </TabsContent>
          <TabsContent value="gallery" className="mt-6">
            <ImageGallery />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
