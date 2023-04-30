import { FormEvent, useState } from "react"
import Link from "next/link"

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Button } from "../components/Button"
import { Toast } from "../components/Toast"

import { useAuth } from "../hooks/useAuth"
import { useForm, Resolver } from "react-hook-form";
import style from "../styles/Login.module.scss"
import { Loading } from "../components/Loading";

interface ICreateUser {
    email: string, 
    password: string, 
    name: string, 
    username: string
}

const createUserFormSchema = yup.object().shape({
    // userName: yup.string().required('Usuário é obrigatório').min(6, 'Senha de no minímo 6 caracteres'),
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().required("E-mail obrigatório").email("O campo precisa ser um email válido"),
    password: yup.string().required("Senha obrigatória").min(6, 'Senha de no minímo 6 caracteres'),
});
  

export default function SingUp() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(createUserFormSchema)
    });
    const onSubmit = (data: any) => handleCreateAccount(data)
    
    const { createAccount } = useAuth()

    async function handleCreateAccount(data: ICreateUser) {
        setLoading(true)
        setError("")

        const user = await createAccount(data)

        if (user instanceof Error) {
            console.log(user.cause)
            setError(user.message)
        }

        setLoading(false)
    }
    errors?.name && errors.name.message?.toString()
    return (
        <main className={style.login}>
            {error}
            { error && (
                <Toast title="Error" onClose={() => setError("")}>
                    <>
                    <span>{error}</span>
                    </>
                </Toast>
            )}
            
            <div className={style.login__container}>
                    <h1>Kyuden | Criar conta</h1>

                    <form onSubmit={handleSubmit(onSubmit)}>
                       
                        <label>
                            Nome
                            <input 
                                {...register("name")}
                                type="name"
                                placeholder="Luis Felipe N"
                            />
                            {errors?.name && (<p className={style.login__errors}>{errors.name.message?.toString()}</p>)}
                        </label>
                        <label>
                            E-mail
                            <input 
                                {...register("email")}
                                type="email"
                                placeholder="email@gmail.com"
                            />
                            {errors?.email && (<p className={style.login__errors}>{errors.email.message?.toString()}</p>)}
                        </label>
                        <label>
                            Senha
                            <input 
                                {...register("password")}
                                type="password"
                                placeholder="senha123!@#"
                            />
                            {errors?.password && (<p className={style.login__errors}>{errors.password.message?.toString()}</p>)}
                        </label>

                        <Button className={loading ? style.loading : ''} disabled={loading}>
                            { loading ? (
                                <span>
                                    <Loading />
                                </span>
                            ) : (
                                <span>
                                    Entrar
                                </span>
                            )}
                        </Button>
                    </form>

                    <p>Já tem uma conta? <Link href="/entrar"><a>Entrar aqui</a></Link></p>
            </div>
        </main>
    )
}