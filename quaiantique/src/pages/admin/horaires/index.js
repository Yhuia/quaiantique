import React, { useState } from 'react'
import { useRouter } from 'next/router';
import NavAdmin from '@/components/NavAdmin/NavAdmin';
import s from '../container.module.css';
import axios from 'axios';
import Horaire from '@/components/Horaire/Horaire';
export default function Index({dataHoraires}) {
  const [isEditable,setIsEditable] = useState(true)

  const router = useRouter();

  function onClickEdit(horaire) {
    router.push({
      pathname: `/admin/horaires/${horaire.id}`,
    });
  }
  // Delete du formulaire
  function onClickTrash(formules) {
    alert(formules.id)
     const idFormules = formules.id
    return axios.delete(`http://localhost/backend_quai_antique/hours/delete`, {data: {id: idFormules}})
      .then(response => {
        console.log(response);
        return response.data;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  
  console.log(dataHoraires)
  return (
    <div className={s.admin_container}>
      <div className={s.admin_navbar}>
        <NavAdmin></NavAdmin>
      </div>
      <section className={s.admin_section}>
        <button type='button' onClick={()=>{router.push('/admin/horaires/New')}}>{"Ajouter une horaire"}</button>
        {dataHoraires.map((horaire)=>(
          <div key={horaire.id} >
          <Horaire  
          title= {horaire.jour_de_la_semaine}
          heure_Midi_Ouv = {horaire.heure_midi_ouverture}
          heure_Midi_Ferm = {horaire.heure_midi_fermeture}
          heure_Soir_Ouv = {horaire.heure_soir_ouverture}  
          heure_Soir_Ferm = {horaire.heure_soir_fermeture}
          isEditable = {isEditable}
          onClickTrash = {()=>onClickTrash(horaire)}
          onClickEdit = {()=>onClickEdit(horaire)}
          ></Horaire> 
          </div>
        ))}
      </section>
    </div>
  )
}

export async function getStaticProps() {
  const data = await fetch('http://localhost/backend_quai_antique/hours/read');
  const dataHoraires = await data.json();
  const horaires = dataHoraires.horaires;
  console.log(horaires)
  return {
      props : {
        dataHoraires:horaires,
      }
  }
}



