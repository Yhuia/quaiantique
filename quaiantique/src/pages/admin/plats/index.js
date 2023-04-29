import Plats from '@/components/Plat/Plats'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';


export default function plats() {
  const [dataPlat, setDataPlat] = useState([])
  const router = useRouter();
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
      <button onClick={()=>{router.push('plats/New')}}>Ajouter un plat</button>
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

