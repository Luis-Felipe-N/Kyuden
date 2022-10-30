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
                        <Link href="http://github.com/Luis-Felipe-N" >
                            <a target="_blank">
                                <FaGithub size={25} />
                            </a>
                        </Link>
                    </ButtonIcon>
                    <ButtonIcon>
                        <Link href="http://github.com/Luis-Felipe-N" >
                            <a target="_blank">
                                <FaTwitter size={25} />
                            </a>
                        </Link>
                    </ButtonIcon>
                </div>
            </div>
        </footer>
    )
}