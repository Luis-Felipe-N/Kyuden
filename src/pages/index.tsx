import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { IAnimes } from '../@types/Anime'
import { CarouselAnimes } from '../components/Carousel'
import { Hero } from '../components/Hero'
import { PopularAnimes } from '../components/PopularAnimes'
import { api } from '../service/api'

const Home: NextPage = () => { 
  const [ animes, setAnimes ] = useState<IAnimes[]>()

  useEffect(() => {
    const getAnimes = async () => {
      const { data } = await api.get('/animes')
console.log(data)
      setAnimes(data.animes)
    }

    getAnimes()
  }, [])

  return (
    <main>
      <Hero />
      <PopularAnimes />
      { animes && <CarouselAnimes animes={animes} />}
      <h1>Categorias</h1>
      <h1>Categorias</h1>
      <h1>Categorias</h1>
      <h1>Categorias</h1>
    </main>
  )
}

export default Home
