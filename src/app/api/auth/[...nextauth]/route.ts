import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Estenda os tipos padrão do NextAuth
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: User;
  }

  export interface User {
    id: string;
    name?: string;
    email?: string;
    image?: string | null;
    status?: string;
    type?: string;
    cpf_or_cnpj?: string;
    genero?: string;
    dateOfBirth?: string;
    phone?: string;
    accessToken?: string;
  }
}

// Estenda o tipo JWT
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: any;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
            {
              login: credentials.email,
              password: credentials.password
            }
          );

          const user = response.data;

          if (!user || !user.accessToken) {
            return null;
          }

          // Retorno compatível com o tipo User do NextAuth
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.avatar,
            status: user.status,
            type: user.type,
            cpf_or_cnpj: user.cpf_or_cnpj,
            genero: user.genero,
            dateOfBirth: user.dateOfBirth,
            phone: user.phone,
            accessToken: user.accessToken,
          };
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            console.error("Erro da API:", {
              status: error.response.status,
              data: error.response.data
            });
          } else {
            console.error("Erro ao fazer login:", error);
          }
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user;
      }

      // Handle Google login (only on first sign-in)
      if (account?.provider === "google" && account.id_token) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`,
            { token: account.id_token }
          );

          token.accessToken = response.data.accessToken;
          token.user = response.data.user;
        } catch (error) {
          console.error("Erro ao autenticar com o backend (Google):", error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = { ...session.user, ...token.user };

      return session;
    },
  },
  pages: {
    signIn: "/",  // Página de login customizada
    error: "/",   // Página de erro personalizada
  },
  session: {
    strategy: "jwt",  // Usar JWT para armazenar os dados da sessão
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  // debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };