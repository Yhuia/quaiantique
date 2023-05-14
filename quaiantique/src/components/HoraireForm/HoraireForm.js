import React, { useEffect, useState } from 'react'
import s from './style.module.css';

export default function HoraireForm({
    title,
    setFormValues,
    isEditable,
    formValues,
    onClickEdit,
    onClickTrash,
    onSubmit,
    }) {

    const [horaireMidiOuvNull, setHoraireMidiOuvNull] = useState(false)
    const [horaireMidiFermNull, setHoraireMidiFermNull] = useState(false)
    const [horaireSoirOuvNull, setHoraireSoirOuvNull] = useState(false)
    const [horaireSoirFermNull, setHoraireSoirFermNull] = useState(false)
      
    function updateFormValue(e) {
        e.preventDefault()
        let value = e.target.value 
        setFormValues({
            ...formValues,
            [e.target.name]: value
        })
        // validate(e.target.name, e.target.value)
    }
    function HandleHoraireMidiOuvNull() {
        setHoraireMidiOuvNull(!horaireMidiOuvNull)
    }
    function HandleHoraireMidiFermNull() {
        setHoraireMidiFermNull(!horaireMidiFermNull)
    }
    function HandleHoraireSoirOuvNull() {
        setHoraireSoirOuvNull(!horaireSoirOuvNull)
    }
    function HandleHoraireSoirFermNull() {
        setHoraireSoirFermNull(!horaireSoirFermNull)
    }

    const actionIcons = <>
        <div>
            {onClickEdit && <button onClick={onClickEdit}>Modifier</button>}
            {onClickTrash &&  <button onClick={onClickTrash}>Supprimer</button>}
        </div>
    </>
  return (
    <div>
    
      <div>{title}</div>
        {actionIcons}
      <form  className={s.form_container}>
        <div className={s.form_group}>
            <label className={s.form_label} htmlFor='jour_de_la_semaine'>Jour de la semaine</label>
            <input value={formValues.jour_de_la_semaine} onChange={updateFormValue} name='jour_de_la_semaine'  className={s.form_input} type='text' ></input>
        </div>

       
        {/* Midi ouverture */}
        <div className={s.form_group}>
            {/* Si c'est nul il faut desactiver les champs et envoyer en valeur null */}
            <label className={s.form_label} htmlFor='heure_midi_ouverture'>{"Horaire d'ouverture - Midi"}</label>
            
            <div>
                <input id='heureMidiOuverture' onClick={HandleHoraireMidiOuvNull} type='checkbox' value={formValues.heure_midi_ouverture}></input>
                <label htmlFor="heureMidiOuverture">Fermé</label>
            </div>
            {horaireMidiOuvNull ? 
             <p>Pas d'Horaire d'ouverture à midi </p> :
            <input value={formValues.heure_midi_ouverture} onChange={updateFormValue} name='heure_midi_ouverture'  className={s.form_input} type='time' ></input>
            } 
        </div>
        {/* Midi fermeture */}
        <div className={s.form_group}>
            <label className={s.form_label} htmlFor='heure_midi_fermeture'>Horaire de fermeture - Midi</label>
            <div>
                <input id='heureMidiFermeture' onClick={HandleHoraireMidiFermNull} type='checkbox' value={formValues.heure_midi_fermeture}></input>
                <label htmlFor="heureMidiFermeture">Fermé</label>
            </div>
            {horaireMidiFermNull ? 
             <p>Pas d'Horaire de fermeture à midi </p> :
            <input value={formValues.heure_midi_fermeture} onChange={updateFormValue} name='heure_midi_fermeture'  className={s.form_input} type='time' ></input>
            }
        </div>
        {/* Soir ouverture */}
        <div className={s.form_group}>
            <label className={s.form_label} htmlFor='heure_soir_ouverture'>{"Horaire d'ouverture - Soir"}</label>
            <div>
                <input id='heureSoirOuverture' onClick={HandleHoraireSoirOuvNull} type='checkbox' value={formValues.heure_soir_ouverture}></input>
                <label htmlFor="heureSoirOuverture">Fermé</label>
            </div>
            {horaireSoirOuvNull ? 
             <p>Pas d'Horaire d'ouverture le soir </p> :
            <input value={formValues.heure_soir_ouverture} onChange={updateFormValue} name='heure_soir_ouverture'  className={s.form_input} type='time' ></input>
            }
        </div>
        {/* Soir fermeture */}
        <div className={s.form_group}>
            <label className={s.form_label} htmlFor='heure_soir_fermeture'>{"Horaire de fermeture - Soir"}</label>
            <div>
                <input id='heureSoirFermeture' onClick={HandleHoraireSoirFermNull} type='checkbox' value={formValues.heure_soir_fermeture}></input>
                <label htmlFor="heureSoirFermeture">Fermé</label>
            </div>
            {horaireSoirFermNull ? 
             <p>Pas d'Horaire de fermeture le soir </p> :
            <input value={formValues.heure_soir_fermeture} onChange={updateFormValue} name='heure_soir_fermeture'  className={s.form_input} type='time' ></input>
            }
        </div>

        <button   type='button' onClick={() => onSubmit(formValues)}>Envoyer</button>
    </form> 
      

    </div>
  )
}

