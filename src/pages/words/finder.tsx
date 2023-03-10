import WordFinder from "@/components/Xordle/word-finder";
import Keyboard from "@/components/Keyboard";
import { useFinderKeyboard } from "@/components/Keyboard/useFinderKeyboard";
import { getWordList } from "@/data/words";

import { useEffect, useMemo, useState } from "react";

const getPossibleWords = (
  wordList: string[],
  charMap: {
    matchStr: string;
    inWordStr: string;
    missStr: string;
    inWordWrongIndexes: any;
  }
) => {
  const { matchStr, inWordStr, missStr, inWordWrongIndexes } = charMap;
  const missChars = missStr.split("");
  const inWordChars = inWordStr.split("").filter((c) => c !== "-");

  const words = wordList.filter((word) => {
    const chars = word.split("");

    const hasMissChars = chars.some((char: string) => missChars.includes(char));
    if (hasMissChars) return false;

    const hasInWordChars = inWordChars.every((char: string) =>
      chars.includes(char)
    );
    if (!hasInWordChars) return false;

    const hasMatchChars = chars.every((char: string, i: number) => {
      let matchChar = matchStr[i];
      return matchChar === "-" || matchChar === char;
    });
    if (!hasMatchChars) return false;

    const hasWrongIndexChars = Object.keys(inWordWrongIndexes).some(
      (char: string) => {
        const indexes = inWordWrongIndexes[char];
        return indexes.some((index: number) => chars[index] === char);
      }
    );
    if (hasWrongIndexChars) return false;

    return true;
  });
  return words;
};

const Page = ({
  answer,
  maxGuesses = 7,
  wordList,
  wordLength,
}: {
  answer: string;
  maxGuesses: number;
  wordList: string[];
  wordLength: number;
}) => {
  const [matchStr, setMatchStr] = useState<string>("-".repeat(wordLength));
  const [inWordStr, setInWordStr] = useState<string>("");
  const [missStr, setMissStr] = useState<string>("");
  const [inWordWrongIndexes, setInWordWrongIndexes] = useState<any>({});
  const {
    currentGuess,
    guesses,
    downChar,
    handleKeyInput,
    handleKeyDown,
    handleKeyUp,
    keyboardFocusRef,
    allowSpaces,
    // resetGame,
  } = useFinderKeyboard({ answer, validateWordExists: false });

  const possibleWords = useMemo(
    () =>
      getPossibleWords(wordList, {
        matchStr,
        inWordStr,
        missStr,
        inWordWrongIndexes,
      }),
    [matchStr, missStr, inWordStr, inWordWrongIndexes]
  );
  const [charsMatrix, updateCharsMatrix] = useState<any[]>(
    Array(matchStr.length).fill({})
  );

  const handleClick = (letter: string, index: number) => {
    const charContext = charsMatrix[index];
    const charCount = ((charContext[letter] || 0) + 1) % 4;
    updateCharsMatrix({
      ...charsMatrix,
      [index]: { ...charContext, [letter]: charCount },
    });
  };

  useEffect(() => {
    let missChars: string[] = [];
    let inWordChars: string[] = [];
    let matchChars = Array(wordLength).fill("-");
    let inWordCharIndexes: any = {};

    for (let i = 0; i < Object.keys(charsMatrix).length; i++) {
      const chars = charsMatrix[i];
      Object.keys(chars).forEach((char) => {
        const count = chars[char];
        // Null Case, Remove from MissStr, InWordStr, and MatchStr
        if (count === 0) {
          missChars = missChars.filter((c) => c !== char);
          inWordChars = inWordChars.includes(char)
            ? inWordChars.filter((x) => x !== char)
            : inWordChars;
          matchChars[i] = matchChars[i] === char ? "-" : matchChars[i];
          inWordCharIndexes[char] = inWordCharIndexes[char]
            ? inWordCharIndexes[char].filter((x: number) => x !== i)
            : [];
        }
        // Miss Char, Add to MissStr, Remove from InWordStr, and MatchStr
        else if (count === 1) {
          missChars = [...missChars, char];
          inWordChars = inWordChars.includes(char)
            ? inWordChars.filter((x) => x !== char)
            : inWordChars;
          matchChars[i] = matchChars[i] === char ? "-" : matchChars[i];
          inWordCharIndexes[char] = [];
        }
        // In Word Char, Add to InWordStr, Remove from MissStr, and MatchStr
        else if (count === 2) {
          missChars = missChars.filter((c) => c !== char);
          inWordChars = [...inWordChars, char];
          matchChars[i] = matchChars[i] === char ? "-" : matchChars[i];
          inWordCharIndexes[char] = inWordCharIndexes[char]
            ? [...inWordCharIndexes[char], i]
            : [i];
        } else if (count === 3) {
          missChars = missChars.filter((c) => c !== char);
          // inWordChars[i] = '-';
          matchChars[i] = char;
          inWordCharIndexes[char] = inWordCharIndexes[char]
            ? inWordCharIndexes[char].filter((x: number) => x !== i)
            : [];
        }
      });
    }

    setMissStr(missChars.join(""));
    setInWordStr(inWordChars.join(""));
    setMatchStr(matchChars.join(""));
    setInWordWrongIndexes(inWordCharIndexes);
  }, [charsMatrix]);

  useEffect(() => {
    console.log(possibleWords);
  }, [possibleWords]);

  return (
    <div
      className="fullscreen-wrapper"
      ref={keyboardFocusRef}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      tabIndex={0}
      style={{
        gridTemplateRows: "65% 35%",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
      // style={{display:'grid', gridTemplateRows: '1fr 1fr', overflow:'hidden'}}
    >
      <div
        style={{
          display: "grid",
          margin: "auto",
          width: "100%",
          gridTemplateColumns: "1fr 1fr",
          height: "100%",
          padding: 25,
        }}
      >
        <WordFinder
          maxGuesses={maxGuesses}
          // answer={answer}
          currentGuess={currentGuess}
          guesses={guesses}
          // resetGame={resetGame}
          matchStr={matchStr}
          inWordStr={inWordStr}
          missStr={missStr}
          inWordWrongIndexes={inWordWrongIndexes}
          handleClick={handleClick}
        />
        <div
          style={{
            fontFamily: "Clear Sans, Helvetica Neue, Arial, sans-serif",
            border: "white 1px solid",
            margin: "auto",
            flexWrap: "wrap",
            color: "white",
            width: "100%",
            display: "flex",
            maxHeight: "100%",
            gridTemplateColumns: "auto auto auto auto auto auto",
            gridGap: 10,
            padding: 15,
            overflow: "auto",
            justifyContent: "space-around",
          }}
        >
          {possibleWords.slice(0, 250).map((x) => (
            <div key={x} style={{ margin: "auto" }}>{x.toUpperCase()}</div>
          ))}
        </div>
      </div>

      <Keyboard
        handleKeyPress={handleKeyInput}
        usedChars={missStr.split("")}
        inWordChars={inWordStr.split("")}
        correctChars={matchStr.split("")}
        downChar={downChar}
        mode={allowSpaces ? "QwertyWithSpacebar" : "QwertyNoSpacebar"}
      />
    </div>
  );
};

export async function getServerSideProps({ query }: any) {
  const wordLength = Number(query.wordLength) || 5;
  const wordList = getWordList(wordLength);
  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];

  console.log(randomWord);

  return {
    props: { query, answer: randomWord, wordList, wordLength },
  };
}

export default Page;
