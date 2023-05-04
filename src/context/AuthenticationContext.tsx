import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, updateCurrentUser, setPersistence, browserSessionPersistence, User, onAuthStateChanged } from "firebase/auth";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { auth } from "../libs/firebase";
import { createUser, getUserData } from "../service/firebase";
import { IUser } from "../@types/User";
import { get, ref } from "firebase/database";
import { db } from "../libs/firebase";
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
  createAccount: ({email, password, name, username}: ICreateUser) => Promise<User | Error>;
  login: ({email, password}: IUserLoginCredentials) => Promise<void | Error>;
  logout:  () => void;
  user: IUser | null;
}

interface IAuthenticationProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as IAuthenticationContext)

export function AuthenticationProvider({ children }: IAuthenticationProviderProps) {
  const [user, setUser] = useState<IUser | null>(null)

  let mounted = useRef<boolean>(false);

  useEffect(() => {
    mounted.current = true;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("onAuthUserChanged", user);
      if (user) {
        if (mounted.current) {
          console.log("ANtes", user);
          getUserData(user.uid).then(res => {
            console.log("durante", user, res);
            setUser(res)
          })
          console.log("depois", user);
        }
      } else {
        if (mounted.current) {
          setUser(null);
        }
      }
    });

    return () => {
      mounted.current = false;
      unsubscribe();
    };
  }, [auth]);

  async function createAccount({email, password, name, username}: ICreateUser): Promise<User | Error> {
    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // ADD USER DATA IN REALTIME DATABASE
      createUser({
        id: user.uid,
        displayName: name,
        email: email,
        providerId: user.providerId,
      })

      updateProfile(user, {
        displayName: name
      })

      return user
    })
    .catch((error) => {
      return new Error(error)
    });
  }

  function logout() {
    signOut(auth).then(() => {
      setUser(null)
    }).catch((error) => {
      // An error happened.
    });
  }

  function login({email, password}: IUserLoginCredentials) {  
  
    return setPersistence(auth, browserSessionPersistence).then(() => {
      return  signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential: any) => {
        const {uid, ...user} = userCredential.user.providerData[0];

        getUserData(user.uid).then(res => {
          setUser(res)
        })

      })
      .catch((error: any) => {
        return new Error(error)
      });
    })
  }



  return (<AuthContext.Provider value={{ createAccount, login, logout, user }}>
    {children}
</AuthContext.Provider>)
}