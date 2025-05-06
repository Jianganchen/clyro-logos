import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const formData = await req.formData();

  const prompt = formData.get("prompt") as string;
  const file = formData.get("file") as File;

  const user = await currentUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const response = await client.images.edit({
      model: "gpt-image-1",
      prompt: prompt,
      // n: 1,
      image: file,
      size: "1024x1024",
      background: "transparent",
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
