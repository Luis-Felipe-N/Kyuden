import Link from "next/link";
import { FaGift, FaHome } from "react-icons/fa";
import style from './style.module.scss'

export function NavigationMobile() {
    return (
        <nav className={style.navigationMobile}>
            <ul>
                <li>
                    <Link href="/">
                        <a>
                            <FaHome size={17}/>
                            <span>Inicio</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/doacao">
                        <a>
                            <FaGift size={17}/>
                            <span>Doações</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/generos">
                        <a>
                            <FaGift size={17}/>
                            Gêneros
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/me">
                        <a>
                            <FaGift size={17}/>
                            Perfil
                        </a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}