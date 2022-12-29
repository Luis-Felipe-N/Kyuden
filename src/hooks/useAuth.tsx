import { useContext } from "react";
import { AuthContext } from "../context/AuthenticationContext";

export function useAuth() {
    const value = useContext(AuthContext)

    return value
}