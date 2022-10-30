import style from './style.module.scss'

interface ISkeleton {
<<<<<<< HEAD
    width?: number;
    height?: number;
=======
    width: number;
    height: number;
>>>>>>> 91e0b26dd14befebaf5fd5e617dc93f735ac6f93
}

export function Skeleton({width, height}: ISkeleton) {
    return (
<<<<<<< HEAD
        <div className={style.skeleton} style={{
            maxWidth: width || '100%', 
            width: '100%', 
            height: height || '100%'
        }}>
=======
        <div className={style.skeleton} style={{width, height}}>
>>>>>>> 91e0b26dd14befebaf5fd5e617dc93f735ac6f93
        </div>
    )
}