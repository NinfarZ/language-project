import { translateWord } from "@/api/api"
export async function handleTranslate(value: string) {
    const wordData = await translateWord('en-US', value)
    console.log(wordData)
    return wordData
}