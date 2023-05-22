import Contact from '@/components/Contact/Contact'
import Horaires from '@/components/Horaires/Horaires'
import React from 'react'
import Head from 'next/head';
export default function nosinformations() {
  
  return (
    <>
      <Head>
        <title>Contact - Restaurant Le Quai Antique</title>
        <meta
          name="description"
          content="Contactez-nous pour réserver une table ou pour toute demande d'information. Notre équipe est à votre disposition pour vous offrir une expérience culinaire exceptionnelle au restaurant Le Quai Antique."
        />
      </Head>
      <div>
        <Contact></Contact>
        <Horaires></Horaires>
      </div>
    </>
  )
}
