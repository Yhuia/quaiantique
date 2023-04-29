import Link from 'next/link'
import React from 'react'
import s from './style.module.css';
import Logingroup from '../Authentification/Logingroup';
export default function Navbar() {
  return (
    <header className={s.header_container}>
        <Link href={'/'}><h2>Quai Antique</h2></Link>
        <nav className={s.header_nav}>
            <Link className={s.header_link} href={'/menu'}>Menu</Link>
            <Link className={s.header_link}href={'/nosinformations'}>Nos informations</Link>

        </nav>
        <div>
          <Logingroup></Logingroup>
        </div>
    </header>
  )
}
