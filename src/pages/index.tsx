import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { IAnimes } from '../@types/Anime'
import { CarouselAnimes } from '../components/Carousel'
import { Hero } from '../components/Hero'
import { PopularAnimes } from '../components/PopularAnimes'
import { api } from '../service/api'

const Home: NextPage = () => { 

  return (
    <main>
      <Hero />
      <PopularAnimes />
      <CarouselAnimes genre="acao" />
      <h1>Categorias</h1>
      <h1>Categorias</h1>
      <h1>Categorias</h1>
      <h1>Categorias</h1>
    </main>
  )
}

export default Home
