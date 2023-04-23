import React from 'react'
import s from './style.module.css';

export default function Menu({categorie,plats,title}) {
    const platsection = plats.filter(item => item.id_categorie === categorie);
  return (
    <div >
        {platsection.length > 0 &&
      <div className={s.menu_global_container}>
            <h4 className={s.menu_section_title}>{title}</h4>
            { platsection.map((plat)=>(
                <div key={plat.id} className={s.menu_card}>
                    <h4 className={s.menu_titre}>{plat.titre}</h4>
                    <p className={s.menu_description}>{plat.description}</p>
                    <p className={s.menu_prix}>{plat.prix}€</p>
                </div>
            ))}
        </div>
        }
    </div>
  )
}
