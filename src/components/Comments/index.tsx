import Image from 'next/future/image'
import Link from 'next/link'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { IUser } from '../../@types/User'
import { useAuth } from '../../hooks/useAuth'
import { getUserData } from '../../service/firebase'
import { Avatar } from '../Avatar'
import { Button } from '../Button'
import style from './style.module.scss'

export function Comments() {
    const { user } = useAuth()

    const { isLoading: userDataLoading, error: userDataError, data: userDataData } = useQuery({
        queryKey: ['userDataData'],
        queryFn: async (): Promise<IUser | null> => {
            return getUserData(user?.uid || null)
        },
    })

    return (
        <section className={style.comments}>
            <div className={style.comments__header}>
                <span>
                    2
                </span>
                <strong>comentários</strong>
            </div>

            <div className={style.comments__send}>
                { userDataData ? (
                    <>
                        {userDataData?.avatar ? (
                            <Avatar hasBorder style={{width: "3rem", height: "3rem", lineHeight: "3rem"}} className={style.navigation__avatar} src={userDataData?.avatar} fallback={userDataData.displayName[0]} />
                        ) : (
                            <Avatar style={{width: "3rem", height: "3rem", lineHeight: "3rem"}} className={style.navigation__avatar} fallback={userDataData.displayName[0]} />
                        )}
                        <form>
                            <textarea placeholder='Deixe um comentário' />
                            <div>
                                <Button>Enviar</Button>
                            </div>
                        </form>
                    </>
                ) : (   
                    <h1>Faca <Link href='/entrar'>login</Link> para deixar um comentario</h1>
                )}
            </div>  

            <ul className={style.comments__content}>
                <li className={style.comment}>
                    <Avatar style={{width: "3rem", height: "3rem", lineHeight: "3rem"}} src="/avatar.jpeg" alt="Imagem de perfil do usuario" />
                    <div>
                        <strong>Luis Felipe</strong> <span>@luisfelipe</span>
                        <time>Enviado a 2 horas atrás</time>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore omnis consequuntur impedit, doloribus doloremque labore exercitationem illo magnam quo harum quaerat dolore iusto illum delectus molestiae aspernatur. In, minus vel!</p>
                    </div>
                </li>
                <li className={style.comment}>
                <Avatar style={{width: "3rem", height: "3rem", lineHeight: "3rem"}} src="/avatar.jpeg" alt="Imagem de perfil do usuario" />
                    <div>
                        <strong>Luis Felipe</strong> <span>@luisfelipe</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore omnis consequuntur impedit, doloribus doloremque labore exercitationem illo magnam quo harum quaerat dolore iusto illum delectus molestiae aspernatur. In, minus vel!</p>
                    </div>
                </li>
            </ul>
        </section>
    )
}