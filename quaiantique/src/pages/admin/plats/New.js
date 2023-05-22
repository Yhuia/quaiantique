import React, { useState } from 'react'
import PlatsForm from '@/components/PlatsForm/PlatsForm'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function New (props) {

  const router = useRouter();

  const [formValues,setFormValues] = useState({
        titre: '',
        description: '',
        prix:  '',
        id_categorie : ''
    })
    
  
  function addPlats (formValues) {
      axios.post('http://localhost/backend_quai_antique/plats/create', formValues)
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
        setFormValues={setFormValues}
        formValues={formValues}
      >
      </PlatsForm>
    </div>
  )
}
