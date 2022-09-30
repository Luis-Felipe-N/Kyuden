import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { api } from '../service/api'

const Home: NextPage = () => {
  const [animes, setAnimes] = useState([])

  useEffect(() => {
    api.get('/animes').then(res => {
      console.log(res.data)
      setAnimes(res.data.animes)
    })
  }, [])

  return (
    <div>
      {animes.length && animes.map(anime => (
        <div key={anime.title}>
          {anime.title}
          {/* {anime.youtubeVideoId ? (
            <div >

              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${anime.youtubeVideoId}?autoplay=1&controls=0&showinfo=0&autohide=1`} 
                title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
            </div>
          ) : (
            <img width={400} src={anime.cover} alt="" />

          )} */}
        </div>
      ))}
    </div>
  )
}

export default Home
