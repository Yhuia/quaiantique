import React, { useEffect,useState } from 'react'
import { accountService } from '@/services/accountservice';
import { useRouter } from 'next/router';

import FormAllergieUser from '@/components/FormAllergiesUser/FormAllergiesUser';

export default function Account({dataAllergies}) {
  const [shouldRender, setShouldRender] = useState(false);
  const [dataUser, setDataUser] = useState(false);
  const [userId, setUserID] = useState(false)
  const router = useRouter();

  async function ProtectedPage() {
    const isLoggedIn = await accountService.isLogged();
    const user = await accountService.isUser()
    setUserID(user)
    if(!isLoggedIn){
      await router.push('/auth/Login');
      return null
    } 
    setShouldRender(true)
  }
  
  async function getOneUser(userId) {
    if (userId) {
      const data = await fetch(`http://localhost/quaiantique/users/readone?id=${userId}`);
      const dataUser = await data.json();
      const userObj  = dataUser.users;
      
      setDataUser(userObj )
    }
  }
  console.log(dataUser )
  console.log(userId)
 
  useEffect(() => {
    async function checkProtected(id) {
      await ProtectedPage()
      await getOneUser(id)     
    }
    checkProtected(userId)
  }, [userId])

  const allergies = dataUser?.[0]?.allergies;
  return ( shouldRender &&
    <div>
        <div>
          <p>Email :</p>
          <p>{dataUser?.[0]?.email}</p>
          <p> Tes allergies actuelles :</p>
          <div>
          {allergies && allergies.map((allergie)=> (
            <p key={allergie}>{allergie}</p>
          ))}
          </div>
          <FormAllergieUser dataUser={dataUser} setDataUser={setDataUser} userId={userId}  dataAllergies ={dataAllergies}></FormAllergieUser>
        </div>
    </div>
  )
}


export async function getStaticProps() {
  const data = await fetch('http://localhost/quaiantique/allergies/read');
  const dataAllergies = await data.json();
  const allergies = dataAllergies.allergies;
  
  return {
    
    props: {
      dataAllergies: allergies  // Assurez-vous de fournir un tableau vide par défaut si les allergies sont non définies
    }
  };
}


