import React, {  useState } from 'react'
import s from './footer.module.css';
import Horaires from '../Horaires/Horaires';
import Link from 'next/link';

export default function Footer() {
   

  return (
    <footer className={s.footer_container}>
        <div className={s.footer_mentionlegal_container}>
            <h4>Mentions légales</h4>
            <div className={s.footer_container_link}>
                    <Link className={s.footer_link} href='mentionslegales'>Mentions légales</Link>
                    <Link className={s.footer_link} href='confidentialite'>Confidentialité</Link>
                    <Link className={s.footer_link} href='cookie'>Cookie</Link>
            </div>
        </div>
        
      <Horaires ></Horaires>
    </footer>
  )
}


