import Link from "next/link";
import style from "./style.module.scss"
import { Navigation } from "./Navigation";
import { ButtonIcon } from "../ButtonIcon";
import { Button } from '../Button'
import { createRef, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useClickOutSide } from "../../hooks/useClickOutSide";
import { NavigationUser } from "./NavigationUser";

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
                    <h1>
                        Kyuden
                    </h1>
                </Link>
                <div className={menuIsOpen ? `${style.menu} ${style.active}` : style.menu}>
                    <Navigation setStateMenu={setMenuIsOpen} stateMenu={menuIsOpen} />
                </div>

                <div className={style.userContainer}>
                    { !!user ? (
                        <>
                            <NavigationUser  />
                        </>
                    ) : (
                        <div className={style.userContainer__btns}>
                            <Button asChild>
                                <Link href="/entrar">
                                        Entrar
                                </Link>
                            </Button>
                        </div>
                    )}
                    
                </div>
            </div>

        </header>
    )
}