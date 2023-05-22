import React, { useState } from 'react'
import axios from 'axios';
import FormulesForm from '@/components/FormulesForm.js/FormulesForm';

export default function Idformules({formule}) {
    const isEditable = true;
    const [formValues, setFormValues] =  useState({
      id: formule ? parseFloat(formule.id) : null,
      titre: formule ? formule.titre : '',
      description: formule ? formule.description : '',
      prix: formule ? formule.prix : '',
      id_categorie: formule ? formule.id_categorie : '',
    });
    // je ne recois pas l'id
    function submit(formule) {
      return axios.put(`http://localhost/backend_quai_antique/formules/update`, formule)
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
      { <FormulesForm 
            isEditable={isEditable} 
            title={isEditable ? 'Modifie ta formules' : formule.title}
            formule={formule} 
            setFormValues={setFormValues}
            formValues={formValues}
            onSubmit={isEditable && submit}
            
            />
          }
      
    </div>
  )
}

export async function getStaticProps(context) {
  const formuleId = context.params.idformules
  const data = await fetch('http://localhost/backend_quai_antique/formules/read').then(res => res.json());
  const formules = data.formules;
  console.log(formules)
  const formule = formules.find(formule => ( formule.id.toString() === formuleId))
  return {
    props : {
      formule:formule,
    }
  }
}

export async function getStaticPaths() {
    const data = await fetch ('http://localhost/backend_quai_antique/formules/read');
    const dataformules = await data.json();
    const formules = dataformules.formules;
    const paths = formules.map((formule)=>( 
      {params : {idformules: formule.id.toString()}}
    ))
    return {
      paths,
      fallback : false
    }
}