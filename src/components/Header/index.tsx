import Image from "next/future/image";
import Link from "next/link";
import style from "./style.module.scss"
import { Navigation } from "./Navigation";
import { FiMenu } from "react-icons/fi";
import { ButtonIcon } from "../ButtonIcon";
import { useState } from "react";
// import { useWindowDimesions } from "../../hooks/useWindowDimensions";

export function Header() {
    const [ menuIsOpen, setMenuIsOpen ] = useState(false)

    return (
        <header className={style.headerContainer}>
            <div className={style.header}>
                <Link href="/">
                    <a>
                        <h1>
                            Kyuden
                        </h1>
                    </a>
                </Link>
                <div className={menuIsOpen ? `${style.menu} ${style.active}` : style.menu}>

                    <Navigation />

                    <div className={style.userContainer}>
                        <div className={style.userContainer__user}>
                            <div className={style.userContainer__user_info}>
                                <span>Bem vindo, <strong>Luis Felipe</strong></span>
                                <span>Desenvolvedor</span>
                            </div>
                            <Image 
                                src="/avatar.png"
                                width={50}
                                height={50}
                                alt="Avatar do usuário"
                            />
                        </div>
                    </div>
                </div>

                <ButtonIcon
                    className={style.header__btnMenu}
                    aria-label={menuIsOpen ? "Fechar menu" : "Abrir menu"}
                    title={menuIsOpen ? "Fechar menu" : "Abrir menu"}
                    tabIndex={0}
                    onClick={() => setMenuIsOpen(!menuIsOpen)}
                >
                    <FiMenu size={25} />
                </ButtonIcon>
            </div>

        </header>
    )
}