import React, { useState } from 'react'
import HoraireForm from '@/components/HoraireForm/HoraireForm';
import axios from 'axios'
import { useRouter } from 'next/router'

export default function New (props) {

  const router = useRouter();

  const [formValues,setFormValues] = useState({
        jour_de_la_semaine: "",
        heure_midi_ouverture: "",
        heure_midi_fermeture:  "",
        heure_soir_ouverture:  "",
        heure_soir_fermeture:  "",
    })
  
  function addFormules (formValues) {
      axios.post('http://localhost/quaiantique/hours/create', formValues)
      .then(() => {
        router.push('/admin/horaires');;
      }).catch(error =>{
        console.error(error)
      }) 

    }

  return (
    <div>
      <HoraireForm 
        title={'Créer une horaire'} 
        onSubmit={addFormules}
        setFormValues={setFormValues}
        formValues={formValues}
      >
      </HoraireForm>
    </div>
  )
}
