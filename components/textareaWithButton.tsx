'use client'

import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { handleTranslate } from "@/lib/handleTranslate";

export function TextareaWithButton() {
    const [value, setValue] = useState("");
      function handleChange(e: any) {
          setValue(e.target.value);
      }

    return (
      <div className="grid max-w-lg gap-2 mx-auto">
        <Textarea onChange={handleChange} placeholder="Type your message here." />
        <Button>Translate</Button>
        
      </div>
    )
  }