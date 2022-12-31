const capitalizedWord = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
};

export const generateTitle = (title: string) => {
  let splitWords = title.split(' ');
  let capitalizedTitle = splitWords.map((word, idx) => {
    const ignoreList = ['and', 'of', ' the', 'a'];
    if (idx === 0) {
      return capitalizedWord(word);
    } else if (ignoreList.includes(word)) {
      return word;
    } else {
      return capitalizedWord(word);
    }
  });
  return capitalizedTitle.join(' ');
};
