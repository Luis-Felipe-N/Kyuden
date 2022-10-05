import Image from "next/image";
import Link from "next/link";
import style from "./style.module.scss"
import { FaChevronDown } from 'react-icons/fa'

export function Header() {
    return (
        <header className={style.headerContainer}>
            <div className={style.header}>
                <Image
                    src="/logo.png"
                    width={102}
                    height={39}
                    alt="Logo escrito ANIMx"
                />

                <nav className={style.menu}>
                    <ul className={style.menuContainer}>
                        <li className={style.menu__item}>
                            <span>Gêneros <FaChevronDown/> </span>

                            <ul className={style.dropdown}>
                                <li className={style.dropdown__item}>
                                    <Link href={'acao'}>
                                        <a>Ação</a>
                                    </Link>
                                </li>
                                <li className={style.dropdown__item}>
                                    <Link href={'/acao'}>
                                        <a>Comédia</a>
                                    </Link>
                                </li>
                                <li className={style.dropdown__item}>
                                    <Link href={'/acao'}>
                                        <a>Shounen</a>
                                    </Link>
                                </li>
                                <li className={style.dropdown__item}>
                                    <Link href={'/acao'}>
                                        <a>Yuri</a>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className={style.menu__item}>
                            <Link href={"/minha-lista"}>Minha lista</Link>
                        </li>
                    </ul>
                </nav>

                <div>
                    <div className={style.user}>
                        <span>Bem vindo, <strong>Luis Felipe</strong></span>
                        <Image 
                            src="/avatar.png"
                            width={50}
                            height={50}
                            alt="Avatar do usuário"
                        />
                    </div>
                </div>
            </div>

        </header>
    )
}