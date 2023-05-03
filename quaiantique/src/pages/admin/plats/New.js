import React, { useState } from 'react'
import PlatsForm from '@/components/PlatsForm/PlatsForm'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function New (props) {

  const router = useRouter();
  
  function addPlats (formValues) {
      axios.post('http://localhost/quaiantique/plats/create', formValues)
      .then(() => {
        router.push('/admin/plats');;
      }).catch(error =>{
        console.error(error)
      }) 

    }

  return (
    <div>
      <PlatsForm 
        title={'Créer un plat'} 
        onSubmit={addPlats}
      >
      </PlatsForm>
    </div>
  )
}
