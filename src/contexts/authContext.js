import React, {useContext, useState, useEffect} from 'react'
import {auth} from "../services/firebase"

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
} 

export const AuthProvider = ({children}) =>{
    const [loading, setLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState()

    const  signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            // khi nao thay change in authUser => notify us
            setCurrentUser(user)
            setLoading(false)
            // only run once
        })
    }, [])

    const value = {
        currentUser,
        login,
        signup
    }

    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}


