import { create } from "zustand";

type Store = {
	words: String[];
	setWords: (word: string) => void;
};

const useWordsStore = create<Store>()((set) => ({
	words: [],
	setWords: (word: string) =>
		set((state) => ({ words: [...state.words, word] })),
}));

const getWordsFromDB = async () => {
	const res = await fetch("/api/words", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
	return res.json()
}

export { useWordsStore, getWordsFromDB }