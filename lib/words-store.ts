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

export { useWordsStore }