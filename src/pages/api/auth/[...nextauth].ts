import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { config } from '@/config'
import { dbUsers } from '@/database'

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: config.github.id,
      clientSecret: config.github.secret
    }),
    GoogleProvider({
      clientId: config.google.id,
      clientSecret: config.google.secret
    }),
    CredentialsProvider({
      name: "Custom login",
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: "email@google.com" },
        password: { label: 'Password', type: 'password', placeholder: "Password" },
      },
      async authorize(credentials) {
        const user = await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password)
        return user
      },
    })
  ],
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },
  session: {
    maxAge: 2592000, // 30d
    strategy: 'jwt',
    updateAge: 86400
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if ( account ) {
        token.accessToken = account.access_token

        switch (account.type) {
          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser(user!)
            break;
          case 'credentials':
            token.user = user
            break
          default:
            break;
        }
      }
      
      return token
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.user = token.user as any

      return session
    }
  }
})