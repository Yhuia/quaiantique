import React, { useState } from 'react';
import axios from 'axios';

export default function FormAllergieUser({ dataAllergies, userId,dataUser,setDataUser }) {
  const [allergies, setAllergies] = useState([]);


  console.log(dataAllergies)
  console.log(dataUser)
  const handleInputChange = (e) => {
    if (e.target.name === 'allergies') {
      const allergyId = parseInt(e.target.value);
      if (e.target.checked) {
        
        // Ajouter l'id de l'allergie au tableau
        setAllergies([...allergies, allergyId]);
        
      } else {
        // Retirer l'id de l'allergie du tableau
        setAllergies(allergies.filter((id) => id !== allergyId));
      }
    }
  };
  

console.log(allergies)
  async function handleSubmit(e) {
    e.preventDefault();
    
    const data = {
      id: userId,
      allergies: allergies,
    };

    await axios
      .patch('http://localhost/quaiantique/users/update', data)
      .then((response) => {
        console.log(response.data);
        setDataUser(response.data)
      })
      .catch((error, response) => {
        console.error(error);
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
        // Gérer les erreurs
      });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>Choisis tes allergies:</label>
      {dataAllergies.map((allergie) =>(
        <div key={allergie.id}>
          <input
            type="checkbox"
            id={allergie.id}
            name="allergies"
            value={allergie.id}
            onChange={handleInputChange}
          />
          <label htmlFor={allergie.id}>{allergie.titre} </label>
        </div>
      ))}
      <button type="submit">Mettre à jour</button>
    </form>
  );
}
