import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";
import { $Enums } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      role: $Enums.UserRole;
    } & DefaultSession["user"];
  }
}

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    // this callback would come handy when the attacker bypasses the login functionality by removing the code
    // for token generation in `login.ts` file.
    async signIn({ user, account }) {
      if (account?.type !== "credentials") return true;
      if (!user.id) {
        return false;
      }

      const exisitingUser = await getUserById(user.id);
      if (!exisitingUser?.emailVerified) return false;

      return true;
    },

    async session({ token, session }) {
      console.log({ sessionToken: token });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as $Enums.UserRole;
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
});
