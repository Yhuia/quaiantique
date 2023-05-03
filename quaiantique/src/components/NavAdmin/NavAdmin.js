import Link from 'next/link'
import React from 'react'
import s from './style.module.css';

export default function NavAdmin() {
  return (
    <>
        <p>Dashbord</p>
        <div className={s.navAdmin_navlink} >
            <Link className={s.navAdmin_link} href={'/admin'}>Admin</Link>
            <Link className={s.navAdmin_link} href={'/admin/plats'}>Plats</Link>
        </div>
    </>
  )
}
