import React, { useState } from 'react'
import PlatsForm from '@/components/PlatsForm/PlatsForm';
import axios from 'axios';
export default function Idplat({plat}) {
    const isEditable = true;
    const [formValues, setFormValues] =  useState({
      id: plat ? parseFloat(plat.id) : null,
      titre: plat ? plat.titre : '',
      description: plat ? plat.description : '',
      prix: plat ? plat.prix : '',
      id_categorie: plat ? plat.id_categorie : '',
    });
    // je ne recois pas l'id
    function submit(plat) {
      return axios.put(`http://localhost/quaiantique/plats/update`, plat)
        .then(response => {
          console.log(response);
          return response.data;
        })
        .catch(error => {
          console.log(error);
          throw error;
        });
    }

    function deleteId(plat) {
          console(plat.id)
      // return axios.delete(`http://localhost/quaiantique/plats/delete`, plat)
      //   .then(response => {
      //     console.log(response);
      //     return response.data;
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     throw error;
      //   });
    }
    return (
    <div>
      { <PlatsForm 
            isEditable={isEditable} 
            title={isEditable ? 'Modifie ton plat' :plat.title}
            plat={plat} 
            setFormValues={setFormValues}
            formValues={formValues}
            // onClickEdit={()=>{setIsEditable(!isEditable)}}
            // onClickTrash={()=>{supprimerNote(note)}}
            onSubmit={isEditable && submit}
            onClickTrash={isEditable && deleteId}
            />
          }
      
    </div>
  )
}

export async function getStaticProps(context) {
  const platId = context.params.idplat
  const data = await fetch('http://localhost/quaiantique/plats/read').then(res => res.json());
  const plats = data.plats;
  console.log(plats)
  const plat = plats.find(plat => ( plat.id.toString() === platId))
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