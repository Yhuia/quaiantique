import React, {useState } from 'react'

import { useRouter } from 'next/router';
import NavAdmin from '@/components/NavAdmin/NavAdmin';
import s from '../container.module.css';
import axios
 from 'axios';
import GalerieAdmin from '@/components/GalerieAdmin/GalerieAdmin';
export default function Index({dataGalerie}) {
  const [isEditable,setIsEditable] = useState(true)

  const router = useRouter();
  
  
  function onClickEdit(galerie) {
    router.push({
      pathname: `/admin/galerie/${galerie.id}`,
    });
  }
  // Delete du galerie
  function onClickTrash(galerie) {
    alert(galerie.id)
     const idgalerie = galerie.id
    return axios.delete(`http://localhost/backend_quai_antique/galerie/delete`, {data: {id: idgalerie}})
      .then(response => {
        console.log(response);
        return response.data;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  
  console.log(dataGalerie)
  return (
    <div className={s.admin_container}>
      <div className={s.admin_navbar}>
        <NavAdmin></NavAdmin>
      </div>
      <section className={s.admin_section}>
        <button type='button' onClick={()=>{router.push('/admin/galerie/New')}}>Ajouter une image</button>
        {dataGalerie && dataGalerie.map((galerie)=>(
          <div key={galerie.id} >
          <GalerieAdmin 
          title= {galerie.titre}
          url = {galerie.url}
          isEditable = {isEditable}
          onClickTrash = {()=>onClickTrash(galerie)}
          onClickEdit = {()=>onClickEdit(galerie)}
          ></GalerieAdmin> 
          </div>
        ))}
      </section>
    </div>
  )
}

export async function getStaticProps() {
  const data = await fetch('http://localhost/backend_quai_antique/galerie/read');
  const dataGalerie = await data.json();
  const galeries = dataGalerie.images;
  
  return {
      props : {
        dataGalerie:galeries,
      }
  }
}

