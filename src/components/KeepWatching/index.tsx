import { useQuery } from 'react-query'
import { IEpisodesAnime } from '../../@types/Anime'
import { useAuth } from '../../hooks/useAuth'
import { api } from '../../service/api'

import style from './style.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EpisodeCardWatched } from '../Episode/EpisodeCardWatched'

export function KeepWatching() {
  const { user } = useAuth()

  const episodeIDs = user?.watchingEpisodes
    .filter((episode) => {
      if (episode.assistedTime > 0) return episode
    })
    .sort(
      (a, b) =>
        +(a.updatedAt > b.updatedAt) || +(a.updatedAt === b.updatedAt) - 1,
    )
    .map((epsiode) => epsiode.id)

  const { data: watchingEpisodesData } = useQuery({
    queryKey: ['myListAnimesData'],
    queryFn: async (): Promise<IEpisodesAnime[]> => {
      const { data } = await api.post('animes/episodes/', {
        episodeIDs: episodeIDs || [],
      })

      return data.episodes
    },
  })

  if (!user && !watchingEpisodesData) return null

  function checkEpisodeFinished(episode: IEpisodesAnime) {
    const episodeWatched = user?.watchingEpisodes.find(
      (e) => e.id === episode.id,
    )

    if (episodeWatched?.assistedTime) {
      return episode.duration - episodeWatched?.assistedTime >= 50
    }

    return false
  }

  return (
    <section className={style.keepWatching}>
      <h2>Continue assistido</h2>
      <Swiper slidesPerView="auto" spaceBetween={10}>
        {watchingEpisodesData
          ?.filter((episode) => checkEpisodeFinished(episode))
          .map((episode) => (
            <SwiperSlide key={episode.id}>
              <EpisodeCardWatched episode={episode} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  )
}
