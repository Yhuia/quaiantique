import React, { useEffect, useState } from 'react'
import s from './horaires.module.css';

export default function Horaires() {
    const [hours, setHours] = useState([])
    async function hoursHoraire () {
        const dataHours = await fetch('http://localhost/quaiantique/hours/read');
        const jsonHours = await dataHours.json();
    // on supprime les secondes grâce à slice et join
        const hours = jsonHours.horaires.map(hour =>({
            ...hour, 
                heure_midi_ouverture: hour.heure_midi_ouverture ? hour.heure_midi_ouverture.split(':').slice(0, 2).join(':') : null,
                heure_midi_fermeture: hour.heure_midi_fermeture ? hour.heure_midi_fermeture.split(':').slice(0, 2).join(':') : null,
                heure_soir_ouverture: hour.heure_soir_ouverture ? hour.heure_soir_ouverture.split(':').slice(0, 2).join(':') : null,
                heure_soir_fermeture: hour.heure_soir_fermeture ? hour.heure_soir_fermeture.split(':').slice(0, 2).join(':') : null,
        }))
    setHours(hours)
    }
    useEffect(()=>{
        hoursHoraire()
    },[])

  return (
    <div>
        <h4>Nos Horaires d'ouvertures</h4>
      {hours && hours.map((hour)=>(
        <div className={s.hours_container} key={hour.id} >
            <p className={s.hours_day}>{hour.jour_de_la_semaine}</p>
            <div>
                {hour.heure_midi_fermeture || hour.heure_midi_ouverture || hour.heure_soir_fermeture || hour.heure_soir_ouverture ?
                <>
                    {hour.heure_midi_ouverture && hour.heure_midi_fermeture && <p className={s.hours_open}>{hour.heure_midi_ouverture} - {hour.heure_midi_fermeture}</p>}
                    {hour.heure_soir_ouverture && hour.heure_soir_fermeture && <p className={s.hours_open}>{hour.heure_soir_ouverture} - {hour.heure_soir_fermeture}</p>}
                </>
                : <p className={s.hours_dayClose}>Fermé </p>
                }
            </div>
        </div>
      ))}
    </div>
  )
}
