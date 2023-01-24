import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, updateCurrentUser, setPersistence, browserSessionPersistence } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../service/firebase";

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
  user: IUser | undefined
}

interface IAuthenticationProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as IAuthenticationContext)

export function AuthenticationProvider({ children }: IAuthenticationProviderProps) {
  const [user, setUser] = useState<IUser>()

  useEffect(() => {
    auth.onAuthStateChanged((userPersistence: any) => {
      if (userPersistence !== null) {
        setUser(userPersistence.providerData[0])
      }
    });
  }, [])

  function createAccount({email, password, name, username}: ICreateUser) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      // userCredential.user.u
      const user = userCredential.user;
      

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
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  function login({email, password}: IUserLoginCredentials) {  
  
    setPersistence(auth, browserSessionPersistence).then(() => {
      return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        const user = userCredential.user.providerData[0];
        setUser(user)
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    })
  }



  return (<AuthContext.Provider value={{ createAccount, login, user }}>
    {children}
</AuthContext.Provider>)
}