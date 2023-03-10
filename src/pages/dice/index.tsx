import { useState, useEffect } from "react";
import Dice from "@/components/Dice";
import { standardFaces } from "@/components/Dice/standardFaces";

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max)
}

const Page = () => {
    const diceSides = 6;
    const [numberOfDice, ] = useState(5);
    const [randomNums, setRandomNums] = useState(Array(numberOfDice).fill(getRandomInt(diceSides)));
    const [counter, setCount] = useState(0);

    useEffect(()=>{
      const numsArray = randomNums.map(() => getRandomInt(diceSides));
      setRandomNums(numsArray);
      setCount(counter+1);

    }, [])

    const rollDice = () =>{
      const numsArray = randomNums.map(() => getRandomInt(diceSides));
      // const countersArray = Array(numberOfDice).fill(1);
      setRandomNums(numsArray);
      setCount(counter+1);
    }


    return <div style={{display:'flex', gap: 50, padding: 50, overflow:'visible'}}>
{randomNums.map((num,i) => (
    <Dice 
    key={i}
      size={200} 
      faces={standardFaces} 
      n={num}       
      counter={counter}       
      margin={0}
      minRotation={false}
      onClick={rollDice}
      sides={diceSides}
    />))}

    </div>
}

export default Page;