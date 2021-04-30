import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebaseConfig";


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        let signedInUser = null;
        if(user){
          const {displayName, photoURL, email} = user;
          signedInUser = {
              isSignedIn: true,
              displayName: displayName,
              email: email,
              photo: photoURL,
              success: true
          };
        }
        setLoggedInUser(signedInUser);
        setLoading(false);
    })

    return unsubscribe
  }, [])

  const value = {
    loggedInUser,
    setLoggedInUser
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}