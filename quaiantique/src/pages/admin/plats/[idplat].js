import React from 'react'
import PlatsForm from '@/components/PlatsForm/PlatsForm';
import axios from 'axios';
export default function Idplat({plat}) {
    const isEditable = true;
    console.log(plat)
    // je ne recois pas l'id
    function submit(plat, formValues) {
      const platId = plat.id;
      console.log(plat)
      const updatedFormValues = { ...formValues, "id" : platId};
      console.log(updatedFormValues)
      return axios.put(`http://localhost/quaiantique/plats/update`, updatedFormValues)
        .then(response => {
          console.log(response);
          return response.data;
        })
        .catch(error => {
          console.log(error);
          throw error;
        });
    }
    return (
    <div>
      { <PlatsForm 
            isEditable={isEditable} 
            title={isEditable ? 'Modifie ton plat' :plat.title}
            plat={plat} 
            // onClickEdit={()=>{setIsEditable(!isEditable)}}
            // onClickTrash={()=>{supprimerNote(note)}}
            onSubmit={isEditable && submit}
            />
          }
      
    </div>
  )
}

export async function getStaticProps(context) {
  const poste = context.params.idplat
  const data = await fetch('http://localhost/quaiantique/plats/read');
  const dataPlats = await data.json();
  const plats = dataPlats.plats;
  console.log(plats)
  const plat = plats.find(plat => ( plat.id.toString() === poste))
  return {
    props : {
      plat:plat,
    }
  }
}

export async function getStaticPaths() {
    const data = await fetch ('http://localhost/quaiantique/plats/read');
    const dataPlats = await data.json();
    const plats = dataPlats.plats;
    const paths = plats.map((plat)=>( 
      {params : {idplat: plat.id.toString()}}
    ))
    return {
      paths,
      fallback : false
    }
}