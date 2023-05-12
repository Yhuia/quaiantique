import React from 'react'
import s from './style.module.css';

export default function InputError({msg}) {
  return (
    <span className={s.error_container}>
        {msg}
    </span>
  )
}
