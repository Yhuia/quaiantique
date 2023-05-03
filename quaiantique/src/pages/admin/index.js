import NavAdmin from '@/components/NavAdmin/NavAdmin';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import s from './container.module.css';

export default function Index() {
  const logged = true; 
  const router = useRouter()

  useEffect(() => {
    if(!logged){
      router.push('/auth/Login');
    }
  }, [])

  return (
    <div className={s.admin_container}>
      <div className={s.admin_navbar}>
      <NavAdmin/>
      </div>
      
      <div className={s.admin_section}>

      </div>
    </div>
  )
}
