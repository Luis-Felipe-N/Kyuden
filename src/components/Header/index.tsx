import Image from "next/future/image";
import Link from "next/link";
import style from "./style.module.scss"
import { Navigation } from "./Navigation";
import { ButtonIcon } from "../ButtonIcon";
import { Button } from '../Button'
import { createRef, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useClickOutSide } from "../../hooks/useClickOutSide";
import { SignOut, User } from "phosphor-react";

export function Header() {
    const [ menuIsOpen, setMenuIsOpen ] = useState(false)
    const { user } = useAuth()

    const { onClickOutSide } = useClickOutSide()

    const menuRef = createRef<HTMLDivElement>()
    const btnMenuRef = createRef<HTMLElement>()
    
    useEffect(() => {
        if (menuIsOpen && menuRef.current) {
            onClickOutSide(menuRef, menuIsOpen, setMenuIsOpen)
        }
    }, [menuIsOpen, onClickOutSide, menuRef])

    return (
        <header className={style.headerContainer}>
            <div className={style.header} ref={menuRef}>
                <Link href="/">
                    <a>
                        <h1>
                            Kyuden
                        </h1>
                    </a>
                </Link>
                <div className={menuIsOpen ? `${style.menu} ${style.active}` : style.menu}>
                    <Navigation setStateMenu={setMenuIsOpen} stateMenu={menuIsOpen} />
                </div>

                <div className={style.userContainer}>

                    { !!user ? (
                        <>

                        <div className={style.userContainer__user}>
                            <div>
                                <div className={style.userContainer__user_info}>
                                    <span>Bem vindo, <strong>{user.displayName}</strong></span>
                                </div>
                                <Image 
                                    src="/avatar.jpeg"
                                    width={45}
                                    height={45}
                                    alt="Avatar do usuário"
                                />
                            </div>
                            <div className={style.userContainer__dropdown}>
                                <ul>
                                    <li>
                                        <a href="/perfil">
                                            <User size={20} />
                                            Perfil
                                        </a>
                                    </li>
                                    <li>
                                        <button>
                                            <SignOut size={20} />
                                                Sair
                                            </button>
                                    </li>
                                </ul>
                            </div>

                        </div>
                        </>
                    ) : (
                        <div className={style.userContainer__btns}>
                            <Button asChild>
                                <Link href="/entrar">
                                    <a>
                                        Entrar
                                    </a>
                                </Link>
                            </Button>
                        </div>
                    )}
                    
                </div>

                <ButtonIcon
                    className={style.header__btnMenu}
                    aria-label={menuIsOpen ? "Fechar menu" : "Abrir menu"}
                    title={menuIsOpen ? "Fechar menu" : "Abrir menu"}
                    tabIndex={0}
                    onClick={() => setMenuIsOpen(!menuIsOpen)}
                    // ref={btnMenuRef}
                >
                    <span></span>
                    <span></span>
                </ButtonIcon>
            </div>

        </header>
    )
}