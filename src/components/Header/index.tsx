import Image from "next/future/image";
import Link from "next/link";
import style from "./style.module.scss"
import { Navigation } from "./Navigation";
import useWindowDimesions from "../../hooks/useWindowDimensions";
import { NavigationMobile } from "./NavigationMobile";
// import { useWindowDimesions } from "../../hooks/useWindowDimensions";

export function Header() {
    const [ width ] = useWindowDimesions()

    // console.log(width)
    const isMobile = width < 800

    return (
        <header className={style.headerContainer}>
            <div className={style.header}>
                <h1>
                    Meu kyuden
                </h1>

                { isMobile ? (
                    <NavigationMobile />
                ) : (
                    <Navigation />
                )}

                <div className={style.userAndSearch}>
                    <div className={style.user}>
                        { !isMobile && <span>Bem vindo, <strong>Luis Felipe</strong></span>}
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