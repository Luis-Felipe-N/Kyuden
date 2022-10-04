import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Hero } from '../components/Hero'
import { api } from '../service/api'

const Home: NextPage = () => {
  return (
    <main>
      <Hero />
    </main>
  )
}

export default Home
