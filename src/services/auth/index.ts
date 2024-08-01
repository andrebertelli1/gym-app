import { signInWithEmailAndPassword } from "firebase/auth"
import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { auth as authFirebase } from '@/lib/firebase'

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid email or password"
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
        try {
          const userCredential = await signInWithEmailAndPassword(authFirebase, (credentials as any).email || '', (credentials as any).password || '');
          if (userCredential.user) {
            // Retorne os dados do usuário
            return {
              id: userCredential.user.uid,
              email: userCredential.user.email,
              name: userCredential.user.displayName,
            };
          }
        } catch (error) {
          console.error("Erro ao autenticar usuário:", error);
        }

        throw new InvalidLoginError()
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Adicione o UUID do Firebase à sessão
      session.user.id = token.uid;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // Adicione o UUID do Firebase ao token JWT
        token.uid = user.id;
      }
      return token;
    },
  },
})