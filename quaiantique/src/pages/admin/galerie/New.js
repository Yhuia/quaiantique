import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import GalerieForm from '@/components/GalerieForm/GalerieForm';

export default function New (props) {

  const router = useRouter();
  const [formValues,setFormValues] = useState({
        titre: '',
        url: '',
    })
    
  
  function addFormules (formValues) {
      axios.post('http://localhost/backend_quai_antique/galerie/create', formValues)
      .then(() => {
        router.push('/admin/galerie');;
      }).catch(error =>{
        console.error(error)
      }) 

    }
    
    // function addFormules (formValues) {
    //     const formData = new FormData();
    //     formData.append('titre', formValues.titre);
    //     formData.append('url', formValues.url);
    //     console.log(formValues)
    //     axios.post('http://localhost/quaiantique/galerie/create', formData,{headers: {
    //         'Content-Type': 'multipart/form-data'
    //       }})
    //       .then(() => {
    //         router.push('/admin/galerie');
    //       }).catch(error => {
    //         console.error(error);
    //       }) 
    //   }

  return (
    <div>
      <GalerieForm 
        title={'Créer un image'} 
        onSubmit={addFormules}
        setFormValues={setFormValues}
        formValues={formValues}
      >
      </GalerieForm>
    </div>
  )
}
