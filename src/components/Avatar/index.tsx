import { ImgHTMLAttributes } from 'react'
import style from './style.module.scss'

interface IAvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    hasBorder?: boolean
}

export function Avatar({hasBorder, ...props}: IAvatarProps) {
    return (
        <img 
            {...props}
            className={style.avatar}
        />
    )
}