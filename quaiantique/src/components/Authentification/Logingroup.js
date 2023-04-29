import Link from 'next/link'
import React from 'react'

export default function Logingroup() {
  return (
    <div>
      <Link href={'/auth/Login'}><h2>Connexion</h2></Link>
    </div>
  )
}
