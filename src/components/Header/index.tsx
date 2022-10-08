import Image from "next/future/image";
import Link from "next/link";
import style from "./style.module.scss"
import { FaChevronDown } from 'react-icons/fa'
import { DropdownGenres } from "./DropdownGenres";

export function Header() {
    return (
        <header className={style.headerContainer}>
            <div className={style.header}>
                <h1>
                    Meu kyuden
                </h1>

                <nav className={style.menu}>
                    <ul className={style.menuContainer}>
                        <li className={style.menu__item}>
                            <Link href={"/"}>Inicio</Link>
                        </li>
                        <li className={style.menu__item}>
                            <Link href={"/minha-lista"}>Doação</Link>
                        </li>
                        <li className={style.menu__item}>
                            <DropdownGenres />                             
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