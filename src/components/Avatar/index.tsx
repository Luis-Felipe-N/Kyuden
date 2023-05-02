import { ImgHTMLAttributes } from 'react'
import * as AvatarRadix from '@radix-ui/react-avatar';
import style from './style.module.scss'

interface IAvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    hasBorder?: boolean;
    fallback?: string;
}

export function Avatar({hasBorder, height, width, fallback, className, ...props}: IAvatarProps) {
    return (
        <AvatarRadix.Root 
          {...props}
          className={`${style.avatarComponent} ${className}`}>
        <AvatarRadix.Image
          {...props}
          width={width}
          height={height}
        />
        <AvatarRadix.Fallback 
          {...props}
          delayMs={600}>
          {fallback?.toUpperCase()}
        </AvatarRadix.Fallback>
      </AvatarRadix.Root>
    )
}