import Accueil from '@/components/Accueil/Accueil'
import Galerie from '@/components/Galerie/Galerie';


export default function Home({imageGalerie}) {

  return (
    <main>
      <Accueil ></Accueil>
      <Galerie imageGalerie={imageGalerie}></Galerie>

    </main>
  )
}

export async function getStaticProps() {
  const data = await fetch('http://localhost/quaiantique/galerie/read');
  const dataGalerie = await data.json();
  const imageGalerie = dataGalerie.images;
  return {
    props : {
      imageGalerie:imageGalerie
    }
  }    
}