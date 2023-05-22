import React from 'react'


export default function GalerieAdmin({title,url,onClickTrash,onClickEdit}) {
  return (
    <>
      <div>
        <p>{title}</p>
        <img src={`${url}`}></img>
        <button onClick={onClickTrash}>Supprimer</button>
        <button onClick={onClickEdit}>Modifier</button>
      </div>
    </>
  )
}
