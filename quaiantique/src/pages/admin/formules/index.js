import Plats from '@/components/Plat/Plats'
import React, { useState } from 'react'
import { useRouter } from 'next/router';
import NavAdmin from '@/components/NavAdmin/NavAdmin';
import s from '../container.module.css';
import axios from 'axios';
export default function Index({dataFormules}) {
  const [isEditable,setIsEditable] = useState(true)

  const router = useRouter();

  function onClickEdit(formules) {
    router.push({
      pathname: `/admin/formules/${formules.id}`,
    });
  }
  // Delete du formulaire
  function onClickTrash(formules) {
    alert(formules.id)
     const idFormules = formules.id
    return axios.delete(`http://localhost/quaiantique/formules/delete`, {data: {id: idFormules}})
      .then(response => {
        console.log(response);
        return response.data;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  
  console.log(dataFormules)
  return (
    <div className={s.admin_container}>
      <div className={s.admin_navbar}>
        <NavAdmin></NavAdmin>
      </div>
      <section className={s.admin_section}>
        <button type='button' onClick={()=>{router.push('/admin/formules/New')}}>Ajouter d'une formule</button>
        {dataFormules.map((formules)=>(
          <div key={formules.id} >
          <Plats 
          title= {formules.titre}
          description = {formules.description}
          prix = {formules.prix}
          isEditable = {isEditable}
          onClickTrash = {()=>onClickTrash(formules)}
          onClickEdit = {()=>onClickEdit(formules)}
          ></Plats> 
          </div>
        ))}
      </section>
    </div>
  )
}

export async function getStaticProps() {
  const data = await fetch('http://localhost/quaiantique/formules/read');
  const dataFormules = await data.json();
  const formules = dataFormules.formules;
  console.log(formules)
  return {
      props : {
        dataFormules:formules,
      }
  }
}



