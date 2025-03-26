import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a professional logo designer" },
        { role: "user", content: prompt },
      ],
    });

    const output = response.choices[0].message.content;

    return NextResponse.json({ output });
  } catch (err) {
    console.error("OpenAI API error:", err);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
