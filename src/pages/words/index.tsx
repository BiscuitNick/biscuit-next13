import Link from "next/link"

const IndexPage = () => {
    return (
    <div style={{margin:'auto', display:'grid'}}>
        <div><Link href='/words/finder'>Word Finder</Link></div>
        <div><Link href='/words/numToStr'>Number to Word</Link></div>
        <div><Link href='/words/strToNum'>Word to Number</Link></div>
    </div>)
}


export default IndexPage;