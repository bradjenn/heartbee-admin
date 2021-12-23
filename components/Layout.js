import { Fragment, useState, useContext, useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'

import { AuthContext } from '../contexts/authContext'

import Header from './Header'
import Sidebar from './Sidebar'

export default function Layout({ children }) {
  const [open, setOpen] = useState(false)
  const { user, authReady } = useContext(AuthContext)

  useEffect(() => {
    if (!user && authReady) {
      Router.push('/login')
    }
  }, [user, authReady])

  return (
    <>
      <Head>
        <title>HeartBee Admin</title>
      </Head>

      <div className="h-full flex flex-col">
        {(!user || !authReady) && <div>loading...</div>}

        {user && (
          <>
            <Header open={open} user={user} setOpen={setOpen} />

            <div className="min-h-0 flex-1 flex overflow-hidden">
              <Sidebar />

              <main className="min-w-0 flex-1 border-t border-gray-200 xl:flex">
                <section className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last">
                  <div className="min-h-0 flex-1 overflow-y-auto">
                    {children}
                  </div>
                </section>
              </main>
            </div>
          </>
        )}
      </div>
    </>
  )
}
