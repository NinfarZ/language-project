import { words } from "@/words/data";
import { NextResponse } from "next/server";


export async function PATCH(request: Request, { params }: { params: { word: string } }) {
    const index = words.findIndex((word) => word.text.toLocaleLowerCase() === params.word.toLocaleLowerCase());
    
    // Check if the word is found
    if (index !== -1) {
        words[index].occurances += 1;
        return NextResponse.json(words[index]);
    } else {
        // Return a 404 response if the word is not found
        return NextResponse.json({ error: "Word not found" }, { status: 404 });
    }
}
  