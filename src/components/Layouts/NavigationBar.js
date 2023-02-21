"use client"
import Link from 'next/link'
import { Button } from '@mui/material'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';

const NavigationBar = () => {

  const [show, toggleShow] = useState(true)

  return (
    <div style={{position:'absolute', width: '100%', height:0, zIndex: 99}}>
    {show ?    <div style={{display:'grid', gridAutoFlow:'column', width: 'fit-content', margin:'auto'}}>
          <Link href='/'><Button>Home</Button></Link>
          <Link href='/docs'><Button>Docs</Button></Link>
          <Link href='/templates'><Button>Templates</Button></Link>
          <Link href='/demo'><Button>Demo</Button></Link>
          <Link href='/about'><Button>About</Button></Link>
          <Button onClick={()=>toggleShow(!show)}>X</Button>
      </div>
      : <Button style={{display:'absolute'}} onClick={()=>toggleShow(!show)}><MenuIcon/></Button>}
    </div>
  )



}


export default NavigationBar