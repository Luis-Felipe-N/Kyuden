import Image from "next/image"
import { IAnimes } from "../../@types/Anime"

interface ICardAnimesProps {
    anime: IAnimes
}

export function CardAnime({ anime }: ICardAnimesProps) {
    return (
        <div>
            <Image
                src={anime.post}
                width={210}
                height={315}
                alt={`Poste do anime ${anime.title}`}
            />
        </div>
    )
}