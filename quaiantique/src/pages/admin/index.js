import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function Index() {
  const logged = true; 
  const router = useRouter()

  useEffect(() => {
    if(!logged){
      router.push('/auth/Login');
    }
  }, [])

  return (
    <div>
      Salut
    </div>
  )
}
