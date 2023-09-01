import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { FaChevronDown } from 'react-icons/fa'

import style from './style.module.scss'
import Link from 'next/link'
import { SignOut, User } from 'phosphor-react'
import { useAuth } from '../../../hooks/useAuth'
import { Avatar } from '../../Avatar'
import useWindowDimensions from '../../../hooks/useWindowDimensions'

export function NavigationUser() {
  const { user, logout } = useAuth()

  const [width] = useWindowDimensions()

  return (
    <NavigationMenu.Root className={style.navigation}>
      <NavigationMenu.List className={style.list}>
        <NavigationMenu.Item className={style.item}>
          <NavigationMenu.Trigger className={`${style.item} ${style.trigger}`}>
            {user && (
              <>
                <div className={style.navigation__user}>
                  {width && width > 700 && (
                    <span>
                      Olá, <strong>{user.displayName}</strong>
                    </span>
                  )}
                </div>
                {user?.avatar ? (
                  <Avatar
                    style={{
                      width: '3rem',
                      height: '3rem',
                      lineHeight: '3rem',
                    }}
                    className={style.navigation__avatar}
                    src={user?.avatar}
                    fallback={user.displayName[0]}
                  />
                ) : (
                  <Avatar
                    style={{
                      width: '3rem',
                      height: '3rem',
                      lineHeight: '3rem',
                    }}
                    className={style.navigation__avatar}
                    fallback={user.displayName[0]}
                  />
                )}
              </>
            )}
            {width && width > 700 && <FaChevronDown />}
          </NavigationMenu.Trigger>

          <NavigationMenu.Content>
            <NavigationMenu.Sub>
              <NavigationMenu.List className={style.dropdown}>
                <NavigationMenu.Item className={style.dropdownItem}>
                  <Link href={'/perfil'}>
                    <User size={20} />
                    Perfil
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
  )
}
