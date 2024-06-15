"use client";

import { Button } from "./ui/button";
import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import Deck from "../app/api/deck.json";
import { useWordsStore } from "@/lib/words-store";
import { totalWordOccurance } from "@/lib/word-count";
import { TickIcon } from "./icons/tick-icon";
import { CrossIcon } from "./icons/cross-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getWordsFromDB } from "@/lib/words-store";

const SentenceCard = () => {
	
	const [number, setNumber] = useState(0);
	const [currentCard, setCurrentCard] = useState(Deck.sentences[number]);
	const [isEditing, setIsEditing] = useState(false)

	const { words, setWords } = useWordsStore((state) => ({
		words: state.words,
		setWords: state.setWords,
	}));

	
	const handleUnderstood = () => {
		for (const word of currentCard.sentence) {
			if (!words.includes(word)) {
				console.log(word, "doesn't exist inside ", words);
				setWords(word);
			}
		}
		setNumber(number + 1);
		
		setCurrentCard(Deck.sentences[number]);
	};

	const handleFailed = () => {
		
		setIsEditing(true)
		
	};

	console.log("word list outside of for loop ", words);
	return (
		<div className="flex flex-col items-center gap-8">
		{!isEditing ? (
			<DisplayCard currentCard={currentCard}/>
		) : <MarkCard currentCard={currentCard}/>}
		
		
		
		<div className="flex gap-8 text-3xl">
		<button
			onClick={handleUnderstood}
			className={cn({
				
			},"p-4 rounded-md shadow-md shadow-neutral-100")}
		>
			<div className="  hover:scale-110 transition-transform text-neutral-700 flex items-center gap-4">
				<div className="w-8 h-8">
				<TickIcon stroke={"stroke-neutral-700"}/>
				</div>
				<p className="text-lg">Easy</p>
			</div>
		</button>
		<button
			onClick={handleFailed}
			className={cn({
				
			},"p-4 rounded-md shadow-primary-foreground shadow-md")}
		>
			<div className="  hover:scale-110 transition-transform text-primary flex items-center gap-4">
				<div className="w-8 h-8">
				<CrossIcon stroke={"stroke-primary"}/>
				</div>
			 
				<p className="text-lg">Hard</p>
			</div>
		</button>

		</div>
		
		</div>
	);
};

const DisplayCard = ({currentCard}) => {
	return(
		<Tabs defaultValue="sentence" className="w-[800px] flex flex-col items-center gap-2">
			<TabsList>
				<TabsTrigger value="sentence">Sentence</TabsTrigger>
				<TabsTrigger value="translation">Translation</TabsTrigger>
			</TabsList>
			<TabsContent value="sentence">
				<MapSentence
					sentence={currentCard.sentence}
					
				/>
			</TabsContent>
			<TabsContent value="translation">
				<MapSentence
					sentence={currentCard.translation}
					
				/>
			</TabsContent>
		</Tabs>
	)
}

const MarkCard = ({currentCard}) => {
	return(
		<MapSentence sentence={currentCard.sentence}/>
	)

}

const MapSentence = ({ sentence }) => {

	const [markedWords, setMarkedWords] = useState([]);

	const getWordColor = (word) => {
		const cleanWord = word.replace(/[^\w\s]|_/g, "").replace(/\s+/g, ""); // Remove punctuation and whitespace
		if (markedWords.includes(cleanWord)) {
			return "primary";
		} else {
			return "neutral-700";
		}
	};

	const handlePostWord = async (word) => {
		const cleanWord = word.replace(/[^\w\s]|_/g, "").replace(/\s+/g, "");
		if (!markedWords.includes(cleanWord)) {
			setMarkedWords([...markedWords, cleanWord]);
		}

		const newWord = {
			text: cleanWord,
		};

		const wordListData = await getWordsFromDB()
		console.log(wordListData)
		if(wordListData.filter((word) => word.text === cleanWord).length === 1) return


		try {
			const response = await fetch("/api/words", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newWord),
			});
			if (response.ok) {
				const result = await response.json();

				console.log(`Posted word: ${result.text}`);
			} else {
				console.error("Failed to post word");
			}
		} catch (error) {
			console.error("Error posting word:", error);
		}
	};

	return (
		<div className="p-4 shadow-sm text-2xl rounded-md flex items-center transition-transform bg-white gap-2 flex-wrap md:text-4xl md:gap-4">
			{sentence.map((word, index) => (
				<button
					onClick={() => handlePostWord(word)}
					className={cn(`text-${getWordColor(word)}`)}
					key={index}
				>
					{word}
				</button>
			))}
		</div>
	);
};

export { SentenceCard };
