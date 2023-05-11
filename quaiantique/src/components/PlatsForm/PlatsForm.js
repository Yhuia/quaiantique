import React, { useEffect, useState } from 'react'
import s from './style.module.css';
import axios from 'axios';

export default function PlatsForm({
    title,
    isEditable,
    setFormValues,
    formValues,
    onClickEdit,
    onClickTrash,
    onSubmit,
    plat}) {
    const [categories, setCategories] = useState([])
    // const [formValues,setFormValues] = useState({
    //     id: plat ? parseFloat(plat.id) :null,
    //     titre: plat ? plat.titre : '',
    //     description:  plat ? plat.description :'',
    //     prix:  plat ? plat.prix : '',
    //     id_categorie : plat ? plat.id_categorie :''
    // })
    console.log(formValues.id_categorie)
    
    function updateFormValue(e) {
        e.preventDefault()
        let value = e.target.value 
        // convertir les virgules en point dans le backend
        if(e.target.name === 'prix'){
            value = value.replace(',', '.');
        }
        setFormValues({
            ...formValues,
            [e.target.name]: value
        })
        
    }
    async function getCategorie() {
        const dataCategory = await  axios.get('http://localhost/quaiantique/category/read')
        const categories = await dataCategory.data.category
        setCategories(categories)
    }
    useEffect(()=>{
        getCategorie()
    },[])

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
            <label  className={s.form_label} htmlFor='titre'>Titre</label>
            <input value={formValues.titre} onChange={updateFormValue} name='titre'  className={s.form_input} type='text' ></input>
        </div>
        <div className={s.form_group}>
            <label  className={s.form_label} htmlFor='description'>Description</label>
            <input value={formValues.description} onChange={updateFormValue} name='description'  className={s.form_input} type='text' ></input>
        </div>
        <div className={s.form_group}>
            <label  className={s.form_label} htmlFor='prix'>Prix</label>
            {/* Accepte que chiffre de 0à9,decimal et , et . */}
            <input 
                value={formValues.prix}
                onChange={updateFormValue} 
                name='prix'  
                className={s.form_input} 
                pattern="[0-9]+([,\.][0-9]+)?" 
                type='text' 
                ></input>
        </div>
        <select name="id_categorie" onChange={updateFormValue}>
            <option value='' defaultValue>-- Choisir une catégorie --</option>
            {categories && categories.map((categorie)=>(
                <option key={categorie.id} value={categorie.id}>{categorie.nom}</option>
            ))}
            
        </select>


        <button type='button' onClick={() => onSubmit(formValues)}>Envoyer</button>
    </form> 
      

    </div>
  )
}

