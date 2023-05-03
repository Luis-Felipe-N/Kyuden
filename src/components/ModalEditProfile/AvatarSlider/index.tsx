import style from './style.module.scss'

interface IAvatarSliderProps {
    selected: boolean;
}

export function AvatarSlider({ selected }: IAvatarSliderProps) {


    return (
        <div className={selected ? style.selected : ''}>
           
        </div>
    )
}