'use client'

import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { handleTranslate } from "@/lib/handleTranslate";

export function TextareaWithButton() {
    const [value, setValue] = useState("");
    const [word, setWord] = useState("");
      function handleChange(e: any) {
          setValue(e.target.value);
      }

      function translate() {
        const word = handleTranslate(value)
        setWord(word)
      }

    return (
      <div className="grid max-w-lg gap-2 mx-auto">
        <Textarea onChange={handleChange} placeholder="Type your message here." />
        <Button onClick={translate}>Translate</Button>
        <p>{word}</p>
      </div>
    )
  }