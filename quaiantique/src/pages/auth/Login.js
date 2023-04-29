import React, { useState } from 'react'
import s from './style.module.css';
import axios from 'axios';

export default function Login() {
    const [credentials, setCredentials] = useState({
        email : '',
        password :'' 
    })
    function onChange (e) {
        setCredentials({
            ...credentials,
            [e.target.name] : e.target.value
        } )
    }
    const onSubmit = (e)=>{
        e.preventDefault()
        console.log(credentials)
        axios.post('http://localhost/quaiantique/users/login',credentials)
        .then(res=> console.log(res))
        .catch(error => console.log(error)) // voir ca de plus pres 

    }
  return (
    <form onSubmit={onSubmit} className={s.form_container}>
        <div className={s.form_group}>
            <label  className={s.form_label} htmlFor='email'>Email</label>
            <input name='email'  value={credentials.email} onChange={onChange} className={s.form_input} type='text' ></input>
        </div>
        <div className={s.form_group}>
            <label className={s.form_label} htmlFor='motdepasse'  >Mot de passe</label>
            <input name='password' value={credentials.password} onChange={onChange} className={s.form_input} type='text' ></input>
        </div>
        <div className='form_group'>
            <button className={s.form_input} type='submit'>Se connecter</button>
        </div>
      
    </form>
  )
}
