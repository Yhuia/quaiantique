import Link from 'next/link'
import React from 'react'
import s from './style.module.css';
import Logingroup from '../Authentification/Logingroup';
import { accountService } from '@/services/accountservice';
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()

  const logoutbut = async () => {
    await accountService.logout()
    router.push('/');
    
  }
  console.log('salut',accountService.isLogged())
  return (
    <header className={s.header_container}>
        <Link href={'/'}><h2>Quai Antique</h2></Link>
        <nav className={s.header_nav}>
            <Link className={s.header_link} href={'/menu'}>Menu</Link>
            <Link className={s.header_link}href={'/nosinformations'}>Nos informations</Link>
        </nav>
        <div>
          
          {accountService.isLogged() ? 
            <button onClick={logoutbut}>Deconnexion</button> :
            <Logingroup></Logingroup>
          }
          
          
        </div>
    </header>
  )
}
