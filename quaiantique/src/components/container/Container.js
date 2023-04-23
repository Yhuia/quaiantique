import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import s from './style.module.css';
export default function Container({children}) {
  return (
    <>
    <Navbar></Navbar>
    <div className={s.container}>
      {children}
    </div>
    <Footer></Footer>
      
    </>
  )
}
