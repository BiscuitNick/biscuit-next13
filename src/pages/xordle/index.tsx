
import '@/app/globals.css';

import { useRouter } from "next/router"
import React, { useEffect, useState } from "react";

import Xordle from "@/components/Xordle";
import Keyboard from "@/components/Keyboard";

import { getWordList } from "@/data/words";
// import { useLocalStorage } from 'usehooks-ts'



const validCharacters = 'abcdefghijklmnopqrstuvwxyz';


const Page = ({answer, maxGuesses=6} : {answer:string; maxGuesses:number}) => {
    const validateWord = false;

    const wordLength = answer.length;

    const [possibleWords, setPossibleWords] = useState<string[]>([]);
  
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState<string[]>([]);
    const router = useRouter();

    useEffect(()=>{
        router.push('', undefined, {shallow: true});
    },[])

    useEffect(()=>{
        if(wordLength){
            const wordList = getWordList(wordLength);
            setPossibleWords(wordList);
        }
    }, [wordLength])

    const resetGame = () => {
        setGuesses([]);
      }

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
    
                if(validateWord){
                    const validWord = possibleWords.includes(currentGuess)
                    if(validWord){
                      setGuesses([...guesses, currentGuess]);
                    }
                }
                else{
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
        if(validateWord){
            const validWord = possibleWords.includes(currentGuess)
            if(validWord){
              setGuesses([...guesses, currentGuess]);
            }
        }
        else{
            setGuesses([...guesses, currentGuess]);
        }

        setCurrentGuess('');
    }
    }


      return (
        <div 
          className='fullscreen-wrapper' 
          onKeyDown={keyDownEvent} 
          tabIndex={0} 
          >
          <Xordle 
            maxGuesses={maxGuesses}
            answer={answer}
            currentGuess={currentGuess}
            guesses={guesses}
            resetGame={resetGame}
          /> 
          < Keyboard handleKeyPress={handleKeyPress} guesses={guesses} answer={answer} />
        </div>
      )
}

export async function getServerSideProps({query}:any) {
    // Object.keys(context).forEach(key => console.log(key, context[key]))

    const answer = query.answer || 'hello';

    // const encrypted = CryptoJS.AES.encrypt(answer, "Secret Passphrase").toString();
    // const decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase").toString();

    // let stringified = JSON.stringify(encrypted);

  return {
    props: {query, answer}, // will be passed to the page component as props
  }
}

export default Page