import { ChangeEvent, InputHTMLAttributes, useState, memo } from 'react'
import * as SliderRadiux from '@radix-ui/react-slider'

import style from './style.module.scss'

interface ISliderRadixUIProps extends SliderRadiux.SliderProps {
  value?: number[]
  handleChangeValue: (value: number[]) => void
}

export function SliderRadixUIElement({
  value,
  handleChangeValue,
  ...props
}: ISliderRadixUIProps) {
  if (value) {
    return (
      <SliderRadiux.Root
        value={value}
        onValueChange={handleChangeValue}
        className={style.slider}
        {...props}
      >
        <SliderRadiux.Track className={style.slider__track}>
          <SliderRadiux.Range className={style.slider__range} />
        </SliderRadiux.Track>
        <SliderRadiux.Thumb className={style.slider__thumb} />
      </SliderRadiux.Root>
    )
  } else {
    return (
      <SliderRadiux.Root
        value={value}
        onValueChange={handleChangeValue}
        className={style.slider}
        {...props}
      >
        <SliderRadiux.Track className={style.slider__track}>
          <SliderRadiux.Range className={style.slider__range} />
        </SliderRadiux.Track>
        <SliderRadiux.Thumb className={style.slider__thumb} />
      </SliderRadiux.Root>
    )
  }
}

export const SliderRadixUI = memo(
  SliderRadixUIElement,
  (prevProps, nextProps) => {
    return prevProps.value === nextProps.value
  },
)
