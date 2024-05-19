"use client";

import { Button } from "./ui/button";
import { useEffect, useState, useMemo } from 'react';
import { cn } from "@/lib/utils";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import Deck from "../app/api/deck.json";
import { useWordsStore } from "@/lib/words-store";
import { totalWordOccurance } from "@/lib/word-count";

const SentenceCard = () => {
	const [showTranslation, setShowTranslation] = useState(false);
	const [number, setNumber] = useState(0);
	const [currentCard, setCurrentCard] = useState(Deck.sentences[number]);
	

	const { words, setWords } = useWordsStore((state) => ({
		words: state.words,
		setWords: state.setWords,
	}));

	const handleFlipCard = () => {
		
		setShowTranslation(true);
	};
	const handleUnderstood = () => {
		for(const word of currentCard.sentence) {
			
		
			if(!words.includes(word)) {
				console.log(word, "doesn't exist inside ", words)
				setWords(word)
				
				
				
			}
		}
		setNumber(number + 1);
		setShowTranslation(false);
		setCurrentCard(Deck.sentences[number])
	};

	const handleFailed = () => {
		setNumber(number + 1);
		setShowTranslation(false);
		setCurrentCard(Deck.sentences[number])
	};


	console.log("word list outside of for loop ", words)
	return (
		<div className="flex flex-col gap-8 items-center">
			{!showTranslation ? (
				<MapSentence sentence={currentCard.sentence} showTranslation={showTranslation} />
			) : (
				<MapSentence sentence={currentCard.translation} showTranslation={showTranslation}/>
			)}
			<Button
				onClick={handleFlipCard}
				className={cn({ ["hidden"]: showTranslation })}
			>
				Flip card
			</Button>
			<Button
				onClick={handleUnderstood}
				className={cn({
					["static"]: showTranslation,
					["hidden"]: !showTranslation,
				})}
			>
				I Understood this
			</Button>
			<Button
				onClick={handleFailed}
				className={cn({
					["static"]: showTranslation,
					["hidden"]: !showTranslation,
				})}
			>
				I didn't understand
			</Button>
		</div>
	);
};

const MapSentence = ({ sentence, showTranslation }) => {
	const { words, setWords } = useWordsStore((state) => ({
		words: state.words,
		setWords: state.setWords,
	}));

	const getWordColor = (word) => {
		const cleanWord = word.replace(/[^\w\s]|_/g, '').replace(/\s+/g, ''); // Remove punctuation and whitespace
		if (words.map(w => w.replace(/[^\w\s]|_/g, '').replace(/\s+/g, '')).includes(cleanWord)) {
			
			return "neutral-700";
		} else {
			
			return "primary";
		}
	};

	const handlePostWord = async (word) => {
		const cleanWord = word.replace(/[^\w\s]|_/g, '').replace(/\s+/g, ''); // Clean the word
		const newWord = {
		  text: cleanWord,
		  
		};
	
		try {
		  const response = await fetch('/api/words', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(newWord),
		  });
		  if (response.ok) {
			const result = await response.json();
			
			console.log(`Posted word: ${result.text}`);
		  } else {
			console.error('Failed to post word');
		  }
		} catch (error) {
		  console.error('Error posting word:', error);
		}
	};

	

	return (
		<div className="p-4 shadow-sm text-2xl rounded-md flex items-center transition-transform bg-white gap-2 flex-wrap md:text-4xl md:gap-4">
			{sentence.map((word, index) => (
				<button onClick={() => handlePostWord(word)} className={cn({[`text-${getWordColor(word)}`]: !showTranslation, ['text-6xl']: totalWordOccurance(word, words) >= 2})} key={index}>
					{word}
				</button>
						
					
			))}
		</div>
	);
};


export { SentenceCard };
