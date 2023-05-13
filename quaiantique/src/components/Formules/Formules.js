import React from 'react'
import s from './style.module.css';

export default function Formules({formule}) {
    console.log(formule)
    
    
  return (
    <div>
        <h4 className={s.formule_section_title}>{formule.titre}</h4>
        <p className={s.formule_description} >{formule.description}</p>
        <p className={s.formule_prix}>{formule.prix}€</p>
    </div>
  )
}
