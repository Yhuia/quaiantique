import React, { useState } from 'react'
import s from './style.module.css';
import axios from 'axios';
import { accountService } from '@/services/accountservice';
import { useRouter } from 'next/router'
import Modal from '@/components/Modal/Modal';
import InputError from '@/components/InputError/InputError';

export default function Login() {
    const router = useRouter()
    const [credentials, setCredentials] = useState({
        email : '',
        mot_de_passe :'' 
    })
    const [validateUser, setValidateuser] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    function onChange (e) {
        setCredentials({
            ...credentials,
            [e.target.name] : e.target.value
        } )
    }
    const onSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost/quaiantique/users/create',credentials)
        .then(res=> {
            if(res.status === 201){
                setValidateuser(true)
            }
                
        })
        .catch(error => {
            if (error.response && error.response.data){
                setErrorEmail(true)
                setErrorMessage(error.response.data.message)
            }
            console.log(error)
        }) // voir ca de plus pres 
    }

  return (
    <>
        <h4>Inscription</h4>
        { validateUser && <Modal/> }
        <form onSubmit={onSubmit} className={s.form_container}>
            <div className={s.form_group}>
                <label  className={s.form_label} htmlFor='email'>Email</label>
                <input name='email'  value={credentials.email} onChange={onChange} className={s.form_input} type='text' ></input>
                {errorEmail && <InputError msg={errorMessage}></InputError>}
            </div>
            <div className={s.form_group}>
                <label className={s.form_label} htmlFor='mot_de_passe'  >Mot de passe</label>
                <input name='mot_de_passe' value={credentials.mot_de_passe} onChange={onChange} className={s.form_input} type='text' ></input>
            </div>
            <div className='form_group'>
                <button className={s.form_input} type='submit'>{"S'inscrire"}</button>
            </div>
        </form>
    
    
    </>
    
  )
}
