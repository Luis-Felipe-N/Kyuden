import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
  User,
  onAuthStateChanged,
} from 'firebase/auth'
import { createContext, ReactNode, useEffect, useRef, useState } from 'react'
import { auth } from '../libs/firebase'
import { createUser, getUserData } from '../service/firebase'
import { IUser } from '../@types/User'

interface IUserUpdate {
  displayName?: string | null
  photoURL?: string | null
  uid?: string
}

interface ICreateUser {
  email: string
  password: string
  name: string
  username: string
}

export interface IUserLoginCredentials {
  email: string
  password: string
}

interface IAuthenticationContext {
  createAccount: ({
    email,
    password,
    name,
    username,
  }: ICreateUser) => Promise<User | Error>
  login: ({ email, password }: IUserLoginCredentials) => Promise<void | Error>
  logout: () => void
  user: IUser | null
  loadingUser: boolean
}

interface IAuthenticationProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as IAuthenticationContext)

export function AuthenticationProvider({
  children,
}: IAuthenticationProviderProps) {
  const [user, setUser] = useState<IUser | null>(null)
  const [loadingUser, setLoadingUser] = useState(false)

  const mounted = useRef<boolean>(false)

  useEffect(() => {
    setLoadingUser(true)
    mounted.current = true
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (mounted.current) {
          getUserData(user.uid, setUser).then((res) => setLoadingUser(false))
        }
      } else {
        if (mounted.current) {
          setUser(null)
          setLoadingUser(false)
        }
      }
    })

    return () => {
      mounted.current = false
      unsubscribe()
    }
  }, [])

  async function createAccount({
    email,
    password,
    name,
    username,
  }: ICreateUser): Promise<User | Error> {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user

        // ADD USER DATA IN REALTIME DATABASE
        createUser({
          id: user.uid,
          displayName: name,
          email,
          providerId: user.providerId,
        })

        updateProfile(user, {
          displayName: name,
        })

        return user
      })
      .catch((error) => {
        return new Error(error.code)
      })
  }

  function logout() {
    signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((error) => {
        // An error happened.
      })
  }

  function login({ email, password }: IUserLoginCredentials) {
    return setPersistence(auth, browserSessionPersistence).then(() => {
      return signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential: any) => {
          const { uid, _ } = userCredential.user
          getUserData(uid, setUser)
        })
        .catch((error: any) => {
          return new Error(error.code)
        })
    })
  }

  return (
    <AuthContext.Provider
      value={{ createAccount, login, logout, user, loadingUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
