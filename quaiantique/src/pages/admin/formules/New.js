import React, { useState } from 'react'

import axios from 'axios'
import { useRouter } from 'next/router'
import FormulesForm from '@/components/FormulesForm.js/FormulesForm';

export default function New (props) {

  const router = useRouter();

  const [formValues,setFormValues] = useState({
        titre: '',
        description: '',
        prix:  '',
    })
    
  
  function addFormules (formValues) {
      axios.post('http://localhost/quaiantique/formules/create', formValues)
      .then(() => {
        router.push('/admin/formules');;
      }).catch(error =>{
        console.error(error)
      }) 

    }

  return (
    <div>
      <FormulesForm 
        title={'Créer une formule'} 
        onSubmit={addFormules}
        setFormValues={setFormValues}
        formValues={formValues}
      >
      </FormulesForm>
    </div>
  )
}
