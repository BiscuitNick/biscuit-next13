import {strToNum, numToStr} from '../../../utils/lazyScrambler';

// const fetcher = (url: any) => fetch(url).then((res) => res.json());


function WordsPage  ({numString, string}:any)  {

    return <div>
        <div>{string}</div>
        <div>{numString}</div>
    <div>{numToStr(numString)}</div>
        </div>
}

export function getStaticPaths(){
    return {
        paths: [],
        fallback: 'blocking',
    }
}

export function getStaticProps({params:{string}}:any){
    const numString = strToNum(string);

    return {
        props: {string, numString},
    }

}

export default WordsPage;