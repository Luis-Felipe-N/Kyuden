import Head from 'next/head'
import { useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { IAnimes } from '../@types/Anime'
import { Avatar } from '../components/Avatar'
import { CardAnime } from '../components/CardAnime'
import { Loading } from '../components/Loading'
import { ModalEditProfile } from '../components/ModalEditProfile'
import { Skeleton } from '../components/Skeleton'
import { useAuth } from '../hooks/useAuth'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { api } from '../service/api'
import style from '../styles/Profile.module.scss'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

export default function Perfil() {
  const { user, loadingUser } = useAuth()
  const [width] = useWindowDimensions()

  const { asPath } = useRouter()

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : ''

  const URL = `${origin}${asPath}`

  const myListAnimes = useMemo(
    () =>
      user?.myListAnimes
        ? Object.entries(user.myListAnimes).map(([, animeSlug]) => animeSlug)
        : [],
    [user?.myListAnimes],
  )
  const watchedAnimes = user?.watchingEpisodes
    ? Object.entries(user.watchingEpisodes).map(([, episodeId]) => episodeId)
    : []

  const {
    isLoading: myListAnimesLoading,
    error: myListAnimesError,
    data: myListAnimesData,
    isFetching: myListAnimesFetching,
    refetch,
  } = useQuery({
    queryKey: ['myListAnimesData'],
    queryFn: async (): Promise<IAnimes[]> => {
      const { data } = await api.post('animes/', {
        animesSlug: myListAnimes,
      })

      return data.animes
    },
  })

  useEffect(() => {
    refetch()
  }, [myListAnimes, refetch])

  if (loadingUser)
    return (
      <main className={style.profile__loading}>
        <Head>
          <title>Perfil | Kyuden</title>
        </Head>
        <Loading width={200} />
      </main>
    )

  function createRangeArrayByNumber(number: number) {
    return [...Array(number).keys()]
  }

  return (
    <>
      {user ? (
        <NextSeo
          title={`Perfil ${user.displayName} | Kyuden`}
          description={`Perfil do ${user.displayName} no site Kyuden`}
          canonical={URL}
          openGraph={{
            url: URL,
            title: `Perfil ${user.displayName} | Kyuden`,
            description: `Perfil do ${user.displayName} no site Kyuden`,
            locale: 'PT_BR',
            images: [
              {
                url: user.avatar || '',
                width: 50,
                height: 50,
                alt: `Imagem de perfil do ${user.displayName}`,
                type: 'image/png',
              },
              {
                url: user.avatar || '',
                width: 50,
                height: 50,
                alt: `Imagem de perfil do ${user.displayName}`,
                type: 'image/png',
              },
              { url: user.avatar || '' },
              { url: user.avatar || '' },
            ],
            site_name: 'Kyuden',
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
      <main className={style.profile}>
        {user && (
          <>
            <Head>
              <title>Kyuden :: {user.displayName}</title>
            </Head>
            <section
              className={style.profile__banner}
              style={{
                backgroundImage: `linear-gradient(0deg, rgb(23, 25, 35) 0%, rgba(23, 25, 35, 0.91) 8%, rgba(23, 25, 35, 0.84) 18%, rgba(23, 25, 35, 0.66) 26%, rgba(0, 212, 255, 0) 61%), url(${
                  width && width > 700 ? user.banner : user.avatar
                })`,
              }}
            >
              <div className={style.profile__banner_container}>
                <div>
                  <ModalEditProfile />
                </div>

                <div>
                  {width &&
                    width > 700 &&
                    (user?.avatar ? (
                      <Avatar
                        hasBorder
                        className={style.profile__banner_avatar}
                        src={user?.avatar}
                        fallback={user.displayName[0]}
                      />
                    ) : (
                      <Avatar
                        className={style.profile__banner_avatar}
                        fallback={user.displayName[0]}
                      />
                    ))}
                  <div>
                    <h1>{user?.displayName}</h1>
                    <small>{user.email}</small>
                    <ul>
                      <li>Favoritos ({myListAnimes.length})</li>
                      <li>Animes assistidos ({watchedAnimes.length})</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            <section className={style.profile__animes}>
              <div className={style.profile__countanimes}>
                <h1>Animes</h1>
                <ul>
                  <li>Favoritos ({myListAnimes.length})</li>
                  <li>Assistindo</li>
                </ul>
              </div>
              <div className={style.profile__animes_container}>
                {myListAnimesLoading || myListAnimesFetching ? (
                  createRangeArrayByNumber(myListAnimes.length).map(
                    (item: any) => (
                      <Skeleton key={item} width={210} height={305} />
                    ),
                  )
                ) : myListAnimesError ? (
                  <div className={style.profile__animes_errorMessage}>
                    <span>Vixii!</span>
                    <strong>
                      Alguma coisa deu errado em buscar seus animes favorito!
                    </strong>
                    <strong>:(</strong>
                  </div>
                ) : myListAnimesData ? (
                  myListAnimesData.map((anime) => (
                    <CardAnime key={anime.slug} anime={anime} />
                  ))
                ) : (
                  <p>Lista vazia</p>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </>
  )
}
