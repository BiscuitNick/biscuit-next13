"use client"

import { useEffect, useState } from "react";
import Xordle from "@/components/Xordle";
import React from "react";
import { getWordList } from "@/data/words";
import { useLocalStorage } from 'usehooks-ts'

const validCharacters = 'abcdefghijklmnopqrstuvwxyz';

interface DemoXProps {
  params: any;
}

const DemoX = (props:DemoXProps) => {
  const { params: {wordLength=5} } = props;
  const maxGuesses = 7;

  const [answer, setAnswer] = useState('');
  const [possibleWords, setPossibleWords] = useState<string[]>([]);
  const [savedWord, setSavedWord] = useLocalStorage(`word-${wordLength}`, '');

  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);

  const keyDownEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const {key} = event;
    const lowerCasedKey = key.toLowerCase();

    if(key.length===1 && validCharacters.includes(lowerCasedKey)){
        console.log(23, 'valid character', key, lowerCasedKey)

        const tempGuess = currentGuess + lowerCasedKey;
        if(tempGuess.length <= answer.length){
            setCurrentGuess(tempGuess);

        }
        
    }
    else if(key === 'Backspace'){
        const tempGuess = currentGuess.slice(0, -1);
        setCurrentGuess(tempGuess);
    }
    else if(key === 'Enter'){

        // TODO validate word 
        if(currentGuess.length === answer.length){
          console.log(currentGuess, answer);
          console.log(possibleWords);
            const validWord = possibleWords.includes(currentGuess)
            if(validWord){
              setGuesses([...guesses, currentGuess]);
            }
            setCurrentGuess('');
        }
    }

    else{
        console.log(26, 'invalid character', key, lowerCasedKey)
    }


  }

  useEffect(()=>{
    if(savedWord){
      setAnswer(savedWord);
    }
    else{
      const wordList = getWordList(wordLength);
      const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
      setAnswer(randomWord);
      setSavedWord(randomWord);
    }
  }, [])

  useEffect(()=>{
    if(wordLength){
      const wordList = getWordList(wordLength);
      setPossibleWords(wordList);
    }
  }, [wordLength])


  return (
    <div 
      className='fullscreen-wrapper' 
      onKeyDown={keyDownEvent} 
      tabIndex={0} 
      >
      <div 
        className='xordle-header' 
      >
        <h1>
          {wordLength}-ORDLE
        </h1>
      </div>
      <div style={{position:'absolute', top:0, right:0}}>
        <button onClick={()=>{setSavedWord(''); window.location.reload();}}>Reset</button>
      </div>
      <Xordle 
        maxGuesses={maxGuesses}
        answer={answer}
        currentGuess={currentGuess}
        guesses={guesses}
      /> 
    </div>
  )
}

export default DemoX;
