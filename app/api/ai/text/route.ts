import { OpenAIBackground } from "@/lib/definitions";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
  runtime: "edge",
};

export async function POST(req: Request) {
  const formData = await req.formData();

  const prompt = formData.get("prompt") as string;
  const background = formData.get("background") as OpenAIBackground;

  const user = await currentUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      // n: 1,
      size: "1024x1024",
      background: background,
      quality: "medium",
    });

    const output = response.data![0].b64_json;
    if (!output) {
      return NextResponse.json(
        { error: "No image generated" },
        { status: 500 }
      );
    }

    const dataUrl = `data:image/png;base64,${output}`;

    return NextResponse.json({ imageUrl: dataUrl });
  } catch (err) {
    console.error("OpenAI API error:", err);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
