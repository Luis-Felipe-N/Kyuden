import Link from 'next/link'
import { FaGithub, FaTwitch, FaTwitter } from 'react-icons/fa'
import { ButtonIcon } from '../ButtonIcon'
import style from './style.module.scss'

export function Footer() {
    return (
        <footer className={style.footer} >
            <div className='container'>
                <h1>Kyuden</h1>
                <p>Site desenvolvido para disponibilizar o entreterimento gratuito</p>
                <div className={style.footer__links}>
                    <ButtonIcon>
                        <Link href="http://github.com/Luis-Felipe-N" target="_blank">
                                <FaGithub size={25} />
                        </Link>
                    </ButtonIcon>
                    <ButtonIcon>
                        <Link href="http://github.com/Luis-Felipe-N" target="_blank">
                                <FaTwitter size={25} />
                        </Link>
                    </ButtonIcon>
                </div>
            </div>
        </footer>
    )
}