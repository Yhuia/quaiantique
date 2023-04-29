import React from 'react'
import Image from 'next/image'
import s from './style.module.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Accueil() {
  return (
    <>
        <div className={s.home_container}>
            <Image 
            className={`${s.home_image} ${s.home_responsive_image}`}
            width={2500} 
            height={1667} 
            src={'/quaiAntique_restaurant.png'}
            alt='Restaurant le Quai Antique'
            priority={true}
            >
            </Image>
        </div>
        
        <div className={s.home_container}>  
            <hr className={s.home_hr}></hr>
            <h4>Découvrez le Quai Antique</h4>
            <hr className={s.home_hr}></hr>
            <p className={s.home_text}>Bienvenue au restaurant Le Quai Antique, un établissement gastronomique français où la cuisine est notre passion. Nous vous invitons à vous asseoir à notre table pour découvrir une cuisine raffinée, préparée avec des produits frais et de qualité. Nous sommes fiers de vous offrir une expérience culinaire exceptionnelle, dans une atmosphère chaleureuse et conviviale. Venez savourer nos délicieux plats, élaborés avec soin par notre chef et son équipe, pour une expérience gustative inoubliable.</p>
            <hr className={s.home_hr}></hr>
        </div>
        

    </>
  )
}
