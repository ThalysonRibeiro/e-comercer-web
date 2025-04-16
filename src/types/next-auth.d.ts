import "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
      [key: string]: any; // Para permitir propriedades adicionais do usuário
    };
  }

  interface User {
    [key: string]: any; // Para permitir propriedades adicionais do usuário
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: {
      [key: string]: any;
    };
  }
}