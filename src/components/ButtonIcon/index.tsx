import { Slot } from '@radix-ui/react-slot'
import { ButtonHTMLAttributes } from 'react'
import style from './style.module.scss'

interface IButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  aschild?: string
}

export function ButtonIcon(props: IButtonIconProps) {
  const Component = props.aschild === 'true' ? Slot : 'button'

  return (
    <Component {...props} className={`${style.btnIcons} ${props.className}`} />
  )
}
