import { useState } from "react"
import { SentenceCard } from "./SentenceCard"
const SentenceDeck = () => {
    const [currentCard, setCurrentCard] = useState(0)
    const [isEditing, setIsEditing] = useState(false)

    return(
        <>
            {!isEditing && (
                <SentenceCard />
            )}
        
        </>

    )
}