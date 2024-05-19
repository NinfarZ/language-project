"use client";

import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { create } from "zustand";
import Deck from "../api/deck.json";

type Store = {
	words: String[];
	setWords: (word: string) => void;
};

const useStore = create<Store>()((set) => ({
	words: [],
	setWords: (word: string) =>
		set((state) => ({ words: [...state.words, word] })),
}));

const SentenceCard = () => {
	const [showTranslation, setShowTranslation] = useState(false);
	const sentences = Deck.sentences;
	const [number, setNumber] = useState(0);

	const splitedSentence = sentences[number].sentence.split(" ");
	const splitedTranslation = sentences[number].translation.split(" ");

	const handleFlipCard = () => {
		setShowTranslation(true);
	};
	const handleIncreaseNumber = () => {
		setNumber(number + 1);
		setShowTranslation(false);
	};
	return (
		<div className="flex flex-col gap-8 items-center">
			{!showTranslation ? (
				<MapSentence sentence={splitedSentence} />
			) : (
				<MapSentence sentence={splitedTranslation} />
			)}
			<Button
				onClick={handleFlipCard}
				className={cn({ ["hidden"]: showTranslation })}
			>
				Flip card
			</Button>
			<Button
				onClick={handleIncreaseNumber}
				className={cn({
					["static"]: showTranslation,
					["hidden"]: !showTranslation,
				})}
			>
				Next
			</Button>
		</div>
	);
};

const MapSentence = ({ sentence }) => {
	const { words, setWords } = useStore();
	let knownWords = [];
	return (
		<div className="p-4 shadow-sm text-2xl rounded-md flex items-center transition-transform bg-white gap-2 flex-wrap md:text-4xl md:gap-4">
			{sentence.map((word: string, index: number) => {
				let wordColor = "neutral-700"
				console.log("current word is", word)
				console.log("current word list is", words)
				if (!(words.includes(word))) {
					setWords(word);
				
				} else {
					knownWords.push(word);
					wordColor = "primary"
				}
				return (
					<HoverCard key={index}>
						<HoverCardTrigger
							className={cn({ [`text-${wordColor}`]: true })}
						>
							{word}
						</HoverCardTrigger>
						<HoverCardContent className="text-sm">School</HoverCardContent>
					</HoverCard>
				);
			})}
		</div>
	);
};

export { SentenceCard };
