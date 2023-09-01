import Image from 'next/image'
import Link from 'next/link'
import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useId,
  useState,
} from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { IEpisodesAnime } from '../../@types/Anime'
import { IComment, IUser } from '../../@types/User'
import { useAuth } from '../../hooks/useAuth'
import {
  addCommentEpisode,
  getCommentsEpisode,
  getUserData,
} from '../../service/firebase'
import { formartDistanceDate } from '../../utils/date'
import { Avatar } from '../Avatar'
import { Button } from '../Button'
import style from './style.module.scss'

interface ICommentsProps {
  episode: IEpisodesAnime
}

export function Comments({ episode }: ICommentsProps) {
  const [commentValue, setCommentValue] = useState<string>('')
  const [comments, setComments] = useState<IComment[]>()
  const { user } = useAuth()

  function handleSetComment(event: ChangeEvent<HTMLTextAreaElement>) {
    setCommentValue(event.target.value.trim())
  }

  function handleComment(event: FormEvent) {
    event.preventDefault()

    if (user) {
      addCommentEpisode(user.uid, episode.id, commentValue).then((res) => {
        toast.success('Comentário adicionado')
        if (comments) {
          setComments([
            ...comments,
            {
              id: '',
              episodeId: episode.id,
              userId: user.uid,
              comment: commentValue,
              createdAt: new Date().getTime(),
            },
          ])
        } else {
          setComments([
            {
              id: '',
              episodeId: episode.id,
              userId: user.uid,
              comment: commentValue,
              createdAt: new Date().getTime(),
            },
          ])
        }
      })
    }
  }

  useEffect(() => {
    if (episode.id) {
      getCommentsEpisode(episode.id)
        .then((res) => {
          setComments(res)
        })
        .catch((res) => {
          toast.warn('Nao foi possível carregar os comentários')
        })
    }
  }, [episode.id])

  return (
    <section className={style.comments}>
      <div className={style.comments__send}>
        {user ? (
          <>
            {user?.avatar ? (
              <Avatar
                hasBorder
                style={{ width: '3rem', height: '3rem', lineHeight: '3rem' }}
                className={style.navigation__avatar}
                src={user?.avatar}
                fallback={user.displayName[0]}
              />
            ) : (
              <Avatar
                style={{ width: '3rem', height: '3rem', lineHeight: '3rem' }}
                className={style.navigation__avatar}
                fallback={user.displayName[0]}
              />
            )}
            <form onSubmit={handleComment}>
              <textarea
                placeholder="Deixe um comentário"
                onChange={handleSetComment}
              />
              <div>
                <Button disabled={!commentValue}>Enviar</Button>
              </div>
            </form>
          </>
        ) : (
          <h1>
            Faca <Link href="/entrar">login</Link> para deixar um comentario
          </h1>
        )}
      </div>

      <div className={style.comments__count}>
        <strong>{comments?.length} comentários</strong>
      </div>

      <ul className={style.comments__content}>
        {comments &&
          comments.map((comment) => (
            <li key={comment.id} className={style.comment}>
              <Avatar
                style={{ width: '3rem', height: '3rem', lineHeight: '3rem' }}
                src="/avatar.jpeg"
                alt="Imagem de perfil do usuario"
              />
              <div>
                <strong className={style.comments__content__user}>
                  Luis Felipe
                </strong>{' '}
                {comment.userId === user?.uid && (
                  <span className={style.comments__content__you}>Você</span>
                )}
                <time>{formartDistanceDate(new Date(comment.createdAt))}</time>
                <p>{comment.comment}</p>
              </div>
            </li>
          ))}
      </ul>
    </section>
  )
}
