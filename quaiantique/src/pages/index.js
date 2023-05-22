import Accueil from '@/components/Accueil/Accueil'
import Galerie from '@/components/Galerie/Galerie';
import Head from 'next/head';

export default function Home({imageGalerie}) {

  return (
    <>
      <Head>
        <title>Restaurant Le Quai Antique</title>
        <meta name="description" content="Bienvenue au restaurant Le Quai Antique, un établissement gastronomique français où la cuisine est notre passion. Venez savourer nos délicieux plats, élaborés avec soin par notre chef et son équipe, pour une expérience gustative inoubliable." />
      </Head>
      <main>
        <Accueil ></Accueil>
        <Galerie imageGalerie={imageGalerie}></Galerie>

      </main>
    </>
  )
}

export async function getStaticProps() {
  const data = await fetch('http://localhost/backend_quai_antique/galerie/read');
  const dataGalerie = await data.json();
  const imageGalerie = dataGalerie.images;
  return {
    props : {
      imageGalerie:imageGalerie
    }
  }    
}