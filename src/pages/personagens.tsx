import { useQuery } from "react-query"
import { Loading } from "../components/Loading"
import Image from "next/image"
import style from '../styles/Characters.module.scss'

interface ICharactersJikanAPI {
        data : {
            mal_id: number,
        url: string,
        images: {
            jpg: {
            image_url: string
            },
        },
        name: string,
        name_kanji: string,
        nicknames: string[],
        favorites: number,
        about: string
        }[]
}


export default function Personagens() {

    const {
        isLoading,
        data,
        isFetching,
      } = useQuery({
        queryKey: ['characters'],
        queryFn: (): Promise<ICharactersJikanAPI> =>
        fetch('https://api.jikan.moe/v4/characters').then(
          (res) => res.json(),
        ),
        keepPreviousData : true
      })

      console.log(data)

    return (
        <main className={style.characters}>
            { isLoading ? (
                <Loading width={200} />
            ) : data?.data ? (
                data.data.map(a => (
                    <div className={style.card} key={a.mal_id}>
                        <div  className={style.card__containerImg}>
                            <Image width={207} height={314} src={a.images.jpg.image_url} alt={`Imagem do personagem `} />
                        </div>
                        <strong>{a.name}</strong>
                    </div>
                ))
            ) : (
                "NAda"
            )}
        </main>
    )
}