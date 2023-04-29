import React, { useState } from 'react'
import s from './style.module.css';

export default function Galerie({imageGalerie}) {
    const [imgalt, setImgalt] = useState(null)
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    
    function mouseHoverImage (index) {
        if(selectedImageIndex === index){
            setSelectedImageIndex(null)
            setImgalt(null)
        } else{
            setSelectedImageIndex(index)
            setImgalt(imageGalerie[index].titre)
            
        }
    }
  return (
    <div>
        
        <h4>Notre gallerie</h4>
        <div className={s.galerie_container}>
            {imageGalerie.map((image,index) =>{
                
                return( 
                <div onMouseEnter={()=> mouseHoverImage(index)}  className={s.galerie_image_container} key={image.id}>
                    <img  className={s.galerie_image} src={image.url} alt={image.titre}></img>            
                    {selectedImageIndex === index && <p className={s.galerie_text}>{imgalt}</p>}
                </div>)
            })}
        
        </div>
    </div>
  )
}
