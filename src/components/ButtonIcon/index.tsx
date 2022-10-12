import { Slot } from "@radix-ui/react-slot"
import { ButtonHTMLAttributes } from "react"
import style from './style.module.scss'

interface IButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
}

export function ButtonIcon(props: IButtonIconProps) {
    const Component = props.asChild ? Slot : 'button'

    return (    
        <Component
            className={`${style.btnIcons} ${props.className}` }
            {...props}
        />
    )
}