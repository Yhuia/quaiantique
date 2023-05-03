import React from 'react'


export default function Plats({title,description,prix,onClickTrash,onClickEdit}) {
  return (
    <>
      <div>
        <p>{title}</p>
        <p>{description}</p>
        <p>{prix}</p>
        <button onClick={onClickTrash}>Supprimer</button>
        <button onClick={onClickEdit}>Modifier</button>
      </div>
    </>
  )
}
