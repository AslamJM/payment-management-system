import { PrismaAdapter } from "@auth/prisma-adapter";
import { type Role } from "@prisma/client";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt"

import { env } from "~/env";
import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: string
    role: Role
    name?: string
  }
}


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: "jwt"
  },

  pages: {
    signIn: "/login"
  },
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {

        const user = await db.user.findUnique({ where: { username: credentials?.username } })
        if (user) {
          return user

        }
        return null;
      },
    }),
  ],
  callbacks: {

    jwt: ({ token, user }) => {
      if (user) {
        token.name = user.name!
        token.role = user.role
        token.id = user.id
      }
      return token
    },

    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          role: token.role
        },
      }
    },
  },
  secret: env.NEXTAUTH_SECRET
};


export const getServerAuthSession = () => getServerSession(authOptions);
