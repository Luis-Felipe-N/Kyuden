import { FormEvent } from "react"
import Link from "next/link"

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Button } from "../components/Button"

import { useAuth } from "../hooks/useAuth"
import { useForm, Resolver } from "react-hook-form";
import style from "../styles/Login.module.scss"

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
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(createUserFormSchema)
    });
    const onSubmit = (data: any) => handleCreateAccount(data)
    
    const { createAccount } = useAuth()

    function handleCreateAccount(data: ICreateUser) {
        createAccount(data)
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
                                {...register("name")}
                                type="name"
                                placeholder="Luis Felipe N"
                            />
                            {errors?.name && (<p>{errors.name.message?.toString()}</p>)}
                        </label>
                        <label>
                            E-mail
                            <input 
                                {...register("email")}
                                type="email"
                                placeholder="email@gmail.com"
                            />
                            {errors?.email && (<p>{errors.email.message?.toString()}</p>)}
                        </label>
                        <label>
                            Senha
                            <input 
                                {...register("password")}
                                type="password"
                                placeholder="senha123!@#"
                            />
                            {errors?.password && (<p>{errors.password.message?.toString()}</p>)}
                        </label>

                        <Button>Entrar</Button>
                    </form>

                    <p>Já tem uma conta? <Link href="/entrar"><a>Entrar aqui</a></Link></p>
            </div>
        </main>
    )
}