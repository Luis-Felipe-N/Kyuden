import type { GetStaticProps } from 'next'
import Head from 'next/head'
import { IAnimes } from '../@types/Anime'
import { CarouselAnimes } from '../components/Carousel'
import { Hero } from '../components/Hero'
import { PopularAnimes } from '../components/PopularAnimes'
import { api } from '../service/api'
import { KeepWatching } from '../components/KeepWatching'
import { useAuth } from '../hooks/useAuth'
import style from '../styles/Home.module.scss'


interface IHomeProps {
  animeHero: IAnimes;
  animesGenres: {
    name: string,
    animes: IAnimes[]
  }[];
  popularAnimes: IAnimes[]
}


export default function Home({animeHero, animesGenres, popularAnimes}: IHomeProps) {

  const { user } = useAuth()
  
  return (
    <>
    <Head>
      <title>Kyuden :: Inicio</title>
      
    </Head>
    <main className={style.home}>
      <Hero anime={animeHero}/>
      <PopularAnimes animes={popularAnimes} />
      { !!user?.watchingEpisodes && <KeepWatching />}
      { animesGenres && animesGenres.map((animeGenre, index) => !!animeGenre.animes.length && (
        <CarouselAnimes key={animeGenre.name} genre={animeGenre.name} animes={animeGenre.animes} />  
      ))}
    </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {  
  const { data: animeHero } = await api.get('/animes/chainsaw-man')

  const { data } = await api.get('/animes/popular')
  const { data: animeGenreAction } =  await api.get(`animes/genre/Ação?take=20`)
  const { data: animeGenreFiccaoCientifica } =  await api.get(`animes/genre/Ficção científica?take=20`)
  const { data: animeGenreEsporte } =  await api.get(`animes/genre/Esporte?take=20`)
  const { data: animeGenreMagia } =  await api.get(`animes/genre/Magia?take=20`)
  const { data: animeGenreEscolar } =  await api.get(`animes/genre/Escolar?take=20`)
  const { data: animeGenreAdventure } =  await api.get(`animes/genre/Aventura?take=20`)
  const { data: animeGenreComedy } =  await api.get(`animes/genre/Comédia?take=20`)
  const { data: animeGenreMilitar } =  await api.get(`animes/genre/Militar?take=20`)
  const { data: animeGenreMusical } =  await api.get(`animes/genre/Musical?take=20`)
  

  const { animes } = data

  return {
      props: {
          animeHero: animeHero.anime || null,
          animesGenres: [
            {
              name: "Aventura",
              animes: animeGenreAdventure.animes || null
            },
            {
              name: "Comédia",
              animes: animeGenreComedy.animes || null
            },
            {
              name: "Ação",
              animes: animeGenreAction.animes || null
            },
            {
              name: "Ficção científica",
              animes: animeGenreFiccaoCientifica.animes || null
            },
            {
              name: "Esporte",
              animes: animeGenreEsporte.animes || null
            },
            {
              name: "Magia",
              animes: animeGenreMagia.animes || null
            },
            {
              name: "Escolar",
              animes: animeGenreEscolar.animes || null
            },
            {
              name: "Militar",
              animes: animeGenreMilitar.animes || null
            },
            {
              name: "Musical",
              animes: animeGenreMusical.animes || null
            }
            
          ],
          popularAnimes: animes || null
      },
      revalidate: 60 * 60 * 24 * 7 // 1 Dia
  }
}
