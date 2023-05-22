import React, { useEffect, useState } from 'react'

import axios from 'axios';
import HoraireForm from '@/components/HoraireForm/HoraireForm';
export default function Idhoraire({horaire}) {
    const isEditable = true;
    const [formValues, setFormValues] =  useState({
      id: horaire ? parseFloat(horaire.id) : null,
      jour_de_la_semaine: horaire ? horaire.jour_de_la_semaine : '',
      heure_midi_ouverture: horaire ? horaire.heure_midi_ouverture ?? '' : '',
      heure_midi_fermeture: horaire ? horaire.heure_midi_fermeture ?? '' : '',
      heure_soir_ouverture: horaire ? horaire.heure_soir_ouverture ?? '' : '',
      heure_soir_fermeture: horaire ? horaire.heure_soir_fermeture ?? '': '',
    });
    const [horaireMidiOuvNull, setHoraireMidiOuvNull] = useState(false)
    const [horaireMidiFermNull, setHoraireMidiFermNull] = useState(false)
    const [horaireSoirOuvNull, setHoraireSoirOuvNull] = useState(false)
    const [horaireSoirFermNull, setHoraireSoirFermNull] = useState(false)
    // Changement du state du checkbox si null
    function validateNull() {
        if(formValues.heure_midi_ouverture == "") {
            setHoraireMidiOuvNull(!horaireMidiOuvNull)
        } 
        if(formValues.heure_midi_fermeture == ""){
            setHoraireMidiFermNull(!horaireMidiFermNull)
        } 
        if(formValues.heure_soir_ouverture == ""){
            setHoraireSoirOuvNull(!horaireSoirOuvNull)
        } 
        if(formValues.heure_soir_fermeture == ""){
          setHoraireSoirFermNull(!horaireSoirFermNull)
        }}

    useEffect(()=>{
        validateNull()
    },[])
    console.log(formValues)

    // je ne recois pas l'id
    function submit(horaire) {
      return axios.put(`http://localhost/backend_quai_antique/hours/update`, horaire)
        .then(response => {
          console.log(response);
          return response.data;
        })
        .catch(error => {
          console.log(error);
          throw error;
        });
    }

    return (
    <div>
      { <HoraireForm 
            isEditable={isEditable} 
            title={isEditable ? 'Modifie ton horaire' : horaire.title}
            horaire={horaire} 
            setFormValues={setFormValues}
            formValues={formValues}
            onSubmit={isEditable && submit}

            horaireMidiOuvNull={horaireMidiOuvNull}
            horaireMidiFermNull={horaireMidiFermNull}
            horaireSoirOuvNull={horaireSoirOuvNull}
            horaireSoirFermNull={horaireSoirFermNull}
            setHoraireMidiFermNull={setHoraireMidiFermNull}
            setHoraireSoirOuvNull={setHoraireSoirOuvNull}
            setHoraireMidiOuvNull={setHoraireMidiOuvNull}
            setHoraireSoirFermNull={setHoraireSoirFermNull}

            />
          }
      
    </div>
  )
}

export async function getStaticProps(context) {
  const horaireId = context.params.idHoraires
  const data = await fetch('http://localhost/quaiantique/hours/read').then(res => res.json());
  const horaires = data.horaires;
  console.log(horaires)
  const horaire = horaires.find(horaire => ( horaire.id.toString() === horaireId))
  return {
    props : {
      horaire:horaire,
    }
  }
}

export async function getStaticPaths() {
    const data = await fetch ('http://localhost/quaiantique/hours/read');
    const datahoraires = await data.json();
    const horaires = datahoraires.horaires;
    const paths = horaires.map((horaire)=>( 
      {params : {idHoraires: horaire.id.toString()}}
    ))
    return {
      paths,
      fallback : false
    }
}