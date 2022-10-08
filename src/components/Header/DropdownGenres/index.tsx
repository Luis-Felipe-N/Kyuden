import Link from "next/link";
import { FaBookDead, FaChevronDown, FaMagic, FaSmileBeam, FaUserNinja } from "react-icons/fa";
import { MdFilter9Plus } from "react-icons/md";
import style from './style.module.scss'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export function DropdownGenres() {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger 
                className={style.dropdown_trigger}

            >
                    Gêneros <FaChevronDown/> 
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="start" className={style.dropdown_content}>
                <DropdownMenu.Item className={style.dropdown_content__item}>
                    <Link href={'acao'}>
                        <a>
                            <FaUserNinja />
                            Ação
                        </a>
                    </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item className={style.dropdown_content__item}>
                    <Link href={'/acao'}>
                        <a>
                            <FaSmileBeam />
                            Comédia
                        </a>
                    </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item className={style.dropdown_content__item}>
                    <Link href={'/acao'}>
                        <a>
                            <FaBookDead />
                            Shounen
                        </a>
                    </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item className={style.dropdown_content__item}>
                    <Link href={'/acao'}>
                        <a>
                            <FaMagic />
                            Magia
                        </a>
                    </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item className={style.dropdown_content__item}>
                    <Link href={'/generos'}>
                        <a>
                            <MdFilter9Plus />
                            Outros
                        </a>
                    </Link>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}