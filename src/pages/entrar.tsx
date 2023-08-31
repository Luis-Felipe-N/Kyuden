import { useState } from 'react'
import Link from 'next/link'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button } from '../components/Button'

import { useAuth } from '../hooks/useAuth'
import { useForm } from 'react-hook-form'
import style from '../styles/Login.module.scss'
import { IUserLoginCredentials } from '../context/AuthenticationContext'
import { Loading } from '../components/Loading'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('E-mail obrigatório')
    .email('Por favor, insira um endereço de email válido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'Sua senha deve conter pelo menos 6 caracteres'),
})

export default function SingIn() {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  })
  const onSubmit = (data: any) => handleCreateAccount(data)

  const { login } = useAuth()
  const router = useRouter()

  function handleCreateAccount(credentials: IUserLoginCredentials) {
    setLoading(true)
    login(credentials)
      .then((res) => {
        if (!(res instanceof Error)) {
          router.push('/perfil')
        }
        if (res instanceof Error) {
          if (
            res.message === 'auth/wrong-password' ||
            res.message === 'auth/user-not-found'
          ) {
            toast.error(
              'Senha ou usuário incorreto. Por favor, tente novamente.',
            )
          }
        }

        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <main className={style.login}>
      <div className={style.login__container}>
        <h1>Kyuden | Entrar</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            E-mail
            <input
              {...register('email')}
              type="email"
              placeholder="email@gmail.com"
            />
            {errors?.email && <p>{errors.email.message?.toString()}</p>}
          </label>
          <label>
            Senha
            <input
              {...register('password')}
              type="password"
              placeholder="senha123!@#"
            />
            {errors?.password && <p>{errors.password.message?.toString()}</p>}
          </label>

          <Button>{loading ? <Loading /> : <span>Entrar</span>}</Button>
        </form>

        <p>
          Não tem uma conta? <Link href="/criarconta">Crie aqui</Link>
        </p>
      </div>
    </main>
  )
}
