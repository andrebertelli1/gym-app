import { signInWithEmailAndPassword } from "firebase/auth"
import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { auth as authFirebase } from '@/lib/firebase'

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}

export const {
  handlers: { GET, POST },
  signIn, signOut, auth
} = NextAuth({
  pages: {
    signIn: '/auth',
    signOut: '/auth'
  },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return await signInWithEmailAndPassword(authFirebase, (credentials as any).email || '', (credentials as any).password || '')
          .then(userCredential => {
            if (userCredential.user) {
              return userCredential.user
            }
            return null
          })

        throw new InvalidLoginError()
      },
    }),
  ],
})