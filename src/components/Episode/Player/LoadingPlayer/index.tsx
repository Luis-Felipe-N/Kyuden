import { memo } from 'react'
import { useVideo } from '../../../../hooks/useVideo'
import { Loading } from '../../../Loading'

import style from './style.module.scss'

function LoadingPlayerElement() {
  const { playerState } = useVideo()

  if (playerState.isLoading)
    return (
      <div className={style.loadingPlayer}>
        <Loading width={70} />
      </div>
    )
  return null
}

export const LoadingPlayer = memo(LoadingPlayerElement)
