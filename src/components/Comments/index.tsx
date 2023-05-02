import Image from 'next/future/image'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Avatar } from '../Avatar'
import { Button } from '../Button'
import style from './style.module.scss'

export function Comments() {
    const { user } = useAuth()

    return (
        <section className={style.comments}>
            <div className={style.comments__header}>
                <span>
                    2
                </span>
                <strong>comentários</strong>
            </div>

            <div className={style.comments__send}>
                { user ? (
                    <>
                        {user?.avatar ? (
                            <Avatar style={{width: "3rem", height: "3rem", lineHeight: "3rem"}} className={style.navigation__avatar} src={user?.avatar} fallback={user.displayName[0]} />
                        ) : (
                            <Avatar style={{width: "3rem", height: "3rem", lineHeight: "3rem"}} className={style.navigation__avatar} fallback={user.displayName[0]} />
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
                    <Avatar src="/avatar.jpeg" alt="Imagem de perfil do usuario" />
                    <div>
                        <strong>Luis Felipe</strong> <span>@luisfelipe</span>
                        <time>Enviado a 2 horas atrás</time>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore omnis consequuntur impedit, doloribus doloremque labore exercitationem illo magnam quo harum quaerat dolore iusto illum delectus molestiae aspernatur. In, minus vel!</p>
                    </div>
                </li>
                <li className={style.comment}>
                <Avatar src="/avatar.jpeg" alt="Imagem de perfil do usuario" />
                    <div>
                        <strong>Luis Felipe</strong> <span>@luisfelipe</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore omnis consequuntur impedit, doloribus doloremque labore exercitationem illo magnam quo harum quaerat dolore iusto illum delectus molestiae aspernatur. In, minus vel!</p>
                    </div>
                </li>
                <li></li>
            </ul>
        </section>
    )
}