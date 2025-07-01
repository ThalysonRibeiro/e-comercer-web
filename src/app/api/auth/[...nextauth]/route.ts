import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { serverApi } from "../../api";

// Estenda os tipos padrão do NextAuth
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: User;
  }

  interface User {
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

const authOptions: NextAuthOptions = {
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
            throw new Error("Email e senha são obrigatórios");
          }

          const response = await serverApi.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
            {
              login: credentials.email,
              password: credentials.password
            }
          );

          const userData = response.data;

          if (!userData || !userData.accessToken) {
            throw new Error("Credenciais inválidas");
          }

          // Retorno compatível com o tipo User do NextAuth
          return {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            image: userData.avatar || null,
            status: userData.status,
            type: userData.type,
            cpf_or_cnpj: userData.cpf_or_cnpj,
            genero: userData.genero,
            dateOfBirth: userData.dateOfBirth,
            phone: userData.phone,
            accessToken: userData.accessToken,
          };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("Erro da API:", {
              status: error.response?.status,
              data: error.response?.data,
              message: error.message
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
      // Adicionar dados do usuário no primeiro login
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user;
      }

      // Handle Google login (apenas no primeiro sign-in e se não tem token)
      if (account?.provider === "google" && account.id_token && !token.accessToken) {
        try {
          const response = await serverApi.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`,
            { token: account.id_token }
          );

          if (response.data?.accessToken) {
            token.accessToken = response.data.accessToken;
            token.user = response.data.user;
          } else {
            console.error("Backend não retornou accessToken para Google login");
          }
        } catch (error) {
          console.error("Erro ao autenticar com o backend (Google):", error);
          // Você pode decidir se quer retornar null ou continuar sem o backend
          // return null; // Uncomment para falhar o login se o backend falhar
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }

      if (token.user) {
        session.user = { ...session.user, ...token.user };
      }

      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

// Exportar authOptions para uso em getServerSession
export { authOptions };
export { handler as GET, handler as POST };