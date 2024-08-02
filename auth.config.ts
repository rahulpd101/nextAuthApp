import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";

/*
  In case a user tries to bypass the login mechanism by directly sending POST requests or if they are logged in via Github/Google, still they try to
  bypass the login flow then the below mechanism will be used to authenticate such users.
 */

export default {
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
