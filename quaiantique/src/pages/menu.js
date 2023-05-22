import Formules from '@/components/Formules/Formules';
import Menu from '@/components/Menu/Menu';
import React from 'react'
import s from '@/styles/menu.module.css';
import Head from 'next/head';

export default function menu({plats,categories,formules}) {

  return (
    <>
    <Head>
        <title>Menu - Restaurant Le Quai Antique</title>
        <meta
          name="description"
          content="Découvrez notre délicieux menu au restaurant Le Quai Antique. Explorez nos formules et nos plats savoureux, préparés avec soin par notre chef et son équipe. Réservez votre table dès maintenant!"
        />
    </Head>
    <div>
        <div className={s.menu_section_container_title}>
        <h4 className={s.menu_section_title}>Nos Formules</h4>

            {formules.length >0 && formules.map((formule)=>(
                <Formules key={formule.id} formule={formule}></Formules>
            ))}
            
        </div>
        <div>
            {categories.map((categorie)=>(
                <Menu key={categorie.id} plats={plats} categorie ={categorie.id} title={categorie.nom}></Menu>
            ))}
        </div>   
    </div>
    </>
  )
}

export async function getStaticProps() {
    const data = await fetch('http://localhost/backend_quai_antique/plats/read');
    const dataPlats = await data.json();
    const plats = dataPlats.plats;
    
    const dataCategory = await fetch('http://localhost/backend_quai_antique/category/read');
    const categorieGet = await dataCategory.json();
    const categories = categorieGet.category;

    const dataformules = await fetch('http://localhost/backend_quai_antique/formules/read');
    const formulesJson = await dataformules.json();
    const formules = formulesJson.formules;
    const dataA = await fetch('http://localhost/backend_quai_antique/allergies/read');
    const dataAllergies = await dataA.json();


   
    return {
        props : {
            plats:plats,
            categories:categories,
            formules:formules
        }
    }
}
