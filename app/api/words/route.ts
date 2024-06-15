import { words } from "@/words/data";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(words)
}

export async function POST(request: Request) {
  const data = await request.json()
  const newWord = {
    id: (words.length - 1) + 1,
    text: data.text,
    occurances: 1

  }
  words.push(newWord)
  return new Response(JSON.stringify(newWord), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  })
}


