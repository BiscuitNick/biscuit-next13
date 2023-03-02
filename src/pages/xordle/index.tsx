import Xordle from "@/components/Xordle";
import Keyboard from "@/components/Keyboard";
import useKeyboard from "@/components/Keyboard/useKeyboard";
import { getWordList } from "@/data/words";


const Page = ({answer, maxGuesses=6} : {answer:string; maxGuesses:number}) => {
  const {currentGuess, guesses, downChar, usedChars, inWordChars, correctChars, handleKeyInput, handleKeyDown, handleKeyUp, keyboardFocusRef, allowSpaces} = useKeyboard({answer});

      return (
        <div 
          className='fullscreen-wrapper' 
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
            // resetGame={resetGame}
          /> 
          < Keyboard 
            handleKeyPress={handleKeyInput}
            usedChars={usedChars}
            inWordChars={inWordChars}
            correctChars={correctChars}
            downChar={downChar}
            mode={allowSpaces ? 'QwertyWithSpacebar' : 'QwertyNoSpacebar'}
          />
        </div>
      )
}

export async function getServerSideProps({query}:any) {
    const wordLength = query.wordLength || 5;
    // const answer = query.answer || 'hello';
    const wordList = getWordList(wordLength);
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];

    console.log(randomWord);

  return {
    props: {query, answer:randomWord},
  }
}

export default Page