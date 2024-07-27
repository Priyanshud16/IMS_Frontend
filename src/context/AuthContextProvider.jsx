import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const AuthContext=createContext()
function AuthContextProvider({children}) {
    const [Auth,setAuth]=useState({
        isAuth:false,
        token:null
    })

    const LoginUser=(token)=>{
        setAuth((prev)=>({
            ...prev,
            token:token,
            isAuth:true
        }))
    }
  return (
    <div>
      <AuthContext.Provider value={{LoginUser,Auth}}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthContextProvider
