import { createContext, useState, useEffect } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
})

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    netlifyIdentity.on('login', (user) => {
      setUser(user)
      netlifyIdentity.close()
    })

    netlifyIdentity.on('logout', (user) => {
      setUser(null)
    })

    netlifyIdentity.on('init', () => {
      setAuthReady(true)
    })

    netlifyIdentity.init({
      APIUrl: 'https://admin.heartbeeflowers.com/.netlify/identity',
      locale: 'en',
    })
  }, [])

  const login = () => {
    netlifyIdentity.open()
  }

  const logout = () => {
    netlifyIdentity.logout()
  }

  const context = {
    login,
    logout,
    user,
    authReady,
  }

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
