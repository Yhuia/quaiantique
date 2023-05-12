import React, { useEffect, useState } from 'react'
import s from './style.module.css';
import axios from 'axios';
import { ValidatorForm } from '@/services/ValidateForm/ValidatorForm';
import InputError from '../InputError/InputError';


const VALIDATIONFORM = {
    titre : (value) =>{
      return ValidatorForm.min(value,3) || ValidatorForm.max(value,55);
    },
    description : (value) => {
        return ValidatorForm.min(value,3) || ValidatorForm.max(value,1000);
    },
}

export default function PlatsForm({
    title,
    setFormValues,
    formValues,
    onClickEdit,
    onClickTrash,
    onSubmit,
    }) {
    const [categories, setCategories] = useState([])
    const [formErrors,setFormErrors] = useState({
        titre : undefined, 
        description: undefined
    })
    // validation des erreurs
    function validate (fieldName, fieldValue) {
        setFormErrors({...formErrors,[fieldName]:VALIDATIONFORM[fieldName](fieldValue)})       
    }


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
        validate(e.target.name, e.target.value)
    }
    console.log(formErrors)
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
            <label className={s.form_label} htmlFor='titre'>Titre</label>
            <input value={formValues.titre} onChange={updateFormValue} name='titre'  className={s.form_input} type='text' ></input>
            <InputError msg={formErrors.titre}></InputError>
        </div>
        <div className={s.form_group}>
            <label className={s.form_label} htmlFor='description'>Description</label>
            <input value={formValues.description} onChange={updateFormValue} name='description'  className={s.form_input} type='text' ></input>
            <InputError msg={formErrors.description}></InputError>
        </div>
        <div className={s.form_group}>
            <label className={s.form_label} htmlFor='prix'>Prix</label>
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

