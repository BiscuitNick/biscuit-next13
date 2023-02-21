interface KeyboardProps{
    handleKeyPress: any; //(char:string) => void;
    guesses: string[];
    answer: string;
}


const firstRow = 'qwertyuiop'.split('');
const secondRow = 'asdfghjkl'.split('');
const thirdRow = ['Enter', ...'zxcvbnm'.split(''), 'Backspace'];

const Keyboard = (props:KeyboardProps) => {
    const {handleKeyPress, guesses, answer} = props;

    const usedChars = new Set(guesses.join('').split(''));
    const inWordChars: string[] = [];
    const correctChars: string[] = [];

    for(let i=0; i<guesses.length; i++){
        for(let j=0; j<guesses[i].length; j++){
            const guessChar = guesses[i][j];
            if(answer[j] === guessChar){
                correctChars.push(guessChar);
            }
            else if(answer.includes(guessChar)){
                inWordChars.push(guessChar);
            }
        }
    }

    return (
      <div className='keyboard-grid'>
        <div className='keyboard-row'>
            {firstRow.map((char) => {
                const used = usedChars.has(char);
                const inWord = inWordChars.includes(char);
                const correct = correctChars.includes(char);
                const className = correct ? 'correct' : inWord ? 'in-word' : used ? 'wrong' : 'unused';
                return (
                <button key={char} className={`keyboard-key ${className}`} onClick={() => handleKeyPress(char)}>
                    <span>{char.toUpperCase()}</span>
                </button>)})}
        </div>
        <div className='keyboard-row'>
            {secondRow.map((char) => {
                const used = usedChars.has(char);
                const inWord = inWordChars.includes(char);
                const correct = correctChars.includes(char);
                const className = correct ? 'correct' : inWord ? 'in-word' : used ? 'wrong' : 'unused';
                return (
                <button key={char} className={`keyboard-key ${className}`} onClick={() => handleKeyPress(char)}>
                    <span>{char.toUpperCase()}</span>
                </button>)})}
        </div>        
        <div className='keyboard-row'>
            {thirdRow.map((char) => {
                const used = usedChars.has(char);
                const inWord = inWordChars.includes(char);
                const correct = correctChars.includes(char);
                const className = correct ? 'correct' : inWord ? 'in-word' : used ? 'wrong' : 'unused';
                return (
                <button key={char} className={`keyboard-key ${className}`} onClick={() => handleKeyPress(char)}>
                    {char.length === 1 ? <span>{char.toUpperCase()}</span>
                    : char === 'Enter' ? <span style={{fontSize: '1.5rem', width: 76}}>Enter</span>
                    : char === 'Backspace' ? <span style={{fontSize: '1.5rem', width: 76}}>⌫</span>
                    : null
                    }
                </button>)})}
        </div>    
      </div>
    )
}

export default Keyboard;