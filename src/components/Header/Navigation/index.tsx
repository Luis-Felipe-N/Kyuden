import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import {
  FaBookDead,
  FaChevronDown,
  FaGlobeAmericas,
  FaMagic,
  FaSearch,
  FaSmileBeam,
  FaUserNinja,
} from 'react-icons/fa'

import { MdFilter9Plus } from 'react-icons/md'
import { BsHouseFill } from 'react-icons/bs'

import style from './style.module.scss'
import Link from 'next/link'
import useWindowDimensions from '../../../hooks/useWindowDimensions'
import { ActiveLink } from '../../ActiveLink'

interface INavigationProps {
  setStateMenu: (value: boolean) => void
  stateMenu: boolean
}

export function Navigation({ setStateMenu, stateMenu }: INavigationProps) {
  const [width] = useWindowDimensions()

  function handleCloseMenu() {
    if (stateMenu) {
      setStateMenu(!stateMenu)
    }
  }

  return (
    <NavigationMenu.Root className={style.navigation}>
      <NavigationMenu.List className={style.list}>
        <NavigationMenu.Item className={style.item}>
          <ActiveLink
            activeClassName={style.active}
            href="/"
            className={style.active}
            onClick={handleCloseMenu}
          >
            <>
              <span className={style.item__icon}>
                <BsHouseFill size={20} />
              </span>
              Inicio
            </>
          </ActiveLink>
        </NavigationMenu.Item>

        <NavigationMenu.Item className={style.item}>
          <ActiveLink
            activeClassName={style.active}
            href="/pesquisa"
            onClick={handleCloseMenu}
          >
            <>
              <span className={style.item__icon}>
                <FaSearch size={20} />
              </span>
              Pesquisa
            </>
          </ActiveLink>
        </NavigationMenu.Item>

        {width && width < 700 ? (
          <NavigationMenu.Item className={style.item}>
            <ActiveLink
              activeClassName={style.active}
              href="/generos"
              onClick={handleCloseMenu}
            >
              <>
                <span className={style.item__icon}>
                  <FaGlobeAmericas size={20} />
                </span>
                Gênero
              </>
            </ActiveLink>
          </NavigationMenu.Item>
        ) : (
          <>
            <NavigationMenu.Item className={style.item}>
              <NavigationMenu.Trigger
                className={`${style.item} ${style.trigger}`}
              >
                <span className={style.trigger__desktop}>
                  Gênero
                  <FaChevronDown />
                </span>
              </NavigationMenu.Trigger>

              <NavigationMenu.Content>
                <NavigationMenu.Sub>
                  <NavigationMenu.List className={style.dropdown}>
                    <NavigationMenu.Item className={style.dropdownItem}>
                      <Link href={'genero/acao'}>
                        <>
                          <FaUserNinja />
                          Ação
                        </>
                      </Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item className={style.dropdownItem}>
                      <Link href={'genero/acao'}>
                        <>
                          <FaSmileBeam />
                          Comédia
                        </>
                      </Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item className={style.dropdownItem}>
                      <Link href={'genero/acao'}>
                        <>
                          <FaBookDead />
                          Shounen
                        </>
                      </Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item className={style.dropdownItem}>
                      <Link href={'genero/acao'}>
                        <>
                          <FaMagic />
                          Magia
                        </>
                      </Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item className={style.dropdownItem}>
                      <Link href={'genero'}>
                        <>
                          <MdFilter9Plus />
                          Outros
                        </>
                      </Link>
                    </NavigationMenu.Item>
                  </NavigationMenu.List>
                  <NavigationMenu.Viewport />
                </NavigationMenu.Sub>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </>
        )}
      </NavigationMenu.List>
      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  )
}
