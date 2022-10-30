import Link from "next/link"
import { Button } from "../components/Button"
import style from "../styles/Login.module.scss"

export default function Login() {
    return (
        <main className={style.login}>
            <div className={style.login__container}>
                    <h1>Kyuden | Entrar</h1>

                    <form>
                        <label>
                            E-mail
                            <input 
                                type="email"
                                placeholder="email@gmail.com"
                            />
                        </label>
                        <label>
                            Senha
                            <input 
                                type="password"
                                placeholder="senha123!@#"
                            />
                        </label>

                        <Button>Entrar</Button>
                    </form>

                    <p>Nao tem uma conta? <Link href="/"><a>Crie aqui</a></Link></p>
            </div>
        </main>
    )
}