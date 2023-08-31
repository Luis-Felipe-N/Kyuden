import { ImgHTMLAttributes } from 'react'
import * as AvatarRadix from '@radix-ui/react-avatar'
import style from './style.module.scss'

interface IAvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean
  fallback?: string
  quality?: number
}

export function Avatar({
  hasBorder,
  height,
  width,
  fallback,
  quality,
  className,
  ...props
}: IAvatarProps) {
  return (
    <AvatarRadix.Root {...props} className={`${style.avatar} ${className}`}>
      <AvatarRadix.Image
        {...props}
        className={`${hasBorder && style.avatar__hasBorder}`}
        width={width}
        height={height}
      />
      <AvatarRadix.Fallback {...props} delayMs={600}>
        {fallback?.toUpperCase()}
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  )
}
