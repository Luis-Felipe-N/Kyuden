import Image from 'next/future/image'
import Link from 'next/link'
import { useState } from 'react'
import { Avatar } from '../Avatar'
import { Button } from '../Button'
import style from './style.module.scss'

export function Comments() {
    const [user, setUser] = useState(true)

    return (
        <section className={style.comments}>
            <div className={style.comments__header}>
                <strong>Comentários</strong>
                <span>
                    2
                </span>
            </div>

            <div className={style.comments__send}>
                { user ? (
                    <>
                        <Avatar src="/avatar.jpeg" />
                        <form>
                            <textarea placeholder='Deixe um comentário' />
<<<<<<< HEAD
                            <div>
                                <Button>Enviar</Button>
                            </div>
=======
                            <Button>Enviar</Button>
>>>>>>> 91e0b26dd14befebaf5fd5e617dc93f735ac6f93
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