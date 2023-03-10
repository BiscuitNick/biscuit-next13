import React, { useEffect, useState } from "react";
import { isDarkModeAtom } from "@/data/atoms";
import { useRecoilValue } from "recoil";

interface WordFinderProps {
  maxGuesses: number;
  guesses: string[];
  // answer: string;
  currentGuess: string;

  matchStr: string;
  inWordStr: string;
  missStr: string;
  inWordWrongIndexes?: any;
  handleClick: any;
}

const WordFinder = (props: WordFinderProps) => {
  // useColors
  const isDarkMode = useRecoilValue(isDarkModeAtom);

  const {
    maxGuesses,
    currentGuess,
    guesses,
    matchStr,
    inWordStr,
    handleClick,
    missStr,
  } = props;
  const wordLength = matchStr.length;

  const [cellSize, setCellSize] = useState(62);

  useEffect(() => {
    const maxCellSize = Math.floor(
      (window.innerWidth - (matchStr.length + 1) * 5) / matchStr.length
    );

    if (maxCellSize < 62) {
      setCellSize(maxCellSize);
    }

    // console.log(maxCellSize);
  }, []);

  const xordleRows = [];
  for (let r = 0; r < maxGuesses; r++) {
    let word =
      r < guesses.length
        ? guesses[r]
        : r === guesses.length
        ? currentGuess
        : "";
    let row = [];
    let applyValidation = r < guesses.length;
    for (let i = 0; i < matchStr.length; i++) {
      const letter = word[i] || "";
      const isCorrect = letter === matchStr[i];
      const isInWord = inWordStr.includes(letter);
      const isWrong = missStr.includes(letter);
      const keyid = `${r}-${i}`;
      row.push(
        <div
          onClick={() => handleClick(letter, i)}
          id={keyid}
          key={keyid}
          className="xordle-cell"
          style={{
            width: cellSize,
            height: cellSize,
            borderWidth: applyValidation ? 0 : 2,
            background:
              applyValidation && isCorrect
                ? "#538d4e"
                : applyValidation && isInWord
                ? "#b59f3b"
                : applyValidation && isWrong
                ? "#3a3a3c"
                : isDarkMode || applyValidation
                ? "#000000"
                : "#ffffff",
            color: isDarkMode || applyValidation ? "#ffffff" : "#000000",
          }}
        >
          <span style={{ margin: "auto" }}>{letter.toUpperCase()}</span>
        </div>
      );
    }
    xordleRows.push(row);
  }

  return (
    <>
      <div
        className="xordle-grid"
        style={{
          gridTemplateColumns: "auto ".repeat(wordLength),
          gridTemplateRows: "auto ".repeat(maxGuesses),
          margin: "auto",
        }}
      >
        {xordleRows}
      </div>
    </>
  );
};

export default WordFinder;
