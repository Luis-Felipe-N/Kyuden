import { GetStaticPaths, GetStaticProps } from "next"
import { IEpisodesAnime } from "../../@types/Anime"
import { api } from "../../service/api"

interface IEpisodeProps {
    episode: IEpisodesAnime,
    remainingEpisodes: IEpisodesAnime[]
}

export default function Episodio({ episode, remainingEpisodes }: IEpisodeProps) {
    return (
        <main>
            <section>
                <div>
                    <iframe  width={1000} height={562.5} src={episode.linkEmbed} frameBorder="0"></iframe>
                </div>

            </section>
            <aside>
                { remainingEpisodes.map(episode => <li key={episode.id}>{episode.title}</li>) }
            </aside>
        </main>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const id = params?.id
    try {
        console.log(id)
        const { data } = await api.get(`/animes/episode/${id}`)

        console.log(data)

        const episode: IEpisodesAnime = data.episode
        const remainingEpisodes: IEpisodesAnime[] = data.remainingEpisodes

        return {
            props: {
                episode,
                remainingEpisodes
            },
            revalidate: 100
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
    
}