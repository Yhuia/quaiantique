import React, { useState } from 'react'

export default function Galerie({imageGalerie}) {
    console.log(imageGalerie)
    const [imgalt, setImgalt] = useState(null)

  return (
    <div>
        {imageGalerie.map((image) =>{
            function mouseHoverImage () {
                setImgalt(image.title)
            }
            return( 
            <div>
                <img onMouseEnter={mouseHoverImage} src={image.url} alt={image.titre}></img>            
                <p>{imgalt}</p>
            </div>)
        })}
      
    </div>
  )
}
