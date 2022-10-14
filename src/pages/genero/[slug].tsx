import { GetStaticPaths, GetStaticProps } from "next"
import { IAnimes, IGenres } from "../../@types/Anime"
import { CardAnime } from "../../components/CardAnime"
import { api } from "../../service/api"

interface IGenreProps {
    animes: IAnimes[]
}

export default function Genero({animes}: IGenreProps) {
    console.log(animes)
    return (

        <main>
            <section>
                Lista Generos
            </section>
            <section>
                { animes.map(anime => (
                    <CardAnime key={anime.slug} anime={anime} />
                ))}
            </section>
        </main>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await api.get('animes/genres')

    const genres = data.genres.map((genre: IGenres) => {
        return {
            params: { slug: genre.slug}
        }
    })
    return {
        paths: genres,
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

    const slug = params?.slug
    let animes: IAnimes[]

    if (slug) {
        const { data } = await api.get(`animes/genres/${slug}`)
        animes = data.animes
    } else {
        const { data } = await api.get('/animes/popular')
        animes = data.animes
    }


    return {
        props: {
            animes
        }
    }
}