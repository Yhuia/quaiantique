import React from 'react'

export default function Plats({title,description,prix,onClickTrash,onClick}) {
  return (
    <div>
      <p>{title}</p>
      <p>{description}</p>
      <p>{prix}</p>
      <button onClick={onClickTrash}>Supprimer</button>
    </div>
  )
}
