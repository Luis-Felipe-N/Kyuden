import { ImgHTMLAttributes } from 'react'
import * as AvatarRadix from '@radix-ui/react-avatar';
import style from './style.module.scss'

interface IAvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    hasBorder?: boolean;
    fallback?: string;
}

export function Avatar({hasBorder, height, width, fallback, className, ...props}: IAvatarProps) {
    return (
        // <img 
        //     {...props}
        //     className={style.avatar}
        // />
        <AvatarRadix.Root className={className}>
        <AvatarRadix.Image
          {...props}
          width={width}
          height={height}
        />
        <AvatarRadix.Fallback delayMs={600}>
          {fallback?.toUpperCase()}
        </AvatarRadix.Fallback>
      </AvatarRadix.Root>
    )
}