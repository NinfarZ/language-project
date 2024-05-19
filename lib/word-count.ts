
const totalWordOccurance = (word: string, wordList: String[]) => {
   const occurences = wordList.filter((item) => item === word)
   return occurences.length
}

export {totalWordOccurance}