import PlatsForm from '@/components/PlatsForm/PlatsForm'
import axios from 'axios'
import React from 'react'

export default function New (props) {
    function addPlats (formValues) {
      axios.post('http://localhost/quaiantique/plats/create', formValues)
      .then(response => {
        console.log(response.data)
      }).catch(error =>{
        console.error(error)
      }) 
    }

  return (
    <div>
      <PlatsForm title={'Créer un plat'} onSubmit={addPlats}></PlatsForm>
    </div>
  )
}
