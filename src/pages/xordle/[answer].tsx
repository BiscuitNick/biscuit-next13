
// import bcrypt from "bcrypt";
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';
// const salt = bcrypt.genSaltSync(saltRounds);
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPT_KEY);


const Page = (props: { answer: any; hash: any; }) => {
    const {answer, hash} = props;
    
    const decryptedString = cryptr && hash ? cryptr.decrypt(hash) : '';


    // const decryptedHash = cryptr && answer ? cryptr.decrypt(answer) : '';


    return <div>Hashed Page
    <div>{answer}</div>

    <div>{hash}</div>
    <div>{decryptedString}</div>
    {/* <div>{decryptedHash}</div> */}

    </div>
}

export async function getStaticPaths(){
    return {
        paths: [], fallback: true
    }
}

export async function getStaticProps({params}: any){
    const {answer} = params;


    const hash = cryptr.encrypt(answer);
    // const stringifiedHash = JSON.stringify(hashed);

    
    return {
        props: {answer, hash},
    }

}


export default Page;