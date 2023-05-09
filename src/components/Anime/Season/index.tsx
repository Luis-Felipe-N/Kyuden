import { useState } from 'react';
import { useQuery } from 'react-query';
import { IAnimes, IEpisodesAnime } from '../../../@types/Anime'
import { api } from '../../../service/api';
import { createRangeArrayByNumber } from '../../../utils/array';
import { EpisodeCard } from '../../Episode/EpisodeCard';
import { SelectSeason } from '../../SelectSeason'
import { Skeleton } from '../../Skeleton';
import style from './style.module.scss'

interface ISeasonProps {
    anime: IAnimes;
    firstSeason: string;
}

export function Season({anime, firstSeason}: ISeasonProps) {
    const [currentSeason, setCurrentSeason] = useState<string | null>(firstSeason)

    function getNextSeasonAnimes(season: string | null): Promise<IEpisodesAnime[]> | undefined {
        if (!season) return undefined

        return api.get(`/animes/season/${currentSeason}/episodes`).then(res => res.data.episodes)
    }

    const {
        isLoading,
        data,
        isFetching,
      } = useQuery({
        queryKey: ['episodes', currentSeason],
        queryFn: () => getNextSeasonAnimes(currentSeason),
        keepPreviousData : true
      })

    function handleChangeSeason(value: string) {
        setCurrentSeason(value)
    }

    return (
        <div className={style.season}>
            <div className={style.season__header}>
                <SelectSeason seasons={anime.seasons}  onChangeSeason={handleChangeSeason}/>
            </div>

            <div className={style.season__episodes}>
                { isLoading || isFetching ? (
                    createRangeArrayByNumber(8).map(item => (
                        <Skeleton key={item} height={200} />
                    ))
                ) : !!data ? (
                    data.filter(episode => !!episode.duration).map(episode => episode.duration && (
                        <EpisodeCard key={episode.id} episode={episode} anime={anime} />
                    ))
                ) : (
                    "Sem episódios"
                )}
        </div>
        </div>
    )
}