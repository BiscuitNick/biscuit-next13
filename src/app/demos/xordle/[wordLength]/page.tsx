"use client"

import { useEffect, useState } from "react";
import Xordle from "@/components/Xordle";
import React from "react";
import { getWordList } from "@/data/words";
import { useLocalStorage } from 'usehooks-ts'

import Keyboard from "@/components/Keyboard";

const validCharacters = 'abcdefghijklmnopqrstuvwxyz';

interface DemoXProps {
  params: any;
}

const DemoX = (props:DemoXProps) => {
  const { params: {wordLength=5} } = props;
  const maxGuesses = 6;

  const [answer, setAnswer] = useState('');
  const [possibleWords, setPossibleWords] = useState<string[]>([]);
  const [savedWord, setSavedWord] = useLocalStorage(`word-${wordLength}`, '');

  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);

  const keyDownEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const {key} = event;
    const lowerCasedKey = key.toLowerCase();

    if(key.length===1 && validCharacters.includes(lowerCasedKey)){
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
        if(currentGuess.length === answer.length){

            const validWord = possibleWords.includes(currentGuess)
            if(validWord){
              setGuesses([...guesses, currentGuess]);
            }
            setCurrentGuess('');
        }
    }
  }

  const handleKeyPress = (key:String) => {
    const lowerCasedKey = key.toLowerCase();
    if(key.length===1 && validCharacters.includes(lowerCasedKey)){
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
        if(currentGuess.length === answer.length){
            const validWord = possibleWords.includes(currentGuess)
            if(validWord){
              setGuesses([...guesses, currentGuess]);
            }
            setCurrentGuess('');
        }
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
  }, [savedWord])

  useEffect(()=>{
    if(wordLength){
      const wordList = getWordList(wordLength);
      setPossibleWords(wordList);
    }
  }, [wordLength])

  const resetGame = () => {
    setSavedWord('');
    setGuesses([]);
  }


  return (
    <div 
      className='fullscreen-wrapper' 
      onKeyDown={keyDownEvent} 
      tabIndex={0} 
      >
      <div style={{position:'absolute', top:0, right:0}}>
        <button onClick={resetGame}>Reset</button>
      </div>
      <Xordle 
        maxGuesses={maxGuesses}
        answer={answer}
        currentGuess={currentGuess}
        guesses={guesses}
        // resetGame={resetGame}
      /> 
      < Keyboard handleKeyPress={handleKeyPress} guesses={guesses} answer={answer} />
    </div>
  )
}

export default DemoX;
