import React from 'react'
import s from './style.module.css';

export default function Formules({formule,menus}) {
    console.log(formule)
    const menu = menus.find((menu)=> menu.id === formule.menus_id);
    
  return (
    <div>
        <h4 className={s.formule_section_title}>{menu && menu.titre}</h4>
        <p className={s.formule_description} >{formule.description}</p>
        <p className={s.formule_prix}>{formule.prix}€</p>
    </div>
  )
}
