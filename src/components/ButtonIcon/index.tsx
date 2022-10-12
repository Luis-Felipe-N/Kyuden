import { Slot } from "@radix-ui/react-slot"
import { ButtonHTMLAttributes } from "react"

interface IButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
}

export function ButtonIcon(props: IButtonIconProps) {
    const Component = props.asChild ? Slot : 'button'

    return (    
        <Component
            {...props}
        />
    )
}