import Link from 'next/link'
import React from 'react'

export default function Logingroup({path, title}) {
  return (
    <div>
      <Link href={`${path}`}><button>{title}</button></Link>
    </div>
  )
}
