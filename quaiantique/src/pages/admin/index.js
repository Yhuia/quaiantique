import NavAdmin from '@/components/NavAdmin/NavAdmin';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import s from './container.module.css';
import { accountService } from '@/services/accountservice';

export default function Index() { 
  const router = useRouter()
  const [shouldRender, setShouldRender] = useState(false);

  async function ProtectedPage() {
    const isLoggedIn = await accountService.isLogged();
    const isAdmin = await accountService.isAdmin()
    if(!isLoggedIn){
      await router.push('/auth/Login');
      return null
    } else if (isLoggedIn && isAdmin === 0){
      await router.push('/account');
      return null;
    }
    setShouldRender(true)
  }

  useEffect(() => {
   async function checkProtected() {
       await ProtectedPage()
    }
    checkProtected()
    
  }, [])
  
  return shouldRender ? (
    <div className={s.admin_container}>
      <div className={s.admin_navbar}>
      <NavAdmin/>
      </div>
      
      <div className={s.admin_section}>

      </div>
    </div> 
  ) : null;
}
