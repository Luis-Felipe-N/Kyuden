import { Slot } from "@radix-ui/react-slot"
import { ButtonHTMLAttributes } from "react"
import style from './style.module.scss'

interface IButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    hasChild?: boolean
}

export function ButtonIcon(props: IButtonIconProps) {
    const Component = props.hasChild ? Slot : 'button'

    return (    
        <Component
            {...props}
            className={`${style.btnIcons} ${props.className}` }
        />
    )
}