import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {
  FaBookDead,
  FaChevronDown,
  FaMagic,
  FaSmileBeam,
  FaUserNinja,
} from "react-icons/fa";
import { MdFilter9Plus } from "react-icons/md";

import style from "./style.module.scss";
import Link from "next/link";

export function Navigation() {

  return (
    <NavigationMenu.Root className={style.navigation}>
      <NavigationMenu.List className={style.list}>
        <NavigationMenu.Item className={style.item}>
          <Link href="/">
            <a>Inicio</a>
          </Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item className={style.item}>
          <Link href="/">
            <a>Doação</a>
          </Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item className={style.item}>
          <Link href="/pesquisa">
            <a>Pesquisa</a>
          </Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item className={style.item}>
            <NavigationMenu.Trigger className={`${style.item} ${style.trigger}`} >
                Gênero
                <FaChevronDown />
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

        </NavigationMenu.List>
      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
}