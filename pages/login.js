import { useContext, useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import netlifyIdentity from 'netlify-identity-widget'

import { AuthContext } from '../contexts/authContext'

export default function Login() {
  const { user, authReady } = useContext(AuthContext)

  useEffect(() => {
    if (user && authReady) {
      Router.push('/')
      return
    }

    netlifyIdentity.open()
  }, [user, authReady])

  return (
    <div>
      <Head>
        <title>HeartBee Admin</title>
      </Head>

      <main className="h-screen bg-white flex">
        <div className="flex-1 flex overflow-hidden bg-white">
          <div className="flex flex-1">
            <div className="relative w-0 flex-1">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src="/login-img.jpeg"
                alt="HeartBee Enquires"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
