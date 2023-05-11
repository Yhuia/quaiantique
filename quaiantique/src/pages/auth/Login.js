import React, { useState } from 'react'
import s from './style.module.css';
import axios from 'axios';
import { accountService } from '@/services/accountservice';
import { useRouter } from 'next/router'

export default function Login() {
    const router = useRouter()
    const [credentials, setCredentials] = useState({
        email : '',
        mot_de_passe :'' 
    })
    function onChange (e) {
        setCredentials({
            ...credentials,
            [e.target.name] : e.target.value
        } )
    }
    const onSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost/quaiantique/users/login',credentials)
        .then(res=> {
            accountService.saveToken(res.data.tokenConnect,res.data.admin)
            const isLoggedIn =  accountService.isLogged();
            const isAdmin =  accountService.isAdmin()
            if(isLoggedIn && isAdmin === 0){
                router.push('/account');
              } else if (isLoggedIn && isAdmin === 1){
                router.push('/admin');
              }
            console.log(localStorage)
        })
        .catch(error => console.log(error)) // voir ca de plus pres 
    }

  return (
    <form onSubmit={onSubmit} className={s.form_container}>
        <div className={s.form_group}>
            <label  className={s.form_label} htmlFor='email'>Email</label>
            <input name='email'  value={credentials.email} onChange={onChange} className={s.form_input} type='text' ></input>
        </div>
        <div className={s.form_group}>
            <label className={s.form_label} htmlFor='mot_de_passe'  >Mot de passe</label>
            <input name='mot_de_passe' value={credentials.mot_de_passe} onChange={onChange} className={s.form_input} type='text' ></input>
        </div>
        <div className='form_group'>
            <button className={s.form_input} type='submit'>Se connecter</button>
        </div>
      
    </form>
  )
}
