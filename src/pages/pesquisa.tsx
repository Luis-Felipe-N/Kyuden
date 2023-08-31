import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { IAnimes } from '../@types/Anime'
import { CardAnime } from '../components/CardAnime'
import { api } from '../service/api'
import style from '../styles/Search.module.scss'

import { Loading } from '../components/Loading'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper'

const GENRES = [
  {
    name: 'Ação',
    slug: 'acao',
  },
  {
    name: 'Fantasia',
    slug: 'fantasia',
  },
  {
    name: 'Legendado',
    slug: 'legendado',
  },
  {
    name: 'Letra D',
    slug: 'letra-d',
  },
  {
    name: 'Seinen',
    slug: 'seinen',
  },
  {
    name: 'Sobrenatural',
    slug: 'sobrenatural',
  },
  {
    name: 'Letra M',
    slug: 'letra-m',
  },
  {
    name: 'Comédia',
    slug: 'comedia',
  },
  {
    name: 'Escolar',
    slug: 'escolar',
  },
  {
    name: 'Shounen',
    slug: 'shounen',
  },
  {
    name: 'Ecchi',
    slug: 'ecchi',
  },
  {
    name: 'Harém',
    slug: 'harem',
  },
  {
    name: 'Letra Y',
    slug: 'letra-y',
  },
  {
    name: 'Letra K',
    slug: 'letra-k',
  },
  {
    name: 'Aventura',
    slug: 'aventura',
  },
  {
    name: 'Letra I',
    slug: 'letra-i',
  },
  {
    name: 'Letra T',
    slug: 'letra-t',
  },
  {
    name: 'Romance',
    slug: 'romance',
  },
  {
    name: 'Histórico',
    slug: 'historico',
  },
  {
    name: 'Letra J',
    slug: 'letra-j',
  },
  {
    name: 'Letra E',
    slug: 'letra-e',
  },
  {
    name: 'Magia',
    slug: 'magia',
  },
  {
    name: 'Letra A',
    slug: 'letra-a',
  },
  {
    name: 'Letra H',
    slug: 'letra-h',
  },
  {
    name: 'Super Poderes',
    slug: 'super-poderes',
  },
  {
    name: 'Letra S',
    slug: 'letra-s',
  },
  {
    name: 'Ficção científica',
    slug: 'ficcao-cientifica',
  },
  {
    name: 'Letra N',
    slug: 'letra-n',
  },
  {
    name: 'Letra B',
    slug: 'letra-b',
  },
  {
    name: 'Mistério',
    slug: 'misterio',
  },
  {
    name: 'Letra U',
    slug: 'letra-u',
  },
  {
    name: 'Drama',
    slug: 'drama',
  },
  {
    name: 'Horror',
    slug: 'horror',
  },
  {
    name: 'Letra C',
    slug: 'letra-c',
  },
  {
    name: 'Esporte',
    slug: 'esporte',
  },
  {
    name: 'Letra F',
    slug: 'letra-f',
  },
  {
    name: 'Sem Censura',
    slug: 'sem-censura',
  },
  {
    name: 'Demônios',
    slug: 'demonios',
  },
  {
    name: 'Artes Marciais',
    slug: 'artes-marciais',
  },
  {
    name: 'Mecha',
    slug: 'mecha',
  },
  {
    name: 'Letra W',
    slug: 'letra-w',
  },
  {
    name: 'Slice Of Life',
    slug: 'slice-of-life',
  },
  {
    name: 'Letra L',
    slug: 'letra-l',
  },
  {
    name: 'Letra R',
    slug: 'letra-r',
  },
  {
    name: 'China',
    slug: 'china',
  },
  {
    name: 'Letra G',
    slug: 'letra-g',
  },
  {
    name: 'Letra O',
    slug: 'letra-o',
  },
  {
    name: 'Shoujo',
    slug: 'shoujo',
  },
  {
    name: 'Jogo',
    slug: 'jogo',
  },
  {
    name: 'Militar',
    slug: 'militar',
  },
  {
    name: 'Musical',
    slug: 'musical',
  },
  {
    name: 'Dublado',
    slug: 'dublado',
  },
  {
    name: 'Samurai',
    slug: 'samurai',
  },
  {
    name: 'Terror',
    slug: 'terror',
  },
  {
    name: 'Suspense',
    slug: 'suspense',
  },
  {
    name: 'Misterio',
    slug: 'misterio-2',
  },
  {
    name: 'Light Novel',
    slug: 'light-novel',
  },
  {
    name: 'Letra X',
    slug: 'letra-x',
  },
  {
    name: 'Letra Q',
    slug: 'letra-q',
  },
  {
    name: 'Letra P',
    slug: 'letra-p',
  },
  {
    name: 'Policial',
    slug: 'policial',
  },
  {
    name: 'Crime',
    slug: 'crime',
  },
  {
    name: 'Letra V',
    slug: 'letra-v',
  },
  {
    name: 'Yuri',
    slug: 'yuri',
  },
  {
    name: 'Guerra',
    slug: 'guerra',
  },
  {
    name: 'Letra Z',
    slug: 'letra-z',
  },
  {
    name: 'Yaoi',
    slug: 'yaoi',
  },
  {
    name: 'Kids',
    slug: 'kids',
  },
]

interface IResultsSearch {
  animes: IAnimes[]
  totalAnimes: number
  nextPage: string | false
}

interface ISearchProps {
  popularAnimes: IAnimes[]
}

let timeOutSearch: any

const ANIMEPERVIEW = 30

export default function Search({ popularAnimes }: ISearchProps) {
  const [termSearch, setTermSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<IResultsSearch>()

  function handleTermSearch() {
    setLoading(true)
    clearTimeout(timeOutSearch)
    timeOutSearch = setTimeout(async () => {
      const { data } = await api.get(
        `/animes?keyword=${termSearch}&take=${ANIMEPERVIEW}`,
      )
      setResults({ ...data })
      setLoading(false)
    }, 700)
  }

  function handleSearchAnimesByGenre(genre = '') {
    setLoading(true)
    clearTimeout(timeOutSearch)
    timeOutSearch = setTimeout(async () => {
      const { data } = await api.get(
        `/animes?keyword=${termSearch}&take=${ANIMEPERVIEW}&genre=${genre}`,
      )
      setResults({ ...data })
      setLoading(false)
    }, 700)
  }

  return (
    <>
      <Head>
        <title>Kyuden :: Busca</title>
      </Head>
      <main className={style.search}>
        <div className={`container ${style.search__input}`}>
          <Image
            width={200}
            height={275}
            src="/gon-search.png"
            alt="Gon fazendo sinal de lupa com a mão"
            className={style.search__input_gonImage}
          />
          <h1>Encontre o anime perfeito para você</h1>
          <form>
            <div className={style.search__containerInput}>
              <FaSearch />
              <input
                value={termSearch}
                onKeyUp={() => handleTermSearch()}
                onChange={({ target }) => setTermSearch(target.value)}
                type="search"
                placeholder="Hunter x Hunter"
              />
            </div>
          </form>
        </div>

        <div className={`container ${style.search__genres}`}>
          <Swiper slidesPerView="auto" spaceBetween={15} modules={[Navigation]}>
            {GENRES.sort(
              (a, b) => +(a.name > b.name) || +(a.name === b.name) - 1,
            ).map((genre) => (
              <SwiperSlide key={genre.slug}>
                <span
                  onClick={() => handleSearchAnimesByGenre(genre.slug)}
                  className={style.search__genres_item}
                >
                  {genre.name}
                </span>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {loading ? (
          <section className={`${style.search__resultsContainer} container`}>
            <h3>Buscando...</h3>

            <div
              className={`${style.search__resultsContainer_loading} container`}
            >
              <Loading width={100} />
            </div>
          </section>
        ) : results ? (
          <section className={`${style.search__resultsContainer} container`}>
            <h3>Resultados ({results.totalAnimes})</h3>

            <div
              className={`${style.search__resultsContainer_animes} container`}
            >
              {results.animes ? (
                results.animes.map((anime) => (
                  <CardAnime key={anime.slug} anime={anime} />
                ))
              ) : (
                <img
                  alt="Gon sentado pescando"
                  src="gon-notfound.gif"
                  width="200"
                  height="200"
                />
              )}
            </div>
          </section>
        ) : (
          <section className={`${style.search__resultsContainer} container`}>
            <h3>Populares</h3>

            <div
              className={`${style.search__resultsContainer_animes} container`}
            >
              {popularAnimes.map((anime) => (
                <CardAnime key={anime.slug} anime={anime} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('animes/popular')
  const popularAnimes = data.animes
  return {
    props: {
      popularAnimes,
    },
  }
}
