"use client";

import { ImageGenerationForm } from "@/components/image-generation-form";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Generate and manage your AI logo
        </p>
      </div>
      <ImageGenerationForm />
    </div>
  );
}
