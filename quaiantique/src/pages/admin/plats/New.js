import React, { useState, useEffect } from 'react'
import PlatsForm from '@/components/PlatsForm/PlatsForm'
import axios from 'axios'
import { useRouter } from 'next/router'
import { accountService } from '@/services/accountservice';

export default function New (props) {
  const router = useRouter();

  const [formValues,setFormValues] = useState({
        titre: '',
        description: '',
        prix:  '',
        id_categorie : ''
    })
    
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
  
  function addPlats (formValues) {
      axios.post('http://localhost/backend_quai_antique/plats/create', formValues)
      .then(() => {
        router.push('/admin/plats');;
      }).catch(error =>{
        console.error(error)
      }) 

    }

  return ( shouldRender &&
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
