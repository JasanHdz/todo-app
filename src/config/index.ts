export const config = {
  github: {
    id: process.env.GITHUB_ID ?? '',
    secret: process.env.GITHUB_SECRET ?? ''
  },
  google: {
    id: process.env.GOOGLE_ID ?? '',
    secret: process.env.GOOGLE_SECRET ?? ''
  },
  mongoUrl: process.env.MONGO_URL ?? '',
  isDev: process.env.NODE_ENV !== 'production',
  jwtSecret: process.env.NEXTAUTH_SECRET ?? '',
  host: process.env.HOST ?? ''
}