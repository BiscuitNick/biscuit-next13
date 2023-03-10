import React from 'react';
import Keyboard from "@/components/Keyboard";
import useKeyboard from "@/components/Keyboard/useKeyboard";

const KeyboardPage: React.FC = () => {
    const {downChar, usedChars, inWordChars, correctChars, handleKeyInput, handleKeyDown, handleKeyUp, keyboardFocusRef, allowSpaces} = useKeyboard({answer:'glue'});
 
    return (
    <div 
        className='fullscreen-wrapper' 
        ref={keyboardFocusRef}
        onKeyDown={handleKeyDown} 
        onKeyUp={handleKeyUp}
        tabIndex={0} 
    >
        <Keyboard 
          handleKeyPress={handleKeyInput}
          usedChars={usedChars}
          inWordChars={inWordChars}
          correctChars={correctChars}
          downChar={downChar}
          mode={allowSpaces ? 'QwertyWithSpacebar' : 'QwertyNoSpacebar'}
        />
    </div>)
}

export default KeyboardPage;
