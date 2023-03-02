import {strToNum} from '../../../utils/lazyScrambler';

// const fetcher = (url: any) => fetch(url).then((res) => res.json());


function WordsPage  ({numString}:any)  {


    // TODO PAGINATION & FILTERS

    return <div>{numString}</div>
}

export function getStaticPaths(){
    return {
        paths: [],
        fallback: 'blocking',
    }
}

export function getStaticProps({params:{string}}:any){
    const numString = strToNum(string);

    // const randomWord = await fetcher('http://localhost:3000/api/words/random');
    // console.log(words)
    
    

    return {
        props: {numString},
    }

}

export default WordsPage;