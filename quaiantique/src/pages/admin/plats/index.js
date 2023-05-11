import Plats from '@/components/Plat/Plats'
import React, { useState } from 'react'
import { useRouter } from 'next/router';
import NavAdmin from '@/components/NavAdmin/NavAdmin';
import s from '../container.module.css';

export default function Index({dataPlat}) {
  const [isEditable,setIsEditable] = useState(true)

  const router = useRouter();

  function onClickEdit(plat) {
    router.push({
      pathname: `/admin/plats/${plat.id}`,
    });
  }

  console.log(dataPlat)
  return (
    <div className={s.admin_container}>
      <div className={s.admin_navbar}>
        <NavAdmin></NavAdmin>
      </div>
      <section className={s.admin_section}>
        <button type='button' onClick={()=>{router.push('/admin/plats/New')}}>Ajouter un plat</button>
        {dataPlat.map((plat)=>(
          <div key={plat.id} >
          <Plats 
          title= {plat.titre}
          description = {plat.description}
          prix = {plat.prix}
          isEditable = {isEditable}
          onClickTrash = {() => alert('click')}
          onClickEdit = {()=>onClickEdit(plat)}
          ></Plats> 
          </div>
        ))}
      </section>
    </div>
  )
}

export async function getStaticProps() {
  const data = await fetch('http://localhost/quaiantique/plats/read');
  const dataPlats = await data.json();
  const plats = dataPlats.plats;
  return {
      props : {
        dataPlat:plats,
      }
  }
}



