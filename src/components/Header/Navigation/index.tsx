import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {
  FaBookDead,
  FaChevronDown,
  FaGlobeAmericas,
  FaMagic,
  FaRegMoneyBillAlt,
  FaSearch,
  FaSmileBeam,
  FaUserNinja,
} from "react-icons/fa";

import { MdFilter9Plus } from "react-icons/md";
import { BsHouseFill } from "react-icons/bs";

import style from "./style.module.scss";
import Link from "next/link";
import useWindowDimesions from "../../../hooks/useWindowDimensions";
import { ActiveLink } from "../../ActiveLink";

interface INavigationProps {
  setStateMenu: (value: boolean) => void,
  stateMenu: boolean
}

export function Navigation({ setStateMenu, stateMenu }: INavigationProps) {

  const [width, ] = useWindowDimesions()

  // console.log(d)

  function handleCloseMenu() {
    if (stateMenu) {
      setStateMenu(!stateMenu)
    }
  }

  return (
    <NavigationMenu.Root className={style.navigation}>
      <NavigationMenu.List className={style.list}>
        <NavigationMenu.Item className={style.item}>
          <ActiveLink activeClassName={style.active} href="/" >
            <a className={style.active} onClick={handleCloseMenu}>
              <span className={style.item__icon}>
                <BsHouseFill size={20} />
              </span>
              Inicio
            </a>
          </ActiveLink>
        </NavigationMenu.Item>

        <NavigationMenu.Item className={style.item}>
          <ActiveLink activeClassName={style.active} href="/doacao">
            <a onClick={handleCloseMenu}>
              <span className={style.item__icon}>
                <FaRegMoneyBillAlt size={20} />
              </span>
              Doação
            </a>
          </ActiveLink>
        </NavigationMenu.Item>

        <NavigationMenu.Item className={style.item}>
          <ActiveLink activeClassName={style.active} href="/pesquisa">
            <a onClick={handleCloseMenu}>
              <span className={style.item__icon}><FaSearch size={20}/></span>
              Pesquisa
            </a>
          </ActiveLink>
        </NavigationMenu.Item>

        { width < 700 ? (
          <NavigationMenu.Item className={style.item}>
            <ActiveLink activeClassName={style.active} href="/generos">
              
              <a onClick={handleCloseMenu}>
                <span className={style.item__icon}>
                <FaGlobeAmericas size={20} />
                </span>
                Gênero
              </a>
            </ActiveLink>
          </NavigationMenu.Item>
        ) : (
          <>
          <NavigationMenu.Item className={style.item}>
            <NavigationMenu.Trigger className={`${style.item} ${style.trigger}`} >
                <span className={style.trigger__desktop}>
                  Gênero
                  <FaChevronDown />
                </span>
            </NavigationMenu.Trigger>

          <NavigationMenu.Content>
            <NavigationMenu.Sub>
              <NavigationMenu.List className={style.dropdown}>
                <NavigationMenu.Item className={style.dropdownItem}>
                  <Link href={"genero/acao"}>
                    <a>
                      <FaUserNinja />
                      Ação
                    </a>
                  </Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item className={style.dropdownItem}>
                  <Link href={"genero/acao"}>
                    <a>
                      <FaSmileBeam />
                      Comédia
                    </a>
                  </Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item className={style.dropdownItem}>
                  <Link href={"genero/acao"}>
                    <a>
                      <FaBookDead />
                      Shounen
                    </a>
                  </Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item className={style.dropdownItem}>
                  <Link href={"genero/acao"}>
                    <a>
                      <FaMagic />
                      Magia
                    </a>
                  </Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item className={style.dropdownItem}>
                  <Link href={"genero"}>
                    <a>
                      <MdFilter9Plus />
                      Outros
                    </a>
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
  );
}