import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"
import type { AppProps } from 'next/app'
import { AuthProvider, EntriesProvider } from '@/context'
import '@/styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <EntriesProvider>
          <Component {...pageProps} />
        </EntriesProvider>
      </AuthProvider>
    </SessionProvider>
  )
}

export default MyApp
