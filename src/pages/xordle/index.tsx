import Xordle from "@/components/Xordle";
import Keyboard from "@/components/Keyboard";
import useKeyboard from "@/components/Keyboard/useKeyboard";
import { getWordList } from "@/data/words";


const Page = ({
  answer,
  maxGuesses = 7,
}: {
  answer: string;
  maxGuesses: number;
}) => {
  const {
    currentGuess,
    guesses,
    downChar,
    usedChars,
    inWordChars,
    correctChars,
    handleKeyInput,
    handleKeyDown,
    handleKeyUp,
    keyboardFocusRef,
    allowSpaces,
    resetGame,
  } = useKeyboard({ answer });

  return (
    <div
      className="fullscreen-wrapper"
      ref={keyboardFocusRef}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      tabIndex={0}
    >
      <Xordle
        maxGuesses={maxGuesses}
        answer={answer}
        currentGuess={currentGuess}
        guesses={guesses}
        resetGame={resetGame}
      />
      <Keyboard
        handleKeyPress={handleKeyInput}
        usedChars={usedChars}
        inWordChars={inWordChars}
        correctChars={correctChars}
        downChar={downChar}
        mode={allowSpaces ? "QwertyWithSpacebar" : "QwertyNoSpacebar"}
      />
    </div>
  );
};

export async function getServerSideProps({ query }: any) {
  const word = query.word || ''; 
  const wordLength = Number(query.wordLength) || word.length || 5;
  const wordList = getWordList(wordLength>2 && wordLength<10 ? wordLength : 5);
  const randomWord = word.length>2 && word.length<10 ? word.toLowerCase() : wordList[Math.floor(Math.random() * wordList.length)];

  console.log(randomWord);

  return {
    props: { query, answer: randomWord },
  };
}

export default Page;
