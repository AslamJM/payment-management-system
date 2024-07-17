import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@prisma/client";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialProvider from "next-auth/providers/credentials";

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


export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => {
      console.log(session, user);

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      }
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        const user = await db.user.findUnique({ where: { username: credentials?.username } })
        if (user)
          return user
        return null;
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET
};


export const getServerAuthSession = () => getServerSession(authOptions);
