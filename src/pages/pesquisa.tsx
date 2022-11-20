import { GetServerSideProps } from 'next'
import Image from 'next/future/image'
import Head from 'next/head'
import { FormEvent, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { IAnimes } from '../@types/Anime'
import { Button } from '../components/Button'
import { CardAnime } from '../components/CardAnime'
import { api } from '../service/api'
import style from '../styles/Search.module.scss'

interface IResultsSearch {
    animes: IAnimes[];
    totalAnimes: number;
    nextPage: string | false;
}

interface ISearchProps {
    popularAnimes: IAnimes[]
}

const ANIMES_PER_PAGE = 12

export default function Search({ popularAnimes }: ISearchProps) {
    const [termSearch, setTermSearch] = useState('')
    const [results, setResults] = useState<IResultsSearch>()

    async function getAnimes() {
        
    }

    async function handleSearchAnime(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const { data } = await api.get(`/animes?keyword=${termSearch}&take=12`)
        setResults({...data})
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
                <form onSubmit={handleSearchAnime}>
                    <div className={style.search__containerInput}>
                        <FaSearch />
                        <input 
                            value={termSearch} 
                            onChange={({target}) => setTermSearch(target.value)}
                            type="search" 
                            placeholder="Hunter x Hunter"
                        />
                    </div>

                    <Button>
                        Pesquisar
                    </Button>
                </form>
            </div>

            <section>
                
            </section>

            { results ? (
                <section className={`${style.search__resultsContainer} container`}>
                    <h3>Resultados ({results.totalAnimes})</h3>

                    <div className={`${style.search__resultsContainer_animes} container`}>
                        {results.animes.map(anime => <CardAnime key={anime.slug} anime={anime} />)}
                    </div>
                </section>  
                
            ) : (
                
                <section className={`${style.search__resultsContainer} container`}>
                    <h3>Populares</h3>

                    <div className={`${style.search__resultsContainer_animes} container`}>
                        {popularAnimes.map(anime => <CardAnime key={anime.slug} anime={anime} />)}
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
            popularAnimes
        }
    }
}