import style from './style.module.scss'

interface ISkeleton {
    width: number;
    height: number;
}

export function Skeleton({width, height}: ISkeleton) {
    return (
        <div className={style.skeleton} style={{width, height}}>
        </div>
    )
}