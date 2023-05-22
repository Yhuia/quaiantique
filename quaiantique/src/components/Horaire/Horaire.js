import React from 'react'

export default function Horaire({title,heure_Midi_Ouv,heure_Midi_Ferm,heure_Soir_Ouv,heure_Soir_Ferm,onClickTrash,onClickEdit}) {
  return (
    <>
      <div>
        <p>{title}</p>
        <div>
            <p>Horaires Midi</p>
            <p>{heure_Midi_Ouv} h - {heure_Midi_Ferm} h</p>
        </div>
        <div>
            <p>Horaires Soir</p>
            <p>{heure_Soir_Ouv} h - {heure_Soir_Ferm} h</p>
        </div>
        <button onClick={onClickTrash}>Supprimer</button>
        <button onClick={onClickEdit}>Modifier</button>
      </div>
    </>
  )
}
