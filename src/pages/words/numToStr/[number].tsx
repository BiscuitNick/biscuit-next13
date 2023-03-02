import {numToStr} from '../../../utils/lazyScrambler';

// const fetcher = (url: any) => fetch(url).then((res) => res.json());


function WordsPage  ({randomWord}:any)  {


    // TODO PAGINATION & FILTERS

    return <div>{randomWord}</div>
}

export function getStaticPaths(){
    return {
        paths: [],
        fallback: 'blocking',
    }
}

export function getStaticProps({params:{number}}:any){
    const randomWord = numToStr(Number(number));

    // const randomWord = await fetcher('http://localhost:3000/api/words/random');
    // console.log(words)
    
    

    return {
        props: {randomWord},
    }

}

export default WordsPage;