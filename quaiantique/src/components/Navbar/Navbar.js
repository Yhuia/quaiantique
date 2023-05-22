import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import s from './style.module.css';
import Logingroup from '../Authentification/Logingroup';
import { accountService } from '@/services/accountservice';
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const logoutbut = async () => {
    await accountService.logout()
    setIsLoggedIn(false)
    router.push('/');
    
  }
  const checkLoggedIn = async () => {
    const loggedIn = await accountService.isLogged()
    setIsLoggedIn(loggedIn)
    setIsAdmin(accountService.isAdmin())
    
  }
  useEffect(()=>{
    checkLoggedIn()
  },[])
  console.log('salut',accountService.isLogged())
  return (
    <header className={s.header_container}>
        <Link href={'/'}><h2>Quai Antique</h2></Link>
        <nav className={s.header_nav}>
            <Link className={s.header_link} href={'/menu'}>Menu</Link>
            <Link className={s.header_link}href={'/nosinformations'}>Nos informations</Link>
        </nav>
        <div className={s.header_auth_buttons}>
          
          {isLoggedIn ? 
           <button onClick={logoutbut}>Deconnexion</button> :
           <>
            <Logingroup path ={'/auth/Login'} title={'Connexion'}></Logingroup>
            <Logingroup path ={'/auth/Register'} title={'Inscription'}></Logingroup>
           </>
          }
          { isLoggedIn && isAdmin === 1 && <Link className={s.header_link} href={'/admin'}><button>Admin</button></Link>}
          { isLoggedIn && isAdmin === 0 && <Link className={s.header_link} href={'/account'}><button>Compte</button></Link>} 
        </div>
    </header>
  )
}
