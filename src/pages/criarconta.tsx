import { useState } from 'react'
import Link from 'next/link'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button } from '../components/Button'
import { Loading } from '../components/Loading'

import { useAuth } from '../hooks/useAuth'
import style from '../styles/Login.module.scss'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

interface ICreateUser {
  email: string
  password: string
  name: string
  username: string
}

const createUserFormSchema = yup.object().shape({
  // userName: yup.string().required('Usuário é obrigatório').min(6, 'Senha de no minímo 6 caracteres'),
  name: yup.string().required('Nome é obrigatório'),
  email: yup
    .string()
    .required('E-mail obrigatório')
    .email('Por favor, insira um endereço de email válido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'Sua senha deve conter pelo menos 6 caracteres'),
})

export default function SingUp() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createUserFormSchema),
  })
  const onSubmit = (data: any) => handleCreateAccount(data)

  const { createAccount } = useAuth()

  async function handleCreateAccount(data: ICreateUser) {
    setLoading(true)

    try {
      const user = await createAccount(data)

      if (!(user instanceof Error) && user) {
        router.push('/perfil')
      }

      if (
        user instanceof Error &&
        user.message === 'auth/email-already-in-use'
      ) {
        toast.error('Email já está em uso')
      }
    } catch (error) {
      // Ocorreu algum erro na requisição
    }

    setLoading(false)
  }
  errors?.name && errors.name.message?.toString()
  return (
    <main className={style.login}>
      <div className={style.login__container}>
        <h1>Kyuden | Criar conta</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Nome
            <input
              {...register('name')}
              type="name"
              placeholder="Luis Felipe N"
            />
            {errors?.name && (
              <p className={style.login__errors}>
                {errors.name.message?.toString()}
              </p>
            )}
          </label>
          <label>
            E-mail
            <input
              {...register('email')}
              type="email"
              placeholder="email@gmail.com"
            />
            {errors?.email && (
              <p className={style.login__errors}>
                {errors.email.message?.toString()}
              </p>
            )}
          </label>
          <label>
            Senha
            <input
              {...register('password')}
              type="password"
              placeholder="senha123!@#"
            />
            {errors?.password && (
              <p className={style.login__errors}>
                {errors.password.message?.toString()}
              </p>
            )}
          </label>

          <Button className={loading ? style.loading : ''} disabled={loading}>
            {loading ? (
              <span>
                <Loading />
              </span>
            ) : (
              <span>Entrar</span>
            )}
          </Button>
        </form>

        <p>
          Já tem uma conta? <Link href="/entrar">Entrar aqui</Link>
        </p>
      </div>
    </main>
  )
}
