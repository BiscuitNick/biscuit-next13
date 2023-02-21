'use client';

import { useState } from "react";
const CryptoJS = require("crypto-js");



const EncryptPage = () => {
    const [input, setInput] = useState('');

    const encrypted = CryptoJS.AES.encrypt(input, "Secret Passphrase");
    const decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);


    return (
      <div>
        <h1>
          Encrypt
        </h1>    
        <input value={input} onChange={(e)=> setInput(e.target.value)}/>    
        <div>Encrypted String {encrypted.toString()}</div>
        <div>Decrypted String {decrypted.toString()}</div>
        <div>Text {plaintext}</div>

      </div>
    )

}

export default EncryptPage;