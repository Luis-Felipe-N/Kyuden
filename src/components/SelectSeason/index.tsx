import { ISeasonsAnime } from '../../@types/Anime'
import * as Select from '@radix-ui/react-select';

import style from './style.module.scss'
import { FaCheck } from 'react-icons/fa';

interface ISelectSeasonProps {
    seasons: ISeasonsAnime[];
    onChangeSeason: (value: string) => void
}

export function SelectSeason({ seasons, onChangeSeason }: ISelectSeasonProps) {
    const defaultValue = seasons[0].id

    return (
        <Select.Root defaultValue={defaultValue} onValueChange={onChangeSeason}>
            <Select.Trigger aria-label='Temporadas' className={style.selectSeason__trigger}>
                <Select.Value placeholder="Escolha uma temporada" />
            </Select.Trigger>
            <Select.Content className={style.selectSeason__content}>
                <Select.Viewport>
                    { seasons.map(season => (
                        <Select.Item className={style.selectSeason__item} key={season.id} value={season.id}>
                            <Select.ItemIndicator className={style.selectSeason__item_check}>
                                <FaCheck />
                            </Select.ItemIndicator>
                            <Select.ItemText>
                                {season.title}
                            </Select.ItemText>
                            
                        </Select.Item>
                    ))}
                </Select.Viewport>
            </Select.Content>
        </Select.Root>
    )
}