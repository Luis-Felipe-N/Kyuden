import type { GetStaticProps, NextPage } from 'next'
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

  return (
    <main>
      <Hero anime={animeHero}/>
      <PopularAnimes animes={popularAnimes} />
      <CarouselAnimes genre='Shounen' />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </main>
  )
}



export const getStaticProps: GetStaticProps = async () => {
  // const { data } = await api.get('/animes/dorohedoro')
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