import Plats from '@/components/Plat/Plats'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import NavAdmin from '@/components/NavAdmin/NavAdmin';
import s from '../container.module.css';
import axios from 'axios';
import { accountService } from '@/services/accountservice';

export default function Index({dataPlat}) {
  const [isEditable,setIsEditable] = useState(true)
  const router = useRouter();

  const [shouldRender, setShouldRender] = useState(false);
  async function ProtectedPage() {
    const isLoggedIn = await accountService.isLogged();
    const isAdmin = await accountService.isAdmin()
    if(!isLoggedIn){
      await router.push('/auth/Login');
      return null
    } else if (isLoggedIn && isAdmin === 0){
      await router.push('/account');
      return null;
    }
    setShouldRender(true)
    
  }

  useEffect(() => {
   async function checkProtected() {
       await ProtectedPage()
    }
    checkProtected()
    
  }, [])

  
  function onClickEdit(plat) {
    router.push({
      pathname: `/admin/plats/${plat.id}`,
    });
  }
  // Delete du plat
  function onClickTrash(plat) {
    alert(plat.id)
     const idPlat = plat.id
    return axios.delete(`http://localhost/backend_quai_antique/plats/delete`, {data: {id: idPlat}})
      .then(response => {
        console.log(response);
        return response.data;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  
  console.log(dataPlat)
  return ( shouldRender &&
    <div className={s.admin_container}>
      <div className={s.admin_navbar}>
        <NavAdmin></NavAdmin>
      </div>
      <section className={s.admin_section}>
        <button type='button' onClick={()=>{router.push('/admin/plats/New')}}>Ajouter un plat</button>
        {dataPlat.map((plat)=>(
          <div key={plat.id} >
          <Plats 
          title= {plat.titre}
          description = {plat.description}
          prix = {plat.prix}
          isEditable = {isEditable}
          onClickTrash = {()=>onClickTrash(plat)}
          onClickEdit = {()=>onClickEdit(plat)}
          ></Plats> 
          </div>
        ))}
      </section>
    </div>
  )
}

export async function getStaticProps() {
  const data = await fetch('http://localhost/quaiantique/plats/read');
  const dataPlats = await data.json();
  const plats = dataPlats.plats;
  return {
      props : {
        dataPlat:plats,
      }
  }
}



