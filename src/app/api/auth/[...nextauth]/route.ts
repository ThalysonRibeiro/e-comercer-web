import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Defina a interface para os dados do usuário retornados pela sua API
export interface UserData {
  accessToken: string;
  id: string;
  status: string;
  type: string;
  name: string;
  cpf_or_cnpj: string;
  genero: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  resetPasswordToken: string | null;
  resetPasswordExpires: string | null;
  emailVerified: string | null;
  emailVerificationToken: string;
  googleId: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

// Estenda os tipos padrão do NextAuth
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    userData?: UserData;
    user: User;
  }

  interface User {
    access_token?: string;
    userData?: UserData;
    id: string;
    name?: string;
    email?: string;
    image?: string | null;
    status: string;
    type: string;
    cpf_or_cnpj: string;
    genero: string;
    dateOfBirth: string;
    phone: string;
  }
}

// Estenda o tipo JWT
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    userData?: UserData;
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
      async authorize(credentials, req) {  // Adicionando o parâmetro req
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error("Credenciais incompletas");
            return null;
          }

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
            {
              login: credentials.email,
              password: credentials.password
            }
          );

          const userData = response.data;

          // Garantir que o retorno seja compatível com o tipo User do NextAuth
          return {
            userData,
            id: userData.id,
            name: userData.name,
            email: userData.email,
            image: userData.avatar,
            status: userData.status,
            type: userData.type,

            cpf_or_cnpj: userData.cpf_or_cnpj,
            genero: userData.genero,
            dateOfBirth: userData.dateOfBirth,
            phone: userData.phone,
            // // Adicione propriedades adicionais dentro do campo userData 
            // // para não interferir com o tipo User do NextAuth
            access_token: userData.accessToken
          } as any;  // Usando 'as any' como solução temporária para o erro de tipagem
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
    async jwt({ token, account, profile, user }) {
      // LOGIN COM GOOGLE
      if (account?.provider === "google" && account.id_token) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`,
            { token: account.id_token }
          );
          console.log(response.data);

          token.accessToken = response.data.accessToken;
          token.user = response.data.user;
        } catch (error) {
          console.error("Erro ao autenticar com o backend (Google):", error);
        }
      }

      // LOGIN COM CREDENTIALS
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
        token.user = user;
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
    signIn: "/login",  // Página de login customizada
    error: "/login",   // Página de erro personalizada
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
