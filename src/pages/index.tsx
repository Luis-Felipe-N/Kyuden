import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { IAnimes } from '../@types/Anime'
import { CarouselAnimes } from '../components/Carousel'
import { Hero } from '../components/Hero'
import { PopularAnimes } from '../components/PopularAnimes'
import { api } from '../service/api'



interface IHomeProps {
  animeHero: IAnimes;
  popularAnimes: IAnimes[]
}


export default function Home({animeHero, popularAnimes}: IHomeProps) { 
  console.log(animeHero)
  return (
    <>
    <Head>
      <title>Kyuden :: Inicio</title>
    </Head>
    <main>
      <Hero anime={animeHero}/>
      <PopularAnimes animes={popularAnimes} />
      <CarouselAnimes genre='Comédia' />
      <CarouselAnimes genre='Ação' />
      <CarouselAnimes genre='Terror' />
      <CarouselAnimes genre='Aventura' />
    </main>
    </>
  )
}



export const getStaticProps: GetStaticProps = async () => {
  // const { data } = await api.get('/animes/dorohedoro')
  // const response = await fetch(`http://localhost:3333/animes/popular`)
  // const data = await response.json()
  const { data } = await api.get('/animes/popular')
  const { animes } = data

  return {
      props: {
          animeHero: animes[0],
          popularAnimes: animes
      },

      revalidate: 60 * 60 * 24 // 1 Dia
  }
}