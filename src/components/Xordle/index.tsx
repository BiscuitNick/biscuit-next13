import React from "react";

// const validCharacters = 'abcdefghijklmnopqrstuvwxyz';

interface XordleProps { 
    maxGuesses: number;
    guesses: string[];
    answer: string;
    currentGuess: string;
    // resetGame: () => void;
}

const Xordle = (props: XordleProps) => {
    const {maxGuesses, answer, currentGuess, guesses } = props;
    const wordLength = answer.length;
    const cellSize = 62;

    const xordleRows = [];
    for(let r=0; r<maxGuesses; r++){
        let word = r < guesses.length ? guesses[r] : r===guesses.length ? currentGuess : '';
        let row = [];
        let applyValidation = r < guesses.length;
        for(let i=0;i<answer.length;i++){
            const letter = word[i] || '';
            const isCorrect = letter === answer[i];
            const isInWord = answer.includes(letter);
            const isWrong = !isCorrect && !isInWord;
            const keyid = `${r}-${i}`;
            row.push(
                <div 
                    id={keyid} 
                    key={keyid} 
                    className='xordle-cell' 
                    style={{
                        width:cellSize, 
                        height: cellSize, 
                        transitionDelay:`${500*i}ms`,
                        borderWidth: applyValidation ? 0 : 2,
                        background: applyValidation && isCorrect ? '#538d4e' 
                        : applyValidation && isInWord ? '#b59f3b' 
                        : applyValidation && isWrong ? '#3a3a3c' 
                        : '#000000', 
                        animation: applyValidation && word===answer ? `shake 1500ms ${answer.length*500+i*200}ms infinite` : 'none',
                        // animationDelay: `${1500*answer.length}ms`,                   
                    }}
                >                    
                    <span style={{margin:'auto'}}>{letter.toUpperCase()}</span>
                </div>
                )
            }
        xordleRows.push(row);
    }

    const isWinner = guesses.includes(answer);

    console.log(53, isWinner, answer)

    return (
        <>
            {guesses.length === maxGuesses && <div className='xordle-gameover-modal'>
             New Game 
            </div>}
            <div 
                className='xordle-grid' 
                style={{
                    gridTemplateColumns: 'auto '.repeat(wordLength), 
                    gridTemplateRows: 'auto '.repeat(maxGuesses), 
                }}
                    > 
                {xordleRows}
            </div>
        </>

    )


}

export default Xordle;