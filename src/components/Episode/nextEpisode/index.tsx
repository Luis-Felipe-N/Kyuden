import { IEpisodesAnime } from '../../../@types/Anime'
import { useEpisode } from '../../../hooks/useEpisode'
import { EpisodeCard } from '../EpisodeCard'

interface INextEpisodeProps {
  episode: IEpisodesAnime
  remainingEpisodes: IEpisodesAnime[]
}

export function NextEpisode({ episode, remainingEpisodes }: INextEpisodeProps) {
  const { getNextEpisode } = useEpisode()

  const nextEpisode =
    episode && remainingEpisodes
      ? getNextEpisode(remainingEpisodes, episode)
      : false

  if (!nextEpisode) return null

  return (
    <>
      <h3>Próximo episódio</h3>
      <EpisodeCard episode={nextEpisode} />
    </>
  )
}
