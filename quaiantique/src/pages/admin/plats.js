import Plats from '@/components/Plat/Plats'
import PlatsForm from '@/components/PlatsForm/PlatsForm'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function plats() {
  const [dataPlat, setDataPlat] = useState([])
  
  async function fetchPlat () { 
    const dataAxios = await axios.get('http://localhost/quaiantique/plats/read')
    const response = dataAxios.data
    const data = await response.plats
    setDataPlat(data)
   }
  useEffect(()=>{
    fetchPlat ()
  },[])
  console.log(dataPlat)
  return (
    <div>
      <PlatsForm title={'Creation de note'} onSubmit={()=>{alert('salut')}}></PlatsForm>
      
      {dataPlat.map((plat)=>(
        <Plats key={plat.id}
        title= {plat.titre}
        description = {plat.description}
        prix = {plat.prix}
        onClickTrash = {() => alert('click')}
        onClick = {() => alert('click')}
        ></Plats>  
      ))}
      
    </div>
  )
}
