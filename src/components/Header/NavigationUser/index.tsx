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
import { SignOut, User } from "phosphor-react";
import { useAuth } from "../../../hooks/useAuth";
import { Avatar } from "../../Avatar";

interface INavigationProps {
  setStateMenu: (value: boolean) => void,
  stateMenu: boolean
}

export function NavigationUser() {
  const { user, logout } = useAuth()

  return (
    <NavigationMenu.Root className={style.navigation}>
      <NavigationMenu.List className={style.list}>

        <NavigationMenu.Item className={style.item}>
            <NavigationMenu.Trigger className={`${style.item} ${style.trigger}`} >
              { user && (
                <>
                <div className={style.navigation__user}>
                  <span>Bem vindo, <strong>{user.displayName}</strong></span>
                </div>
                {user?.avatar ? (
                    <Avatar className={style.navigation__avatar} src={user?.avatar} fallback={user.displayName[0]} />
                ) : (
                    <Avatar className={style.navigation__avatar} fallback={user.displayName[0]} />
                )}
                </>
              )}
                <FaChevronDown />
            </NavigationMenu.Trigger>

          <NavigationMenu.Content>
            <NavigationMenu.Sub>
              <NavigationMenu.List className={style.dropdown}>
                <NavigationMenu.Item className={style.dropdownItem}>
                  <Link href={"/perfil"}>
                    <a>
                      <User size={20} />
                      Perfil
                    </a>
                  </Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item className={style.dropdownItem}>
                  <button className={style.colorRed} onClick={logout}>
                      <SignOut size={20} />
                          Sair
                  </button>
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