import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { FaShare } from 'react-icons/fa'
import { IAnimes, IEpisodesAnime } from '../../@types/Anime'
import { Button } from '../../components/Button'
import { Comments } from '../../components/Comments'
import { Skeleton } from '../../components/Skeleton'
import { api } from '../../service/api'

import style from '../../styles/Episode.module.scss'
import { NextEpisode } from '../../components/Episode/nextEpisode'
import { Player } from '../../components/Episode/Player'
import { formatDate } from '../../utils/date'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { NextSeo } from 'next-seo'

interface IEpisodeProps {
  episode: IEpisodesAnime
  remainingEpisodes: IEpisodesAnime[]
  anime: IAnimes
}

export default function Episodio({
  episode,
  remainingEpisodes,
  anime,
}: IEpisodeProps) {
  const { asPath } = useRouter()
  const remainingEpisodesSorted = remainingEpisodes.sort((a, b) => {
    const titleA = new Number(a.title.replace('Episodio ', ''))
    const titleB = new Number(b.title.replace('Episodio ', ''))

    if (titleA < titleB) {
      return -1
    }
    if (titleA > titleB) {
      return 1
    }

    return 0
  })
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : ''

  const URL = `${origin}${asPath}`

  function handleCopyLink() {
    navigator.clipboard
      .writeText(URL)
      .then((res) =>
        toast.success(
          'O link do episódio foi copiado para que você possa compartilhá-lo',
        ),
      )
      .catch((res) =>
        toast.error('Desculpe, nao foi possível compartilha o episódio'),
      )
  }

  return (
    <>
      {episode ? (
        <NextSeo
          title={`${episode.title} ${anime.title} | Kyuden`}
          description={`${episode.title} do anime ${anime.title} | ${anime.description}`}
          canonical={URL}
          openGraph={{
            url: URL,
            title: episode.title,
            description: `${episode.title} do anime ${anime.title}`,
            locale: 'PT_BR',
            images: [
              {
                url: episode.image,
                width: 177.78,
                height: 100,
                alt: `Imagem de capa do anime ${episode.title} ${episode.title}`,
                type: 'image/png',
              },
              {
                url: episode.image,
                width: 177.78,
                height: 100,
                alt: `Imagem de capa do anime ${episode.title} ${episode.title}`,
                type: 'image/png',
              },
              { url: episode.image },
              { url: episode.image },
            ],
            site_name: episode.title,
          }}
          twitter={{
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image',
          }}
        />
      ) : (
        <NextSeo
          title="Kyuden: A sua casa de animes."
          description="Kyuden é um site dedicado a todos os fãs de anime. Com uma vasta coleção de animes populares e clássicos."
          canonical={URL}
          openGraph={{
            url: URL,
            title: 'Kyuden: A sua casa de animes.',
            description:
              'Kyuden é um site dedicado a todos os fãs de anime. Com uma vasta coleção de animes populares e clássicos.',
            locale: 'PT_BR',
            images: [
              {
                url: './banner.png',
                width: 177.78,
                height: 100,
                alt: `Imagem de banner do site Kyuden`,
                type: 'image/png',
              },
              {
                url: './banner.png',
                width: 177.78,
                height: 100,
                alt: `Imagem de banner do site Kyuden`,
                type: 'image/png',
              },
              { url: './banner.png' },
              { url: './banner.png' },
            ],
            site_name: 'Kyuden: A sua casa de animes.',
          }}
          twitter={{
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image',
          }}
        />
      )}
      <main className={`${style.episode} container`}>
        {episode ? (
          <>
            <section className={style.episode__epvideo}>
              <Player episode={episode} />
              <div className={style.episode__info}>
                <div className={style.episode__info_ep}>
                  <h3>{episode.title}</h3>
                  <Link href={`/anime/${anime.slug}`}>
                    <div className={style.episode__info_anime}>
                      <Image
                        src={anime.post}
                        width={50}
                        height={50}
                        alt={`Poster do anime ${anime.title}`}
                      />
                      <div>
                        <h4>{anime.title}</h4>
                        <span>{anime.rating} pontos de avaliação</span>
                      </div>
                    </div>
                  </Link>
                  <time>Lançado em {formatDate(episode.uploaded_at)}</time>
                </div>

                <div className={style.episode__info_options}>
                  <Button
                    onClick={handleCopyLink}
                    title="Compartilhar episódio"
                    aria-label="Compartilhar episódio"
                  >
                    <FaShare size={20} />
                    Compartilha
                  </Button>
                </div>
              </div>
            </section>
            <Comments episode={episode} />
            <aside className={style.episode__remainingEpisodes}>
              <NextEpisode
                episode={episode}
                remainingEpisodes={remainingEpisodesSorted}
              />
            </aside>
          </>
        ) : (
          <>
            <section className={style.episode__epvideo}>
              <Skeleton width={1000} height={500} />

              <Skeleton width={1000} height={100} />
            </section>
            <section>
              <Skeleton width={1000} height={500} />
            </section>
            <aside className={style.episode__remainingEpisodes}>
              <Skeleton height={1000} />
            </aside>
          </>
        )}
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id

  const { data } = await api.get(`/animes/episode/${id}`)

  return {
    props: {
      ...data,
    },
    revalidate: 60 * 60 * 24 * 7, // 1 Dia
  }
}
