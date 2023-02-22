// import useSWR from 'swr';


// const fetcher = (url: any) => fetch(url).then((res) => res.json());

// async function getWord(){
//     const words = await fetcher('http://localhost:3000/api/words/random');
//     return words;
// }

async function Page  () {
    // const words = await getWord();

    // const wordList = Object.keys(words);
    // const wordTotal = wordList.length;

    // const randomWord = wordList[Math.floor(Math.random() * wordTotal)];

    return <div>
        <h1>Random Word</h1>
        {/* <h2>{words}</h2> */}
    </div>
}

export default Page;