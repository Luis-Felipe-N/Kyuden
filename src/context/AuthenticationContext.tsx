import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, updateCurrentUser, setPersistence, browserSessionPersistence } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../libs/firebase";
import { createUser } from "../service/firebase";

interface IUser {
  displayName: string | null
  email: string
  phoneNumber: string | null
  photoURL: string | null
  providerId: string
  uid: string
}

interface IUserUpdate {
  displayName?: string | null
  photoURL?: string | null
  uid?: string
}

interface ICreateUser {
  email: string, 
  password: string, 
  name: string, 
  username: string
}

export interface IUserLoginCredentials {
  email: string,
  password: string
}

interface IAuthenticationContext {
  createAccount: ({email, password, name, username}: ICreateUser) => void;
  login: ({email, password}: IUserLoginCredentials) => void;
  logout:  () => void;
  user: IUser | null
}

interface IAuthenticationProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as IAuthenticationContext)

export function AuthenticationProvider({ children }: IAuthenticationProviderProps) {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    auth.onAuthStateChanged((userPersistence: any) => {
      if (userPersistence !== null) {
        const {uid, ...user} = userPersistence.providerData[0];
        setUser({...user, uid: userPersistence.uid})
      }
    });
  }, [])

  function createAccount({email, password, name, username}: ICreateUser) {
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
  
      const user = userCredential.user;
      console.log(user)
      const a = createUser({
        id: user.uid,
        displayName: name,
        email: email,
        providerId: user.providerId,
      })

      console.log(a)

      updateProfile(user, {
        displayName: name
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      
    });
  }

  function updateUser(newData: IUserUpdate) {
    const currentUser = auth.currentUser

    if (currentUser === null) return
    updateCurrentUser(auth, {
      ...currentUser,
      providerData: {
        ...currentUser.providerData,
        ...newData
      }
    })
  }

  function logout() {
    signOut(auth).then(() => {
      setUser(null)
    }).catch((error) => {
      // An error happened.
    });
  }

  function login({email, password}: IUserLoginCredentials) {  
  
    setPersistence(auth, browserSessionPersistence).then(() => {
      return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        const {uid, ...user} = userCredential.user.providerData[0];
        setUser({...user, uid: userCredential.user.uid})
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    })
  }



  return (<AuthContext.Provider value={{ createAccount, login, logout, user }}>
    {children}
</AuthContext.Provider>)
}