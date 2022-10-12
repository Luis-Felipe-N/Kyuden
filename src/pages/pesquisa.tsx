import Image from 'next/future/image'
import Head from 'next/head'
import { FormEvent, useState } from 'react'
import { FaSearch, FaSearchPlus } from 'react-icons/fa'
import { IAnimes } from '../@types/Anime'
import { CardAnime } from '../components/CardAnime'
import { api } from '../service/api'
import style from '../styles/Search.module.scss'

export default function Search() {
    const [termSearch, setTermSearch] = useState('')
    const [animes, setAnimes] = useState<IAnimes[]>()

    async function handleSearchAnime(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const { data } = await api.get('/animes')
        setAnimes(data.animes)
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

                    <button>
                        Pesquisar
                    </button>
                </form>
            </div>

            { animes && (
                <div className={`${style.search__resultsContainer} container`}>
                    <h3>Resultados ({animes.length})</h3>

                    <div className={`${style.search__resultsContainer_animes} container`}>
                        {animes?.map(anime => <CardAnime key={anime.slug} anime={anime} />)}
                    </div>
                </div>      
            )}
        </main>
        </>
    )
}
