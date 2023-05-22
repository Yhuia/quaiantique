import React, { useState, useEffect } from 'react'
import PlatsForm from '@/components/PlatsForm/PlatsForm';
import axios from 'axios';
import { accountService } from '@/services/accountservice';
import { useRouter } from 'next/router'

export default function Idplat({plat}) {
    const isEditable = true;
    const router = useRouter();
    const [formValues, setFormValues] =  useState({
      id: plat ? parseFloat(plat.id) : null,
      titre: plat ? plat.titre : '',
      description: plat ? plat.description : '',
      prix: plat ? plat.prix : '',
      id_categorie: plat ? plat.id_categorie : '',
    });
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
    // je ne recois pas l'id
    function submit(plat) {
      return axios.put(`http://localhost/backend_quai_antique/plats/update`, plat)
        .then(response => {
          console.log(response);
          return response.data;
        })
        .catch(error => {
          console.log(error);
          throw error;
        });
    }

    return ( shouldRender &&
    <div>
      { <PlatsForm 
            isEditable={isEditable} 
            title={isEditable ? 'Modifie ton plat' : plat.title}
            plat={plat} 
            setFormValues={setFormValues}
            formValues={formValues}
            onSubmit={isEditable && submit}
            // onClickTrash={isEditable && deleteId}
            />
          }
      
    </div>
  )
}

export async function getStaticProps(context) {
  const platId = context.params.idplat
  const data = await fetch('http://localhost/backend_quai_antique/plats/read').then(res => res.json());
  const plats = data.plats;
  console.log(plats)
  const plat = plats.find(plat => ( plat.id.toString() === platId))
  return {
    props : {
      plat:plat,
    }
  }
}

export async function getStaticPaths() {
    const data = await fetch ('http://localhost/backend_quai_antique/plats/read');
    const dataPlats = await data.json();
    const plats = dataPlats.plats;
    const paths = plats.map((plat)=>( 
      {params : {idplat: plat.id.toString()}}
    ))
    return {
      paths,
      fallback : false
    }
}